import fs from "fs";
import path from "path";

export interface DeliverableItem {
  id: string; // product slug or addon id
  title: string;
  type: "main" | "addon";
  relativePath: string;
  filename: string;
  mimeType: string;
}

/**
 * Authoritative registry of physical downloadable assets.
 * Every product, addon, or bundle MUST map directly to an existing file in private storage.
 */
export const CATALOG_DELIVERABLES: Record<string, DeliverableItem> = {
  "main": {
    id: "construction-calculator-pro",
    title: "Construction Calculator Pro (Excel Engine & PDF Guides)",
    type: "main",
    relativePath: path.join("storage", "downloads", "Construction_Calculator_Pro_Excel.zip"),
    filename: "Construction_Calculator_Pro_Excel.zip",
    mimeType: "application/zip",
  },
  "construction-calculator-pro": {
    id: "construction-calculator-pro",
    title: "Construction Calculator Pro (Excel Engine & PDF Guides)",
    type: "main",
    relativePath: path.join("storage", "downloads", "Construction_Calculator_Pro_Excel.zip"),
    filename: "Construction_Calculator_Pro_Excel.zip",
    mimeType: "application/zip",
  },
  "site-expense-profit-tracker": {
    id: "site-expense-profit-tracker",
    title: "Site Expense & Profit Tracker",
    type: "addon",
    relativePath: path.join("storage", "downloads", "addons", "site-expense-profit-tracker.zip"),
    filename: "Site_Expense_Profit_Tracker.zip",
    mimeType: "application/zip",
  },
  "labour-attendance-weekly-wage-sheet": {
    id: "labour-attendance-weekly-wage-sheet",
    title: "Labour Attendance & Weekly Wage Sheet",
    type: "addon",
    relativePath: path.join("storage", "downloads", "addons", "labour-attendance-weekly-wage-sheet.zip"),
    filename: "Labour_Attendance_Weekly_Wage_Sheet.zip",
    mimeType: "application/zip",
  },
  "payment-collection-tracker": {
    id: "payment-collection-tracker",
    title: "Payment Collection Tracker",
    type: "addon",
    relativePath: path.join("storage", "downloads", "addons", "payment-collection-tracker.zip"),
    filename: "Payment_Collection_Tracker.zip",
    mimeType: "application/zip",
  },
};

/**
 * Resolves the absolute physical file path for a deliverable item.
 */
export function resolveDeliverablePath(fileKey: string): {
  exists: boolean;
  absolutePath: string;
  item?: DeliverableItem;
  fileSize?: number;
} {
  const item = CATALOG_DELIVERABLES[fileKey];
  if (!item) {
    return { exists: false, absolutePath: "" };
  }

  const absolutePath = path.isAbsolute(item.relativePath)
    ? item.relativePath
    : path.join(process.cwd(), item.relativePath);

  if (fs.existsSync(absolutePath)) {
    const stat = fs.statSync(absolutePath);
    return {
      exists: true,
      absolutePath,
      item,
      fileSize: stat.size,
    };
  }

  return {
    exists: false,
    absolutePath,
    item,
  };
}

/**
 * Fails loudly: Verifies that every single catalog item and add-on has an existing, non-empty file on disk.
 * Throws a fatal Error if any deliverable is missing.
 */
export function verifyAllCatalogDeliverables(): {
  verified: boolean;
  itemsCount: number;
  missingItems: string[];
} {
  const missingItems: string[] = [];
  const checkedKeys = new Set<string>();

  for (const [key, item] of Object.entries(CATALOG_DELIVERABLES)) {
    if (checkedKeys.has(item.relativePath)) continue;
    checkedKeys.add(item.relativePath);

    const check = resolveDeliverablePath(key);
    if (!check.exists || !check.fileSize || check.fileSize === 0) {
      missingItems.push(`${item.title} (${item.relativePath})`);
    }
  }

  if (missingItems.length > 0) {
    const errorMsg = `[CATALOG INTEGRITY ERROR] The following deliverable files are missing from storage: ${missingItems.join(", ")}`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  return {
    verified: true,
    itemsCount: checkedKeys.size,
    missingItems: [],
  };
}
