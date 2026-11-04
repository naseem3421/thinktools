import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ADDON_PRODUCTS } from "@/data/products";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedFile = searchParams.get("file") || "main";

    let targetFilePath = "";
    let downloadFilename = "";
    let isZip = true;

    // 1. Locate the requested file
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

    // 2. Read and stream file with appropriate download headers
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
        "Cache-Control": "public, max-age=86400",
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
