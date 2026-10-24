import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diwali Special Offer (₹299) | Construction Calculator Pro",
  description:
    "Exclusive Limited-Time Diwali Festive Offer: Complete Construction Calculator Pro 31-sheet suite for just ₹299/-.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

export default function DiwaliLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
