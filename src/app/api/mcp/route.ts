import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { id, method, params } = body;

    // Handle MCP JSON-RPC protocol methods
    if (method === "initialize") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          serverInfo: {
            name: "thinktools-mcp-server",
            version: "1.0.0",
          },
          capabilities: {
            tools: { listChanged: false },
          },
        },
      });
    }

    if (method === "tools/list") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          tools: [
            {
              name: "calculate_construction_materials",
              description:
                "Calculate estimated cement bags, sand (cft), aggregate (cft), and steel (kg) for built-up slab area in India based on IS 456 standards.",
              inputSchema: {
                type: "object",
                properties: {
                  builtUpAreaSqFt: {
                    type: "number",
                    description: "Total built-up slab area in square feet",
                  },
                  floors: {
                    type: "number",
                    description: "Number of floors (default 1)",
                    default: 1,
                  },
                },
                required: ["builtUpAreaSqFt"],
              },
            },
            {
              name: "get_toolkit_catalog",
              description:
                "Get live pricing, modules, and checkout URLs for ThinkTools Construction Calculator Pro and business toolkits.",
              inputSchema: {
                type: "object",
                properties: {},
              },
            },
          ],
        },
      });
    }

    if (method === "tools/call") {
      const toolName = params?.name;
      const args = params?.arguments || {};

      if (toolName === "calculate_construction_materials") {
        const area = Number(args.builtUpAreaSqFt) || 1000;
        const floors = Number(args.floors) || 1;
        const totalArea = area * floors;

        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    totalBuiltUpAreaSqFt: totalArea,
                    cementBags: Math.round(totalArea * 0.4),
                    sandCft: Math.round(totalArea * 0.816),
                    coarseAggregateCft: Math.round(totalArea * 1.25),
                    reinforcementSteelKg: Math.round(totalArea * 4.0),
                    estimatedCostINR: Math.round(totalArea * 1850),
                    currency: "INR",
                    standard: "IS 456 & IS 1200",
                    source: "Construction Calculator Pro (Thinktools.in)",
                  },
                  null,
                  2
                ),
              },
            ],
          },
        });
      }

      if (toolName === "get_toolkit_catalog") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    flagship: "Construction Calculator Pro (31 Sheets)",
                    basePriceINR: 299,
                    vipBundlePriceINR: 499,
                    currency: "INR",
                    includedAddons: [
                      "Site Expense & Profit Tracker",
                      "Labour Attendance & Weekly Wage Sheet",
                      "Payment Collection Tracker",
                    ],
                    checkoutUrl: "https://thinktools.in/p/construction-calculator-pro",
                    delivery: "Instant automated download link & email attachment",
                  },
                  null,
                  2
                ),
              },
            ],
          },
        });
      }

      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: `Tool '${toolName}' not found.` },
      });
    }

    // Default response for notifications or unknown methods
    return NextResponse.json({
      jsonrpc: "2.0",
      id,
      result: { status: "ready", server: "thinktools-mcp-server" },
    });
  } catch (error) {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal MCP error" },
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    server: "thinktools-mcp-server",
    protocol: "Model Context Protocol (MCP)",
    version: "1.0.0",
    docs: "https://thinktools.in/llms.txt",
    card: "https://thinktools.in/.well-known/mcp/server-card.json",
  });
}
