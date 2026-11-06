import { NextResponse } from "next/server";
import { runOrderReconciliation } from "@/lib/reconciliation";

export const dynamic = "force-dynamic";

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET || "thinktools_cron_secret_2026";
  const { searchParams } = new URL(request.url);
  const querySecret = searchParams.get("secret");
  const authHeader = request.headers.get("authorization");

  if (querySecret === secret) return true;
  if (authHeader && authHeader.replace(/^Bearer\s+/i, "") === secret) return true;

  return false;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized cron execution." }, { status: 401 });
  }

  try {
    const result = await runOrderReconciliation();
    return NextResponse.json({
      status: "success",
      message: "Order reconciliation executed successfully.",
      result,
    });
  } catch (error: any) {
    console.error("Cron reconciliation failed:", error);
    return NextResponse.json(
      { status: "error", message: error?.message || "Reconciliation failed" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}

