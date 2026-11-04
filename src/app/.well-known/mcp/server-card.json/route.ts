import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const cardPath = path.join(process.cwd(), "public", ".well-known", "mcp", "server-card.json");
    if (fs.existsSync(cardPath)) {
      const data = fs.readFileSync(cardPath, "utf-8");
      return new NextResponse(data, {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }
  } catch (err) {
    console.error("Error reading server-card.json:", err);
  }

  return NextResponse.json(
    {
      name: "thinktools-mcp-server",
      version: "1.0.0",
      description: "Official MCP Server for ThinkTools.in",
      endpoint: "https://thinktools.in/api/mcp",
    },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
    },
  });
}
