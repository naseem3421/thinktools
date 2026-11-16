import type { Metadata } from "next";
import HomeownerMobileLanding from "@/components/HomeownerMobileLanding";

export const metadata: Metadata = {
  title: "Construction Calculator Pro (Homeowner Edition) - Estimate Materials & Audit Bills",
  description:
    "Stop contractor overcharging. 38 Connected Excel sheets calibrated for Indian site realities. Includes House Budget Tracker, Stage Payment Planner, and Quality Checklist.",
  alternates: {
    canonical: "https://thinktools.in/p/construction-calculator-pro/homeowner",
  },
};

export default function HomeownerLandingPage() {
  return <HomeownerMobileLanding />;
}
