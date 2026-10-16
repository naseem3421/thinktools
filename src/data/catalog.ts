export interface CatalogTool {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  niche: string;
  category: string;
  categoryLabel: string;
  subtitle: string;
  description: string;
  price: number;
  badge?: string;
  isFlagship?: boolean;
  isReady: boolean;
  href: string; // link to dedicated product page
  imageSrc: string;
  imageAlt: string;
  workbooksCount: number;
  tabsCount: number;
  guideCount: number;
  fileTypes: string[];
  keyFeatures: string[];
  solvedProblems: string[];
  targetAudience: string;
  highlightTag?: string;
  accentColor: {
    primary: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    glow: string;
  };
}

export interface RoadmapTool {
  id: string;
  title: string;
  niche: string;
  categoryLabel: string;
  subtitle: string;
  plannedFeatures: string[];
  status: "In Development" | "Planned";
}

export const CATEGORIES = [
  { id: "all", label: "All Tools", icon: "LayoutGrid", description: "Browse all online tools, Excel models, and digital templates" },
  { id: "construction", label: "Construction & Civil", icon: "Building2", isFlagship: true, description: "Quantity takeoff, rebar BBS, cement, sand, masonry & bill audit suites" },
  { id: "electrical", label: "Electrical & Measurement", icon: "Zap", isFlagship: false, description: "Unit conversions, site measurements, wire tables & sizing calculators" },
  { id: "estimation", label: "Estimation & Budgeting", icon: "Calculator", isFlagship: false, description: "BOQ generators, stage budgets, rate masters & cost contingency models" },
  { id: "business", label: "Business & Productivity", icon: "Briefcase", isFlagship: false, description: "Hourly rates, client proposals, profit margins & time-saving utilities" },
  { id: "templates", label: "Templates & Spreadsheets", icon: "FileSpreadsheet", isFlagship: false, description: "Formula-linked, unlocked Microsoft Excel workbooks for offline work" },
  { id: "saas", label: "Digital Products & SaaS", icon: "Cloud", isFlagship: false, description: "Standalone digital bundles & upcoming cloud collaboration software" },
] as const;

export const CATALOG_TOOLS: CatalogTool[] = [
  {
    id: "construction-calculator-pro",
    slug: "construction-calculator-pro",
    title: "Construction Calculator Pro – India Edition",
    shortTitle: "Construction Calculator Pro",
    niche: "Civil Engineering & Residential Estimation",
    category: "construction",
    categoryLabel: "Construction & Civil",
    subtitle: "Complete Indian house construction quantity takeoff, cost estimation, and contractor bill verification workbook.",
    description: "An unlocked, macro-free Microsoft Excel system built around CPWD specifications and IS 456 calculation principles. Covers room area takeoff, concrete, rebar steel, masonry, plaster, flooring, plumbing, electrical, and running bill verification.",
    price: 499,
    badge: "Available Now • Complete Suite",
    isFlagship: true,
    isReady: true,
    href: "/p/construction-calculator-pro",
    imageSrc: "/screenshots/01_cost_estimate.png",
    imageAlt: "Construction Calculator Pro Cost Estimate Sheet showing bill of quantities and stage budget",
    workbooksCount: 3,
    tabsCount: 31,
    guideCount: 13,
    fileTypes: [".xlsx (Requires Microsoft Excel 2016-365)", "13 PDF Guides & Worksheets", "7 Bonus Manuals"],
    keyFeatures: [
      "31 Connected Worksheets: Room areas, concrete, steel BBS, masonry, plaster, paint, tiles, and services",
      "Dynamic Central Rate Master: Enter your local market material and labor rates to recalculate the entire project",
      "Subcontractor Bill Verification Ledger: Cross-check contractor claims against drawing measurements with a 5% variance flag",
      "Includes 3 Workbooks: Clean Master Template, 1,500 sq ft Villa Example (Chennai), and 1,000 sq ft Apartment Remodel Example",
      "Dual Measurement Units: Toggle between Feet & Inches and Metric (Metres) across all sheets"
    ],
    solvedProblems: [
      "Replaces scattered scratchpad estimates with a unified, formula-linked project ledger",
      "Calculates theoretical material requirements (cement bags, steel tonnage, sand) using standard civil consumption factors",
      "Helps cross-examine contractor measurement claims before releasing stage disbursements"
    ],
    targetAudience: "Homeowners building or renovating a home, owner-builders, site supervisors, civil engineers, and residential contractors",
    highlightTag: "INSTANT ACCESS",
    accentColor: {
      primary: "from-amber-500 to-amber-600",
      border: "border-amber-300",
      badgeBg: "bg-amber-50",
      badgeText: "text-amber-800",
      glow: "rgba(245, 158, 11, 0.15)"
    }
  }
];

