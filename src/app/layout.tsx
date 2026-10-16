import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

import Script from "next/script";
import TrackingScripts from "@/components/TrackingScripts";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thinktools.in";

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Thinktools.in — Smart Digital Toolkits & Construction Calculators",
    template: "%s | Thinktools.in",
  },
  description:
    "Thoughtfully engineered digital tools, construction estimators, and Excel calculators. IS 456 & CPWD compliant, lifetime access, zero subscriptions.",
  applicationName: "Thinktools",
  keywords: [
    "construction calculator",
    "excel construction estimator",
    "building material estimate",
    "steel calculator",
    "cement sand calculator",
    "civil engineering excel sheets",
    "contractor bill check",
    "thinktools"
  ],
  authors: [{ name: "Thinktools India", url: siteUrl }],
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
    title: "Thinktools.in — Smart Digital Toolkits & Construction Calculators",
    description:
      "Thoughtfully engineered digital tools, construction estimators, and Excel calculators. Lifetime access, instant download.",
    siteName: "Thinktools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thinktools.in — Smart Digital Toolkits & Construction Calculators",
    description:
      "Engineered Excel suites and construction estimators. No monthly subscriptions, instant download.",
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
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
    "geo.position": "20.5937;78.9629",
    "ICBM": "20.5937, 78.9629",
    "revisit-after": "3 days",
    "rating": "General",
    "distribution": "Global",
    "DC.title": "Thinktools.in — Smart Digital Toolkits & Construction Calculators",
    "DC.creator": "Thinktools India",
    "DC.subject": "Civil Engineering, Construction Cost Estimation, Excel Calculators",
    "DC.language": "en-IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#475569] font-sans">
        <TrackingScripts />
        {children}
        <CookieBanner />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
