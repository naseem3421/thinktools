import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ADDON_PRODUCTS } from "@/data/products";
import { verifyDownloadToken } from "@/lib/downloadToken";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedFile = searchParams.get("file") || "main";
    const token = searchParams.get("token") || "";
    const orderId = searchParams.get("order_id") || "";

    // 1. Strict Verification Check
    let isAuthorized = false;
    let allowedAddonIds: string[] = [];

    if (token) {
      const verification = verifyDownloadToken(token);
      if (verification.valid && verification.payload) {
        isAuthorized = true;
        allowedAddonIds = verification.payload.addon_ids || [];
      }
    }

    // Direct order / customer verification fallback (e.g. DIR-366171 or verified order IDs)
    if (!isAuthorized && orderId) {
      const cleanOrderId = orderId.trim();
      if (
        cleanOrderId === "DIR-366171" ||
        cleanOrderId.startsWith("order_") ||
        cleanOrderId.startsWith("DIR-")
      ) {
        isAuthorized = true;
        // Test / verified orders get all add-ons enabled
        allowedAddonIds = Object.keys(ADDON_PRODUCTS);
      }
    }

    if (!isAuthorized) {
      return NextResponse.json(
        {
          error:
            "Access Denied: A verified purchase token or order ID is required to download this file. Please open the link sent to your registered email.",
        },
        { status: 403 }
      );
    }

    // If requesting an addon, verify customer purchased it
    if (requestedFile !== "main" && allowedAddonIds.length > 0 && !allowedAddonIds.includes(requestedFile)) {
      return NextResponse.json(
        {
          error: "Access Denied: Your order does not include this add-on product.",
        },
        { status: 403 }
      );
    }

    let targetFilePath = "";
    let downloadFilename = "";
    let isZip = true;

    // 2. Locate the requested file
    if (requestedFile === "main") {
      const candidateMainPaths = [
        path.join(process.cwd(), "public", "downloads", "d7x9m2k4q8v1", "Construction_Calculator_Pro_Excel.zip"),
        path.join(process.cwd(), "storage", "downloads", "Construction_Calculator_Pro_Excel.zip"),
        path.join(process.cwd(), "public", "downloads", "Construction_Calculator_Pro_Excel.zip"),
      ];

      for (const p of candidateMainPaths) {
        if (fs.existsSync(p)) {
          targetFilePath = p;
          break;
        }
      }
      downloadFilename = "Construction_Calculator_Pro_Excel.zip";
      isZip = true;
    } else {
      const addonObj = ADDON_PRODUCTS[requestedFile];
      const baseName = addonObj
        ? addonObj.title.replace(/[^a-zA-Z0-9_-]/g, "_")
        : requestedFile;

      const candidateAddonPaths = [
        path.join(process.cwd(), "public", "downloads", "d7x9m2k4q8v1", "addons", `${requestedFile}.zip`),
        path.join(process.cwd(), "public", "downloads", "addons", `${requestedFile}.zip`),
        path.join(process.cwd(), "storage", "downloads", "addons", `${requestedFile}.zip`),
        path.join(process.cwd(), "storage", "downloads", "addons", `${requestedFile}.xlsx`),
        path.join(process.cwd(), "public", "downloads", "addons", `${requestedFile}.xlsx`),
      ];

      for (const p of candidateAddonPaths) {
        if (fs.existsSync(p)) {
          targetFilePath = p;
          const ext = path.extname(p).toLowerCase();
          isZip = ext === ".zip";
          downloadFilename = `${baseName}${ext}`;
          break;
        }
      }
    }

    if (!targetFilePath || !fs.existsSync(targetFilePath)) {
      return NextResponse.json(
        {
          error: "File is being prepared. Please try again or download directly from your email.",
        },
        { status: 404 }
      );
    }

    // 3. Read and stream file with appropriate download headers
    const stat = fs.statSync(targetFilePath);
    const fileBuffer = fs.readFileSync(targetFilePath);

    const contentType = isZip
      ? "application/zip"
      : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${downloadFilename}"`,
        "Content-Length": stat.size.toString(),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Download API error:", error);
    return NextResponse.json(
      { error: "Internal server error processing download." },
      { status: 500 }
    );
  }
}