export const ROADMAP_TOOLS: RoadmapTool[] = [
  {
    id: "real-estate-roi-analyzer",
    title: "Real Estate Deal Analyzer & Yield Model",
    niche: "Property & Land Investment",
    categoryLabel: "Real Estate & Land",
    subtitle: "Underwriting models for Indian rental yields, stamp duty, registration, and loan prepayment amortization.",
    plannedFeatures: [
      "Net rental yield calculations across Tier-1 and Tier-2 Indian cities",
      "Amortization schedule modeling prepayments and interest savings",
      "Capital gains tax estimation framework (LTCG / indexation comparisons)"
    ],
    status: "In Development"
  },
  {
    id: "agency-client-profit-os",
    title: "Agency Retainer & Project Margin Engine",
    niche: "Studios, Agencies & Independent Consultants",
    categoryLabel: "Agency & Business",
    subtitle: "Financial model to calculate true billable hourly rates, team overhead, and fixed-fee client margins.",
    plannedFeatures: [
      "True cost-per-hour calculator factoring employee benefits and bench time",
      "Scope change order pricing worksheet to document revisions",
      "Milestone-based project disbursement and cash flow forecast"
    ],
    status: "In Development"
  },
  {
    id: "fire-wealth-calculator-india",
    title: "Indian Financial Independence & Corpus Simulator",
    niche: "Personal Finance & Long-Term Planning",
    categoryLabel: "Personal Finance",
    subtitle: "Long-term compounding model factoring Indian lifestyle inflation, Step-Up SIPs, and diversified asset allocation.",
    plannedFeatures: [
      "Inflation-adjusted retirement runway modeling healthcare and lifestyle inflation",
      "Multi-asset rebalancing matrix (Equity, Debt, Gold, Real Estate)",
      "Systematic withdrawal schedule and stress testing"
    ],
    status: "Planned"
  }
];

export const THINKTOOLS_PROMISES = [
  {
    icon: "Unlock",
    title: "Zero Recurring Subscriptions",
    description: "Pay once (₹499) for permanent access. No monthly fees, no annual renewals, and no unexpected card charges."
  },
  {
    icon: "ShieldCheck",
    title: "100% Private Offline Files",
    description: "Runs locally on your computer in Microsoft Excel. Your project estimates and numbers never leave your device."
  },
  {
    icon: "Cpu",
    title: "Transparent Engineering Formulas",
    description: "Structured around recognized Indian civil standards (CPWD specifications, IS 456 mix proportions, and IS 1786 rebar constants) with inspectable, editable cells."
  },
  {
    icon: "Zap",
    title: "Instant Digital Delivery",
    description: "Immediate on-screen download access upon payment completion plus an automated confirmation email with your .zip package attached."
  }
];

