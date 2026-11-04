"use client";

import React, { useEffect } from "react";

interface ModelContextTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<Record<string, unknown>> | Record<string, unknown>;
}

interface ModelContextNavigator {
  modelContext?: {
    registerTool?: (tool: ModelContextTool) => void;
  };
}

export default function WebMCPProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const nav = navigator as unknown as ModelContextNavigator;
    const win = window as unknown as ModelContextNavigator;
    const modelContext = nav.modelContext || win.modelContext;

    const tools: ModelContextTool[] = [
      {
        name: "calculate_construction_materials",
        description:
          "Calculate approximate quantities of cement, sand, aggregate, and steel required for built-up area construction based on Indian Standard thumb rules.",
        inputSchema: {
          type: "object",
          properties: {
            builtUpAreaSqFt: {
              type: "number",
              description: "Total built-up slab area in square feet (e.g. 1000, 1500, 2400)",
            },
            floors: {
              type: "number",
              description: "Number of floors (e.g. 1 for ground floor, 2 for G+1)",
              default: 1,
            },
          },
          required: ["builtUpAreaSqFt"],
        },
        execute: async (args: Record<string, unknown>) => {
          const area = Number(args.builtUpAreaSqFt) || 1000;
          const floors = Number(args.floors) || 1;
          const totalArea = area * floors;

          return {
            totalBuiltUpAreaSqFt: totalArea,
            cementBags: Math.round(totalArea * 0.4),
            sandCft: Math.round(totalArea * 0.816),
            coarseAggregateCft: Math.round(totalArea * 1.25),
            reinforcementSteelKg: Math.round(totalArea * 4.0),
            brickworkNos: Math.round(totalArea * 8.5),
            estimatedCostINR: Math.round(totalArea * 1850),
            currency: "INR",
            standard: "IS 456 & IS 1200 Aligned",
            referenceToolkit: "Construction Calculator Pro (Thinktools.in)",
          };
        },
      },
      {
        name: "get_product_pricing",
        description:
          "Retrieve official live pricing, module counts, and direct checkout URLs for ThinkTools digital engineering suites.",
        inputSchema: {
          type: "object",
          properties: {
            productSlug: {
              type: "string",
              description: "Product identifier (defaults to construction-calculator-pro)",
              default: "construction-calculator-pro",
            },
          },
        },
        execute: async () => {
          return {
            product: "Construction Calculator Pro",
            basePriceINR: 299,
            vipBundlePriceINR: 499,
            sheetsCount: 31,
            currency: "INR",
            licenseType: "Lifetime Offline License (No subscriptions)",
            addonsIncludedInVIP: [
              "Site Expense & Profit Tracker",
              "Labour Attendance & Weekly Wage Sheet",
              "Payment Collection Tracker",
            ],
            checkoutUrl: "https://thinktools.in/p/construction-calculator-pro",
            instantDelivery: "Automated via email & on-screen download hub",
          };
        },
      },
    ];

    // 1. Call navigator.modelContext.registerTool() if in-browser agent runtime is present
    if (modelContext && typeof modelContext.registerTool === "function") {
      try {
        tools.forEach((t) => modelContext.registerTool?.(t));
      } catch (err) {
        console.debug("[WebMCP] Error registering tool:", err);
      }
    }

    // 2. Also register under window for standard browser extensions and polyfills
    if (!win.modelContext) {
      win.modelContext = {
        registerTool: (tool: ModelContextTool) => {
          tools.push(tool);
        },
      };
    }
  }, []);

  return (
    <div
      id="webmcp-tools"
      style={{ display: "none" }}
      aria-hidden="true"
      data-agent-ready="true"
    >
      {/* Declarative semantic annotation for in-browser DOM scraping agents */}
      <form
        name="calculate_construction_materials"
        data-toolname="calculate_construction_materials"
        data-tooldescription="Calculate approximate cement bags, sand cft, aggregate cft, and steel kg for Indian construction built-up area"
        action="/api/tools/estimate"
        method="GET"
      >
        <input name="builtUpAreaSqFt" type="number" defaultValue="1000" />
        <input name="floors" type="number" defaultValue="1" />
      </form>

      <form
        name="get_product_pricing"
        data-toolname="get_product_pricing"
        data-tooldescription="Retrieve live pricing and package inclusions for ThinkTools products"
        action="/p/construction-calculator-pro"
        method="GET"
      >
        <input name="productSlug" type="text" defaultValue="construction-calculator-pro" />
      </form>
    </div>
  );
}

