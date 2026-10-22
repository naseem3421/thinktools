import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    const filePath = path.join(process.cwd(), "storage", "downloads", "Construction_Calculator_Pro_Excel.zip");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const stat = fs.statSync(filePath);
    const fileBuffer = fs.readFileSync(filePath);

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
