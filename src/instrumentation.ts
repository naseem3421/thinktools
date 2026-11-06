/**
 * Next.js Server Instrumentation Hook.
 * Runs once on server startup in Node.js runtime.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { verifyAllCatalogDeliverables } = await import("@/lib/catalogMapping");
    const { runOrderReconciliation } = await import("@/lib/reconciliation");

    // 1. Verify that all catalog files and variants exist in private storage
    try {
      const check = verifyAllCatalogDeliverables();
      console.log(`[Boot] Catalog deliverables verified: ${check.itemsCount} assets present in storage.`);
    } catch (catalogErr: any) {
      console.error("[Boot Critical Error] Catalog verification failed:", catalogErr?.message);
    }

    // 2. Initialize internal 15-minute order reconciliation scheduler
    const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;
    setInterval(() => {
      void runOrderReconciliation();
    }, FIFTEEN_MINUTES_MS);

    console.log("[Boot] 15-minute background order reconciliation scheduler active.");
  }
}

