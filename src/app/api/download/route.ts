import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifyDownloadToken } from "@/lib/downloadToken";
import { ADDON_PRODUCTS } from "@/data/products";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token") || "";
    const requestedFile = searchParams.get("file") || "main";

    // 1. Token validation
    if (!token) {
      return NextResponse.json(
        {
          error:
            "Access Denied: Missing secure download token. Your download files are also attached permanently inside your confirmation email.",
        },
        { status: 403 }
      );
    }

    const verification = verifyDownloadToken(token);
    if (!verification.valid || !verification.payload) {
      return NextResponse.json(
        {
          error:
            verification.error ||
            "Access Denied: This download link is invalid or has expired. Please check your email for your permanent files, or contact support.",
        },
        { status: 403 }
      );
    }

    const { addon_ids } = verification.payload;

    let targetFilePath = "";
    let downloadFilename = "";
    let isZip = true;

    // 2. Identify and locate the requested file
    if (requestedFile === "main") {
      const candidateMainPaths = [
        path.join(process.cwd(), "storage", "downloads", "Construction_Calculator_Pro_Excel.zip"),
        path.join(process.cwd(), "public", "downloads", "d7x9m2k4q8v1", "Construction_Calculator_Pro_Excel.zip"),
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
      // Requested an add-on file: verify customer actually purchased this add-on
      const hasPurchasedAddon = (addon_ids || []).includes(requestedFile);
      if (!hasPurchasedAddon) {
        return NextResponse.json(
          {
            error: "Access Denied: Your order does not include this add-on product.",
          },
          { status: 403 }
        );
      }

      const addonObj = ADDON_PRODUCTS[requestedFile];
      const baseName = addonObj
        ? addonObj.title.replace(/[^a-zA-Z0-9_-]/g, "_")
        : requestedFile;

      const candidateAddonPaths = [
        path.join(process.cwd(), "storage", "downloads", "addons", `${requestedFile}.zip`),
        path.join(process.cwd(), "storage", "downloads", "addons", `${requestedFile}.xlsx`),
        path.join(process.cwd(), "public", "downloads", "addons", `${requestedFile}.zip`),
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
          error:
            "File currently undergoing routine sync. Please check your email inbox where your file has been dispatched.",
        },
        { status: 404 }
      );
    }

    // 3. Read and stream file with appropriate headers
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
    console.error("Secure download API error:", error);
    return NextResponse.json(
      { error: "Internal server error processing secure download." },
      { status: 500 }
    );
  }
}
