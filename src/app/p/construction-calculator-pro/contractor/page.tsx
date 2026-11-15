import type { Metadata } from "next";
import ConstructionCalculatorLanding from "@/components/ConstructionCalculatorLanding";

export const metadata: Metadata = {
  title: "Construction Calculator Pro (Contractor Edition) - 15-Minute Client Quotes & Site Margin",
  description:
    "Quote accurate client BOQs in 15 minutes. 38 Connected Excel sheets with unit toggle. Includes Site Expense Tracker, Labour Attendance Sheet, and Payment Collection Tracker.",
  alternates: {
    canonical: "https://thinktools.in/p/construction-calculator-pro/contractor",
  },
};

export default function ContractorLandingPage() {
  return <ConstructionCalculatorLanding role="contractor" />;
}
