import type { Metadata, Viewport } from "next";
import Script from "next/script";
import TrackingScripts from "@/components/TrackingScripts";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thinktools.in";

export const viewport: Viewport = {
  themeColor: "#172033",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ThinkTools | Digital Products & Custom Software Solutions",
    template: "%s | Thinktools.in",
  },
  description:
    "Explore practical digital products, construction calculation tools, and custom calculator, software, and workflow automation development from ThinkTools.",
  applicationName: "Thinktools",
  keywords: [
    "digital products",
    "custom software development",
    "custom calculator development",
    "construction calculator pro",
    "excel calculation toolkit",
    "workflow automation",
    "thinktools"
  ],
  authors: [{ name: "Thinktools", url: siteUrl }],
  creator: "Thinktools",
  publisher: "Thinktools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "ThinkTools | Digital Products & Custom Software Solutions",
    description:
      "Explore practical digital products, construction calculation tools, and custom calculator, software, and workflow automation development from ThinkTools.",
    siteName: "Thinktools",
    images: [
      {
        url: `${siteUrl}/logo-square.png`,
        width: 1024,
        height: 1024,
        alt: "ThinkTools - Work Smarter.",
      },
      {
        url: `${siteUrl}/logo.png`,
        width: 1024,
        height: 251,
        alt: "ThinkTools Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ThinkTools | Digital Products & Custom Software Solutions",
    description:
      "Explore practical digital products, construction calculation tools, and custom calculator, software, and workflow automation development from ThinkTools.",
    images: [`${siteUrl}/logo-square.png`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-144.png", sizes: "144x144", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-WWK5L329";
const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "z7wjvanly7";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        {/* Preconnect to critical font origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Asynchronous Non-Render-Blocking Google Fonts Loading */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap"
          media="print"
          // @ts-expect-error onLoad print-to-all switch for zero render-blocking
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap"
          />
        </noscript>

        {/* Preconnect & DNS-Prefetch for tracking, clarity & payments */}
        <link rel="preconnect" href="https://www.clarity.ms" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://api.razorpay.com" />

        {/* Microsoft Clarity Tracking */}
        {clarityId && (
          <Script
            id="microsoft-clarity"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarityId}");`,
            }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Google Tag Manager - Idle scheduled execution */}
        <Script
          id="google-tag-manager"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />

        <TrackingScripts />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
