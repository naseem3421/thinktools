import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import Script from "next/script";
import TrackingScripts from "@/components/TrackingScripts";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
        url: `${siteUrl}/logo.png`,
        width: 1024,
        height: 364,
        alt: "ThinkTools - Work Smarter.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ThinkTools | Digital Products & Custom Software Solutions",
    description:
      "Explore practical digital products, construction calculation tools, and custom calculator, software, and workflow automation development from ThinkTools.",
    images: [`${siteUrl}/logo.png`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect to critical tracking and payment CDNs */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://api.razorpay.com" />

        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){if(!/^(www\\.)?thinktools\\.in$/.test(w.location.hostname))return;w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />
        {/* End Google Tag Manager */}
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
        <TrackingScripts />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
