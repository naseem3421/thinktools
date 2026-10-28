"use client";

import React, { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const PRODUCTION_HOSTNAMES = ["thinktools.in", "www.thinktools.in"];

export function isProductionSite(): boolean {
  return (
    typeof window !== "undefined" &&
    PRODUCTION_HOSTNAMES.includes(window.location.hostname)
  );
}

export type TrackingEventName = "PageView" | "ViewContent" | "InitiateCheckout" | "Purchase";

export interface TrackingEventParams {
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
  transaction_id?: string;
  [key: string]: unknown;
}

export interface TrackingEventOptions {
  eventID?: string;
}

/**
 * Global telemetry dispatcher for Meta Pixel and GA4.
 * Never passes unhashed personally identifiable information (PII) to client scripts.
 */
export function trackEvent(
  eventName: TrackingEventName,
  params?: TrackingEventParams,
  options?: TrackingEventOptions
) {
  if (!isProductionSite()) return;

  // 1. Meta Pixel
  if (typeof window.fbq === "function") {
    if (options?.eventID) {
      window.fbq("track", eventName, params, { eventID: options.eventID });
    } else {
      window.fbq("track", eventName, params);
    }
  }

  // 2. Google Analytics 4 (if configured)
  if (typeof window.gtag === "function") {
    const gaEventMap: Record<string, string> = {
      PageView: "page_view",
      ViewContent: "view_item",
      InitiateCheckout: "begin_checkout",
      Purchase: "purchase",
    };
    window.gtag("event", gaEventMap[eventName] || eventName, params);
  }
}

/**
 * Listens to Next.js App Router client-side route transitions and dispatches
 * PageView on navigation while preventing duplicate PageView on initial page load.
 */
function MetaPixelRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);
  const lastTrackedUrl = useRef<string | null>(null);

  useEffect(() => {
    if (!isProductionSite()) return;

    const query = searchParams?.toString();
    const currentUrl = pathname + (query ? `?${query}` : "");

    // Skip the initial mount because the base inline script fires PageView on initial HTML load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      lastTrackedUrl.current = currentUrl;
      return;
    }

    // Only fire PageView if the URL actually changed during client-side navigation
    if (lastTrackedUrl.current !== currentUrl) {
      lastTrackedUrl.current = currentUrl;

      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "PageView");
      }

      const activeGaId = process.env.NEXT_PUBLIC_GA4_ID || "G-E8KZSPYVY1";
      if (
        typeof window !== "undefined" &&
        typeof window.gtag === "function" &&
        activeGaId
      ) {
        window.gtag("config", activeGaId, {
          page_path: currentUrl,
        });
      }
    }
  }, [pathname, searchParams]);

  return null;
}

/**
 * Root tracking component mounted once in RootLayout.
 * Reads NEXT_PUBLIC_META_PIXEL_ID and NEXT_PUBLIC_GA4_ID safely.
 */
export default function TrackingScripts() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const gaId = process.env.NEXT_PUBLIC_GA4_ID || "G-E8KZSPYVY1";

  // Development warning if Pixel ID is not configured
  useEffect(() => {
    if (!pixelId && process.env.NODE_ENV === "development") {
      console.warn(
        "[Thinktools Tracking] NEXT_PUBLIC_META_PIXEL_ID is not configured in environment variables. Meta Pixel tracking is safely disabled."
      );
    }
  }, [pixelId]);

  return (
    <>
      {/* Client-side route change tracker for App Router (wrapped in Suspense for useSearchParams) */}
      {(pixelId || gaId) && (
        <Suspense fallback={null}>
          <MetaPixelRouteTracker />
        </Suspense>
      )}

      {/* Meta Pixel Base Script */}
      {pixelId && (
        <>
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(){
                  if(!/^(www\\.)?thinktools\\.in$/.test(window.location.hostname))return;
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${pixelId}');
                  fbq('track', 'PageView');
                })();
              `,
            }}
          />
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      {/* Google Analytics 4 Script (optional) */}
      {gaId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(){
                  if(!/^(www\\.)?thinktools\\.in$/.test(window.location.hostname))return;
                  window.dataLayer = window.dataLayer || [];
                  window.gtag = function(){window.dataLayer.push(arguments);};
                  window.gtag('js', new Date());
                  window.gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                })();
              `,
            }}
          />
        </>
      )}
    </>
  );
}
