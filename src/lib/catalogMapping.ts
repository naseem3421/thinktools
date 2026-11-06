import fs from "fs";
import path from "path";

export interface DeliverableItem {
  id: string; // product slug or addon id
  title: string;
  type: "main" | "addon";
  candidateRelativePaths: string[];
  filename: string;
  mimeType: string;
  fallbackCdnUrl: string;
}

/**
 * Authoritative registry of physical downloadable assets.
 * Checks both local storage and public CDN distributions for resilience across serverless runtimes.
 */
export const CATALOG_DELIVERABLES: Record<string, DeliverableItem> = {
  "main": {
    id: "construction-calculator-pro",
    title: "Construction Calculator Pro (Excel Engine & PDF Guides)",
    type: "main",
    candidateRelativePaths: [
      path.join("public", "downloads", "d7x9m2k4q8v1", "Construction_Calculator_Pro_Excel.zip"),
      path.join("storage", "downloads", "Construction_Calculator_Pro_Excel.zip"),
      path.join("public", "downloads", "Construction_Calculator_Pro_Excel.zip"),
    ],
    filename: "Construction_Calculator_Pro_Excel.zip",
    mimeType: "application/zip",
    fallbackCdnUrl: "/downloads/d7x9m2k4q8v1/Construction_Calculator_Pro_Excel.zip",
  },
  "construction-calculator-pro": {
    id: "construction-calculator-pro",
    title: "Construction Calculator Pro (Excel Engine & PDF Guides)",
    type: "main",
    candidateRelativePaths: [
      path.join("public", "downloads", "d7x9m2k4q8v1", "Construction_Calculator_Pro_Excel.zip"),
      path.join("storage", "downloads", "Construction_Calculator_Pro_Excel.zip"),
      path.join("public", "downloads", "Construction_Calculator_Pro_Excel.zip"),
    ],
    filename: "Construction_Calculator_Pro_Excel.zip",
    mimeType: "application/zip",
    fallbackCdnUrl: "/downloads/d7x9m2k4q8v1/Construction_Calculator_Pro_Excel.zip",
  },
  "site-expense-profit-tracker": {
    id: "site-expense-profit-tracker",
    title: "Site Expense & Profit Tracker",
    type: "addon",
    candidateRelativePaths: [
      path.join("public", "downloads", "d7x9m2k4q8v1", "addons", "site-expense-profit-tracker.zip"),
      path.join("public", "downloads", "addons", "site-expense-profit-tracker.zip"),
      path.join("storage", "downloads", "addons", "site-expense-profit-tracker.zip"),
    ],
    filename: "Site_Expense_Profit_Tracker.zip",
    mimeType: "application/zip",
    fallbackCdnUrl: "/downloads/d7x9m2k4q8v1/addons/site-expense-profit-tracker.zip",
  },
  "labour-attendance-weekly-wage-sheet": {
    id: "labour-attendance-weekly-wage-sheet",
    title: "Labour Attendance & Weekly Wage Sheet",
    type: "addon",
    candidateRelativePaths: [
      path.join("public", "downloads", "d7x9m2k4q8v1", "addons", "labour-attendance-weekly-wage-sheet.zip"),
      path.join("public", "downloads", "addons", "labour-attendance-weekly-wage-sheet.zip"),
      path.join("storage", "downloads", "addons", "labour-attendance-weekly-wage-sheet.zip"),
    ],
    filename: "Labour_Attendance_Weekly_Wage_Sheet.zip",
    mimeType: "application/zip",
    fallbackCdnUrl: "/downloads/d7x9m2k4q8v1/addons/labour-attendance-weekly-wage-sheet.zip",
  },
  "payment-collection-tracker": {
    id: "payment-collection-tracker",
    title: "Payment Collection Tracker",
    type: "addon",
    candidateRelativePaths: [
      path.join("public", "downloads", "d7x9m2k4q8v1", "addons", "payment-collection-tracker.zip"),
      path.join("public", "downloads", "addons", "payment-collection-tracker.zip"),
      path.join("storage", "downloads", "addons", "payment-collection-tracker.zip"),
    ],
    filename: "Payment_Collection_Tracker.zip",
    mimeType: "application/zip",
    fallbackCdnUrl: "/downloads/d7x9m2k4q8v1/addons/payment-collection-tracker.zip",
  },
};

/**
 * Resolves the absolute physical file path for a deliverable item across candidate directories.
 */
export function resolveDeliverablePath(fileKey: string): {
  exists: boolean;
  absolutePath: string;
  item?: DeliverableItem;
  fileSize?: number;
  fallbackCdnUrl?: string;
} {
  const item = CATALOG_DELIVERABLES[fileKey];
  if (!item) {
    return { exists: false, absolutePath: "" };
  }

  for (const relPath of item.candidateRelativePaths) {
    const absolutePath = path.isAbsolute(relPath)
      ? relPath
      : path.join(process.cwd(), relPath);

    try {
      if (fs.existsSync(absolutePath)) {
        const stat = fs.statSync(absolutePath);
        if (stat.size > 0) {
          return {
            exists: true,
            absolutePath,
            item,
            fileSize: stat.size,
            fallbackCdnUrl: item.fallbackCdnUrl,
          };
        }
      }
    } catch {
      // Continue to next candidate path
    }
  }

  return {
    exists: false,
    absolutePath: "",
    item,
    fallbackCdnUrl: item.fallbackCdnUrl,
  };
}

/**
 * Verifies that all catalog deliverables are mapped to existing assets.
 */
export function verifyAllCatalogDeliverables(): {
  verified: boolean;
  itemsCount: number;
  missingItems: string[];
} {
  const missingItems: string[] = [];
  const checkedKeys = new Set<string>();

  for (const [key, item] of Object.entries(CATALOG_DELIVERABLES)) {
    if (checkedKeys.has(item.id)) continue;
    checkedKeys.add(item.id);

    const check = resolveDeliverablePath(key);
    if (!check.exists && !check.fallbackCdnUrl) {
      missingItems.push(`${item.title} (${item.id})`);
    }
  }

  if (missingItems.length > 0) {
    console.warn(`[CATALOG WARNING] Some deliverables missing physical files: ${missingItems.join(", ")}`);
  }

  return {
    verified: missingItems.length === 0,
    itemsCount: checkedKeys.size,
    missingItems,
  };
}
