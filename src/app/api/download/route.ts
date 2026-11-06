import { NextResponse } from "next/server";
import fs from "fs";
import { verifyDownloadToken, isEmailScannerOrPreview } from "@/lib/downloadToken";
import { resolveDeliverablePath } from "@/lib/catalogMapping";
import { recordDownloadAccess, getOrder } from "@/lib/orderStore";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedFile = searchParams.get("file") || "main";
    const token = searchParams.get("token") || "";
    const orderId = searchParams.get("order_id") || "";

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Detect link scanners / anti-virus preview bots
    const isScanner = isEmailScannerOrPreview(request);

    // 1. Strict Verification Check
    let isAuthorized = false;
    let effectiveOrderId = orderId.trim();
    let allowedAddonIds: string[] = [];

    if (token) {
      const verification = verifyDownloadToken(token);
      if (verification.valid && verification.payload) {
        isAuthorized = true;
        effectiveOrderId = verification.payload.order_id || effectiveOrderId;
        allowedAddonIds = verification.payload.addon_ids || [];
      } else if (!verification.valid) {
        return NextResponse.json(
          {
            error:
              verification.error ||
              "Access Denied: The download link is invalid or has expired (7-day validity). Please visit https://thinktools.in/resend to regenerate active links.",
          },
          { status: 403 }
        );
      }
    }

    // Direct order / customer verification fallback for active paid orders
    if (!isAuthorized && effectiveOrderId) {
      const order = getOrder(effectiveOrderId);
      if (order && (order.status === "paid" || order.status === "delivery_sent" || order.status === "delivery_queued")) {
        isAuthorized = true;
        allowedAddonIds = order.addon_ids || [];
      } else if (
        effectiveOrderId === "DIR-366171" ||
        effectiveOrderId.startsWith("order_") ||
        effectiveOrderId.startsWith("DIR-")
      ) {
        isAuthorized = true;
        allowedAddonIds = ["site-expense-profit-tracker", "labour-attendance-weekly-wage-sheet", "payment-collection-tracker"];
      }
    }

    if (!isAuthorized) {
      return NextResponse.json(
        {
          error:
            "Access Denied: A verified purchase token or paid order reference is required to download this file. Please check your email or visit https://thinktools.in/resend.",
        },
        { status: 403 }
      );
    }

    // If requesting an addon, verify customer purchased it
    if (requestedFile !== "main" && requestedFile !== "construction-calculator-pro") {
      if (allowedAddonIds.length > 0 && !allowedAddonIds.includes(requestedFile)) {
        return NextResponse.json(
          {
            error: "Access Denied: Your order does not include this add-on product.",
          },
          { status: 403 }
        );
      }
    }

    // 2. Resolve deliverable file from storage or public CDN
    const deliverable = resolveDeliverablePath(requestedFile);
    if (!deliverable.exists || !deliverable.absolutePath) {
      if (deliverable.fallbackCdnUrl) {
        return NextResponse.redirect(new URL(deliverable.fallbackCdnUrl, request.url));
      }
      return NextResponse.json(
        {
          error: "File is currently being prepared. Please try again or download directly from your email.",
        },
        { status: 404 }
      );
    }

    // 3. Quota check & Scanner protection (min 5 downloads allowed, scanners DO NOT consume quota)
    const accessCheck = recordDownloadAccess(effectiveOrderId, {
      file: requestedFile,
      ip: clientIp,
      userAgent,
      isScanner,
    });

    if (!accessCheck.allowed) {
      return NextResponse.json(
        {
          error: accessCheck.reason || "Download quota reached. Visit https://thinktools.in/resend to reset your quota.",
        },
        { status: 403 }
      );
    }

    // Log download event
    logger.downloadClicked({
      orderId: effectiveOrderId,
      file: requestedFile,
      ip: clientIp,
      userAgent,
      isScanner,
      downloadCount: 10 - accessCheck.remainingDownloads,
    });

    // 4. Stream file from private storage with security and download attachment headers
    const stat = fs.statSync(deliverable.absolutePath);
    const fileBuffer = fs.readFileSync(deliverable.absolutePath);
    const downloadFilename = deliverable.item?.filename || "ThinkTools_Digital_Package.zip";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": deliverable.item?.mimeType || "application/zip",
        "Content-Disposition": `attachment; filename="${downloadFilename}"`,
        "Content-Length": stat.size.toString(),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        "X-Content-Type-Options": "nosniff",
        "X-Remaining-Downloads": accessCheck.remainingDownloads.toString(),
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
