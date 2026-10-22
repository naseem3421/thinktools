import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    const candidatePaths = [
      path.join(process.cwd(), "public", "downloads", "Construction_Calculator_Pro_Excel.zip"),
      path.join(process.cwd(), "storage", "downloads", "Construction_Calculator_Pro_Excel.zip"),
    ];

    let foundPath = "";
    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        foundPath = p;
        break;
      }
    }

    if (!foundPath) {
      return NextResponse.redirect(new URL("/downloads/Construction_Calculator_Pro_Excel.zip", request.url));
    }

    const stat = fs.statSync(foundPath);
    const fileBuffer = fs.readFileSync(foundPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="Construction_Calculator_Pro_Excel.zip"',
        "Content-Length": stat.size.toString(),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error serving download:", error);
    return NextResponse.json({ error: "Failed to download file" }, { status: 500 });
  }
}
