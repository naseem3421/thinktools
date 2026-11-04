import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "llms.txt");
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf-8");
    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  return new NextResponse(
    "# ThinkTools\n\n> Practical engineering calculation engines & toolkits.\n\n- https://thinktools.in/p/construction-calculator-pro",
    {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    }
  );
}

