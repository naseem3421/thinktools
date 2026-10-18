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
  },
  twitter: {
    card: "summary_large_image",
    title: "ThinkTools | Digital Products & Custom Software Solutions",
    description:
      "Explore practical digital products, construction calculation tools, and custom calculator, software, and workflow automation development from ThinkTools.",
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
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        <TrackingScripts />
        {children}
        <CookieBanner />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
