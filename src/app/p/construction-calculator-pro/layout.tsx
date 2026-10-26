import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thinktools.in";
const pageUrl = `${siteUrl}/p/construction-calculator-pro`;

export const metadata: Metadata = {
  title: "Construction Calculator Pro — 31-Tab Master Civil Suite & BOQ Estimator",
  description:
    "Authoritative civil engineering and construction estimation suite for Indian residential and commercial projects. 31 interconnected Excel sheets, IS 456:2000 & CPWD norms, automated steel, cement, brick, tile quantities, contractor bill auditing, and 7 bonus resources. Instant download at ₹299 one-time payment.",
  keywords: [
    "construction calculator pro",
    "excel construction estimator india",
    "house construction cost calculator",
    "civil engineering excel sheets",
    "rebar steel weight calculator IS 1786",
    "cement sand mortar calculator IS 456",
    "contractor running bill check excel",
    "material wastage calculation CPWD",
    "1000 sq ft house construction cost",
    "building estimate spreadsheet download",
    "bill of quantities BOQ excel template",
    "reinforcement steel calculation formula d2/162",
    "construction schedule milestone tracker",
    "civil contractor quote comparison sheet"
  ],
  alternates: {
    canonical: "/p/construction-calculator-pro",
  },
  openGraph: {
    title: "Construction Calculator Pro — 31-Tab Master Civil Suite & Estimator",
    description:
      "Estimate building materials and organize construction budgets accurately. 31 connected Excel sheets + 43-page guide + 7 bonuses. ₹299 one-time payment.",
    url: pageUrl,
    type: "website",
    siteName: "Thinktools",
    locale: "en_IN",
    images: [
      {
        url: `${pageUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Construction Calculator Pro — 31 Connected Excel Sheets for Civil Estimations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Construction Calculator Pro — 31-Tab Master Civil Suite",
    description:
      "Automated material estimation, CPWD compliance, and contractor bill auditing in Microsoft Excel. ₹299 one-time.",
    images: [`${pageUrl}/opengraph-image`],
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
    "geo.position": "20.5937;78.9629",
    "ICBM": "20.5937, 78.9629",
    "product:price:amount": "299",
    "product:price:currency": "INR",
    "product:availability": "in stock",
    "product:condition": "new",
    "revisit-after": "3 days",
    "author": "Thinktools Engineering Editorial",
  },
};

export default function ConstructionCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteUrl,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Civil & Construction Tools",
            "item": `${siteUrl}/#catalog`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Construction Calculator Pro",
            "item": pageUrl,
          },
        ],
      },
      {
        "@type": ["Product", "SoftwareApplication"],
        "@id": `${pageUrl}#product`,
        "name": "Construction Calculator Pro",
        "description":
          "Complete 31-worksheet civil engineering and cost estimating suite for Indian construction projects. Calculates cement, sand, aggregate, reinforcement steel (IS 1786), brickwork, plaster, flooring, and audits contractor running bills with zero formulas required.",
        "url": pageUrl,
        "image": `${pageUrl}/opengraph-image`,
        "sku": "TT-CCP-01",
        "mpn": "TT-CCP-2026",
        "category": "Civil Engineering Software / Spreadsheets",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Microsoft Excel (2016 or newer, Microsoft 365 on Windows & macOS)",
        "fileFormat": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "fileSize": "1.91 MB",
        "brand": {
          "@type": "Brand",
          "name": "Thinktools",
          "url": siteUrl,
        },
        "publisher": {
          "@type": "Organization",
          "name": "Thinktools",
          "url": siteUrl,
          "logo": `${siteUrl}/logo.png`,
          "sameAs": ["https://www.instagram.com/thinktools.in"],
          "email": "support@thinktools.in",
        },
        "offers": {
          "@type": "Offer",
          "url": pageUrl,
          "priceCurrency": "INR",
          "price": "299",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "seller": {
            "@type": "Organization",
            "name": "Thinktools.in",
          },
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": "0",
              "currency": "INR",
            },
            "shippingDestination": {
              "@type": "DefinedRegion",
              "addressCountry": "IN",
            },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 0,
                "maxValue": 0,
                "unitCode": "MIN",
              },
            },
          },
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "IN",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 7,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does Construction Calculator Pro calculate materials for an Indian house?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Construction Calculator Pro uses standard Indian civil engineering formulas (IS 456:2000 for concrete and IS 1786 for reinforcement steel). Users simply type room dimensions (feet or metres) and floor heights. The 31 connected tabs automatically calculate cement bags (50kg), sand (cu.ft / brass), aggregate, red bricks/AAC blocks, and steel rebar weight by bar diameter (8mm, 10mm, 12mm, 16mm, 20mm, 25mm) using the exact W = D²/162 kg/m formula with CPWD standard wastage factors.",
            },
          },
          {
            "@type": "Question",
            "name": "Can Construction Calculator Pro detect contractor overbilling in running bills?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Yes. Worksheet Tab 25 ('Bill Check') features an automated Contractor Audit Engine. You enter the contractor's claimed quantity for any work item (concrete pouring, rebar fabrication, plaster area, or brickwork). The sheet calculates theoretical design consumption, calculates variance percentage, and triggers visual amber/red alert flags if the claim exceeds civil tolerance limits (e.g., >5% variation).",
            },
          },
          {
            "@type": "Question",
            "name": "What software is needed to run Construction Calculator Pro?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Construction Calculator Pro requires Microsoft Excel (Excel 2016, 2019, 2021, or Microsoft 365 on Windows or Mac). The files are pure OpenXML spreadsheets (.xlsx) engineered with native Microsoft Excel cross-sheet formulas, dynamic rate matrices, and conditional formatting. Other alternative spreadsheet apps are not supported.",
            },
          },
          {
            "@type": "Question",
            "name": "How do I receive the files after paying ₹499?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Delivery is instant and automated. As soon as payment is confirmed via UPI, NetBanking, or Credit/Debit Card through Razorpay, the master zip bundle (Construction_Calculator_Pro_Excel.zip) is dispatched directly to your email address within 60 seconds and a download receipt is presented on-screen.",
            },
          },
          {
            "@type": "Question",
            "name": "What is included in the Construction Calculator Pro bundle?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "The bundle includes 22 files: (1) Blank Master Excel Suite with 31 tabs; (2) Pre-filled 1,500 sq.ft Chennai G+1 Villa sample; (3) Pre-filled 1,000 sq.ft Flat Renovation sample; (4) 43-page Master Construction Guide PDF; (5) 7 Anti-Fear bonus kits including contractor hiring negotiation scripts, material quality checks, and snag handover checklist.",
            },
          },
          {
            "@type": "Question",
            "name": "Are there any monthly subscription fees or renewals?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "No. Thinktools operates on a transparent single one-time payment of ₹499 with permanent offline access and zero recurring fees or subscriptions.",
            },
          },
        ],
      },
      {
        "@type": "HowTo",
        "@id": `${pageUrl}#howto`,
        "name": "How to Calculate House Construction Cost & Materials in India",
        "description": "Step-by-step method to calculate total building material requirements and budget using Construction Calculator Pro.",
        "totalTime": "PT15M",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Select Measurement Units & Project Setup",
            "text": "Open Construction_Calculator_Pro_INDIA_v2.xlsx and toggle unit preference to Feet (sq.ft) or Metres (sq.m) on Tab 01 (Setup).",
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Input Plot & Room Dimensions",
            "text": "Enter room length, width, and ceiling height in Tab 04 (Room Area). The sheet automatically calculates built-up area and wall surface area.",
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Enter Local Material Rates",
            "text": "Fill in local vendor market rates for cement (₹/bag), sand (₹/cu.ft), rebar steel (₹/kg), and bricks (₹/piece) in Tab 12 (Rates).",
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Review Automated BOQ & Contractor Audit",
            "text": "Navigate to Tab 13 (Cost Estimate) and Tab 24 (Dashboard) to view your total project budget with automatic 10% contingency headroom and material rollups.",
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* High-priority preload for Largest Contentful Paint (LCP) hero screenshot */}
      <link
        rel="preload"
        as="image"
        href="/screenshots/01_cost_estimate.webp"
        type="image/webp"
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      {children}
    </>
  );
}