export const COMPARISON_POINTS = [
  {
    feature: "Pricing Model",
    freeWeb: "Ad-heavy or locked behind unexpected paywalls",
    saasApps: "₹1,500 – ₹5,000 / month recurring subscriptions",
    thinktools: "₹499 one-time payment for lifetime project use"
  },
  {
    feature: "Data Privacy",
    freeWeb: "Project data stored on third-party servers",
    saasApps: "Requires cloud account and persistent connection",
    thinktools: "100% Local file storage on your own device"
  },
  {
    feature: "Customizability",
    freeWeb: "Rigid web forms with locked assumptions",
    saasApps: "Restricted to vendor-defined features",
    thinktools: "Fully unlocked formulas, editable cells, and rows"
  },
  {
    feature: "Offline Access",
    freeWeb: "Requires active internet connection",
    saasApps: "Inaccessible on remote construction sites",
    thinktools: "Functions completely offline in Microsoft Excel"
  },
  {
    feature: "Indian Construction Standards",
    freeWeb: "Generic imperial units without Indian trade norms",
    saasApps: "Western unit conventions with poor Indian rate support",
    thinktools: "Built for Indian practice (Feet/Inches & Metric, Bags, Brass, Tonnage)"
  }
];

export const FAQS = [
  {
    question: "What is included in Construction Calculator Pro?",
    answer: "You receive three complete Microsoft Excel (.xlsx) workbooks spanning 31 connected worksheets each: (1) Blank Project Calculator Engine for your custom project, (2) 1,500 sq ft 3-BHK Villa Example (Chennai) with sample calculations and rates, and (3) 1,000 sq ft Flat Renovation Example for interior remodeling. You also receive 13 PDF implementation guides, worksheets, checklists, and 7 specialized bonus reference manuals delivered in a single compressed .zip bundle."
  },
  {
    question: "Who is this calculator designed for?",
    answer: "The package is designed for homeowners planning a new home construction or renovation, owner-builders managing site purchases directly, site supervisors and civil engineers who need to prepare quick Bill of Quantities (BOQ), and small contractors preparing transparent client quotations."
  },
  {
    question: "Which software is required to use Construction Calculator Pro?",
    answer: "Construction Calculator Pro requires Microsoft Excel (Excel 2016, 2019, 2021, or Microsoft 365 on Windows or Mac). The workbooks are pure OpenXML (.xlsx) files engineered specifically with native Microsoft Excel formulas, conditional formatting rules, and cross-sheet linkages. Google Sheets and other alternative spreadsheet applications are not supported because certain multi-tab formulas, cell formatting, and dynamic references are designed strictly for Microsoft Excel."
  },
  {
    question: "How does digital delivery work after purchase?",
    answer: "Immediately upon successful payment via Razorpay, your browser redirects to an on-screen confirmation page with direct download links. Simultaneously, our automated fulfillment system dispatches a confirmation email containing your download links and attaching the full .zip bundle directly to your email address."
  },
  {
    question: "What payment methods are supported?",
    answer: "We support all major Indian payment methods through Razorpay Standard Checkout: UPI (Google Pay, PhonePe, Paytm, BHIM, and any UPI handle), Debit Cards, Credit Cards (Visa, MasterCard, RuPay), and Net Banking across all major Indian banks."
  },
  {
    question: "What is the cancellation and refund policy?",
    answer: "Because ThinkTools provides instant digital downloads that are fulfilled immediately upon payment, all sales are final once files have been accessed or delivered, as outlined in our Cancellation & Refund Policy. If you experience any technical difficulty opening or downloading your files, our support team will provide replacement files promptly."
  },
  {
    question: "What are the limitations and assumptions of the estimates?",
    answer: "Construction Calculator Pro provides theoretical material and cost estimates based on user-entered room dimensions, engineering consumption norms (such as CPWD guidelines and IS 456 proportions), and user-provided local material rates. It is not structural engineering software (like STAAD.Pro or ETABS) and does not replace certified structural drawings, municipal plan sanctions, or physical on-site inspections."
  },
  {
    question: "How do I get customer or technical support?",
    answer: "If you have any questions about downloading your package or opening the files in your preferred spreadsheet software, you can email our support desk directly at support@thinktools.in. We typically respond within 24 business hours."
  }
];
