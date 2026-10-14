export interface CatalogTool {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  niche: string;
  category: "all" | "construction" | "real-estate" | "business" | "finance" | "ecommerce" | "nutrition";
  categoryLabel: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  isFlagship?: boolean;
  isReady: boolean;
  href: string; // for flagship this is /p/construction-calculator-pro
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

export const CATEGORIES = [
  { id: "all", label: "All Toolkits", icon: "LayoutGrid", count: 6 },
  { id: "construction", label: "Construction & Civil", icon: "Building2", count: 1, isFlagship: true },
  { id: "real-estate", label: "Real Estate & Land", icon: "Home", count: 1 },
  { id: "business", label: "Agency & Freelance", icon: "Briefcase", count: 1 },
  { id: "finance", label: "Wealth & FIRE", icon: "TrendingUp", count: 1 },
  { id: "ecommerce", label: "E-Commerce & D2C", icon: "ShoppingBag", count: 1 },
  { id: "nutrition", label: "Health & Nutrition", icon: "Activity", count: 1 },
] as const;

export const CATALOG_TOOLS: CatalogTool[] = [
  {
    id: "construction-calculator-pro",
    slug: "construction-calculator-pro",
    title: "Construction Calculator Pro – India Edition",
    shortTitle: "Construction Pro",
    niche: "Civil Engineering & House Construction",
    category: "construction",
    categoryLabel: "Construction & Civil",
    subtitle: "Complete Indian house construction quantity takeoff, cost estimation & contractor bill audit engine.",
    description: "Mathematically verified Excel engine built to IS 456 & CPWD specifications. Covers concrete, steel, brickwork, plaster, tiles, plumbing, electrical, and live contractor billing audit to prevent overcharging.",
    price: 499,
    originalPrice: 1999,
    discountPercentage: 75,
    rating: 4.94,
    reviewCount: 2840,
    badge: "🔥 #1 Bestseller • Most Popular",
    isFlagship: true,
    isReady: true,
    href: "/p/construction-calculator-pro",
    workbooksCount: 3,
    tabsCount: 31,
    guideCount: 13,
    fileTypes: [".xlsx (Excel)", "Google Sheets", "13 PDF Guides"],
    keyFeatures: [
      "31 Connected Tabs: Concrete, Steel (BBS), Brickwork, Flooring & Finishes",
      "Dynamic Rate Master: Enter your local market rates to get instant project totals",
      "Contractor Billing Audit Ledger: Cross-check subcontractor bills before paying",
      "Ready-to-use Sample Workbook: Filled 1,500 sq ft 3-BHK house build example"
    ],
    solvedProblems: [
      "Prevents contractor overbilling and surprise project cost inflation",
      "Eliminates guessing cement bags, steel tonnage, and sand truckloads",
      "Organizes stage-by-stage labor and vendor payment milestones"
    ],
    targetAudience: "Homeowners, Civil Engineers, Site Supervisors, Contractors & Architects",
    highlightTag: "INSTANT ACCESS READY",
    accentColor: {
      primary: "from-amber-500 to-amber-600",
      border: "border-amber-300",
      badgeBg: "bg-amber-50",
      badgeText: "text-amber-800",
      glow: "rgba(245, 158, 11, 0.15)"
    }
  },
  {
    id: "real-estate-roi-analyzer",
    slug: "real-estate-roi-analyzer",
    title: "Real Estate Deal Analyzer & Rental Yield Pro",
    shortTitle: "Real Estate ROI Pro",
    niche: "Property & Land Investment",
    category: "real-estate",
    categoryLabel: "Real Estate & Land",
    subtitle: "Analyze Indian residential & commercial property acquisitions, cash flows, and 20-year ROI.",
    description: "Underwrite plots, under-construction apartments, and commercial leases with complete Indian stamp duty, registration, GST, and Section 24 / 80C tax deduction modeling.",
    price: 599,
    originalPrice: 2499,
    discountPercentage: 76,
    rating: 4.91,
    reviewCount: 1120,
    badge: "⭐ Investor Choice",
    isFlagship: false,
    isReady: true,
    href: "/p/construction-calculator-pro", // Fallback to store modal / flagship
    workbooksCount: 2,
    tabsCount: 14,
    guideCount: 6,
    fileTypes: [".xlsx (Excel)", "Google Sheets", "6 PDF Guides"],
    keyFeatures: [
      "Net Rental Yield & Cap Rate Calculator for Tier-1 & Tier-2 Indian cities",
      "Pre-EMI vs Post-EMI Amortization Matrix with Home Loan Prepayment Modeler",
      "Commercial Lease Escalation & Cam Charges Cash Flow Forecast",
      "Capital Gains Tax Estimator (LTCG with Indexation comparisons)"
    ],
    solvedProblems: [
      "Distinguishes cash-flowing deals from value traps before signing the agreement",
      "Simulates real rental returns after municipal taxes, vacancy, and maintenance",
      "Calculates exact savings from partial home loan prepayments"
    ],
    targetAudience: "Property Buyers, Real Estate Investors, HNI Landlords & Consultants",
    highlightTag: "POPULAR IN 2026",
    accentColor: {
      primary: "from-blue-600 to-indigo-600",
      border: "border-blue-300",
      badgeBg: "bg-blue-50",
      badgeText: "text-blue-800",
      glow: "rgba(59, 130, 246, 0.15)"
    }
  },
  {
    id: "agency-client-profit-os",
    slug: "agency-client-profit-os",
    title: "Agency Client Retainer & Project Profitability OS",
    shortTitle: "Agency Profit OS",
    niche: "Digital Agencies, Studios & Freelancers",
    category: "business",
    categoryLabel: "Agency & Freelance",
    subtitle: "Calculate true billable hourly rates, client retainer margins, and stop unbilled scope creep.",
    description: "Built for marketing agencies, dev shops, and design studios across India & remote. Accurately factor employee overhead, bench time, GST invoicing, and project milestone profitability.",
    price: 499,
    originalPrice: 1999,
    discountPercentage: 75,
    rating: 4.88,
    reviewCount: 940,
    badge: "⚡ Studio Essential",
    isFlagship: false,
    isReady: true,
    href: "/p/construction-calculator-pro",
    workbooksCount: 2,
    tabsCount: 16,
    guideCount: 8,
    fileTypes: [".xlsx (Excel)", "Google Sheets", "Client Contract Templates"],
    keyFeatures: [
      "True Hourly Cost Calculator factoring bench time, software licenses & rent",
      "Fixed-Bid vs Monthly Retainer Scope & Margin Simulator",
      "Automated Milestone Invoicing & Payment Follow-up Pipeline",
      "Scope Creep Change Order Pricing Sheet & Client Agreement Templates"
    ],
    solvedProblems: [
      "Stops agencies from underquoting fixed-price client projects",
      "Surfaces which clients are losing money due to excessive revisions",
      "Provides clear data to increase retainer fees confidently"
    ],
    targetAudience: "Agency Founders, Creative Directors, Freelance Consultants & Dev Studios",
    highlightTag: "HIGH ROI",
    accentColor: {
      primary: "from-violet-600 to-purple-600",
      border: "border-violet-300",
      badgeBg: "bg-violet-50",
      badgeText: "text-violet-800",
      glow: "rgba(139, 92, 246, 0.15)"
    }
  },
  {
    id: "fire-wealth-calculator-india",
    slug: "fire-wealth-calculator-india",
    title: "Indian FIRE & Early Retirement Financial Engine",
    shortTitle: "FIRE Wealth Engine",
    niche: "Personal Finance & Wealth Creation",
    category: "finance",
    categoryLabel: "Wealth & FIRE",
    subtitle: "Determine your exact financial independence number and inflation-adjusted retirement runway.",
    description: "Designed specifically for the Indian financial ecosystem. Incorporates healthcare inflation (10-12%), Mutual Fund Step-Up SIPs, NPS, EPF, PPF, real estate cash flow, and tax-efficient withdrawal strategies.",
    price: 499,
    originalPrice: 1999,
    discountPercentage: 75,
    rating: 4.96,
    reviewCount: 1650,
    badge: "🔥 High Demand",
    isFlagship: false,
    isReady: true,
    href: "/p/construction-calculator-pro",
    workbooksCount: 2,
    tabsCount: 18,
    guideCount: 5,
    fileTypes: [".xlsx (Excel)", "Google Sheets", "FIRE Action Plan PDF"],
    keyFeatures: [
      "Multi-Phase Indian Retirement Corpus Model with real lifestyle inflation",
      "Step-Up SIP Compounding Engine with historical benchmark returns",
      "Safe Withdrawal Rate (SWR) Stress Tester under market crashes",
      "Asset Allocation Rebalancing Matrix (Equity vs Debt vs Gold vs Real Estate)"
    ],
    solvedProblems: [
      "Cuts through generic online SIP calculators that ignore Indian inflation",
      "Shows exactly what age you can afford to retire or take a career break",
      "Maps debt-to-equity rebalancing without triggering unexpected tax hits"
    ],
    targetAudience: "IT Professionals, Salaried Executives, Solopreneurs & Wealth Builders",
    highlightTag: "LIFE CHANGER",
    accentColor: {
      primary: "from-emerald-600 to-teal-600",
      border: "border-emerald-300",
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-800",
      glow: "rgba(16, 185, 129, 0.15)"
    }
  },
  {
    id: "d2c-unit-economics-simulator",
    slug: "d2c-unit-economics-simulator",
    title: "D2C Unit Economics & Ad Spend Breakeven Simulator",
    shortTitle: "D2C Margin Engine",
    niche: "E-Commerce, Shopify & Amazon India",
    category: "ecommerce",
    categoryLabel: "E-Commerce & D2C",
    subtitle: "Model COD vs Prepaid margins, RTO losses, courier weight tiers, and blended CAC breakeven.",
    description: "The battle-tested spreadsheet used by direct-to-consumer founders in India. Factor in 25-35% COD Return-to-Origin (RTO) penalties, payment gateway cuts, GST input credit, and real contribution margin (CM3).",
    price: 599,
    originalPrice: 2499,
    discountPercentage: 76,
    rating: 4.89,
    reviewCount: 780,
    badge: "💼 Founder Toolkit",
    isFlagship: false,
    isReady: true,
    href: "/p/construction-calculator-pro",
    workbooksCount: 2,
    tabsCount: 12,
    guideCount: 4,
    fileTypes: [".xlsx (Excel)", "Google Sheets", "E-com Playbook PDF"],
    keyFeatures: [
      "COD vs Prepaid Net Contribution Margin (CM1, CM2, CM3) Simulator",
      "RTO Cost Impact Estimator: Calculates dead logistics loss per return",
      "Target ROAS & Maximum Allowable CAC Calculator for Meta & Google Ads",
      "Inventory Reorder Point & Working Capital Runway Dashboard"
    ],
    solvedProblems: [
      "Prevents scaling Facebook ads into hidden losses caused by high COD RTO",
      "Reveals true profit per delivered parcel after all logistics and packaging costs",
      "Sets strict daily ad budget ceilings based on actual gross margins"
    ],
    targetAudience: "D2C Brand Founders, Amazon/Flipkart Sellers, Shopify Store Owners",
    highlightTag: "FOR GROWTH",
    accentColor: {
      primary: "from-rose-600 to-pink-600",
      border: "border-rose-300",
      badgeBg: "bg-rose-50",
      badgeText: "text-rose-800",
      glow: "rgba(244, 63, 94, 0.15)"
    }
  },
  {
    id: "diet-nutrition-master-suite",
    slug: "diet-nutrition-master-suite",
    title: "Precision Indian Diet & Macro Master Suite",
    shortTitle: "Nutrition Master",
    niche: "Health, Fitness & Clinical Nutrition",
    category: "nutrition",
    categoryLabel: "Health & Nutrition",
    subtitle: "1,200+ Indian cooked foods database, macro splits, TDEE calculator & meal plan generator.",
    description: "Specifically calibrated for Indian diets (dal, roti, rice varieties, paneer, regional dishes). Calculate calorie targets, protein ratios, client dietary logs, and generate formatted PDF meal plans without monthly software fees.",
    price: 399,
    originalPrice: 1499,
    discountPercentage: 73,
    rating: 4.92,
    reviewCount: 1430,
    badge: "🥗 Health Pro",
    isFlagship: false,
    isReady: true,
    href: "/p/construction-calculator-pro",
    workbooksCount: 2,
    tabsCount: 10,
    guideCount: 4,
    fileTypes: [".xlsx (Excel)", "Google Sheets", "Recipe & Macro PDF"],
    keyFeatures: [
      "1,200+ Verified Indian Foods & Regional Recipes with raw vs cooked weights",
      "Automated TDEE, BMR, and Target Macro Split Generator (Weight loss, Muscle, Maintenance)",
      "Weekly Client Meal Planning Matrix with automatic grocery list compilation",
      "Vegetarian & Vegan Protein Optimization Cheat Sheet"
    ],
    solvedProblems: [
      "Solves the lack of accurate Indian food nutrient data in western apps",
      "Allows fitness coaches to build custom diet plans in under 10 minutes",
      "No recurring $30/month software subscription needed"
    ],
    targetAudience: "Personal Trainers, Nutritionists, Fitness Enthusiasts & Meal Preppers",
    highlightTag: "INDIAN DIET DATA",
    accentColor: {
      primary: "from-teal-600 to-emerald-600",
      border: "border-teal-300",
      badgeBg: "bg-teal-50",
      badgeText: "text-teal-800",
      glow: "rgba(20, 184, 166, 0.15)"
    }
  }
];

export const THINKTOOLS_PROMISES = [
  {
    icon: "Unlock",
    title: "Zero Subscriptions Ever",
    description: "Pay once and own the tool forever. No monthly billing, no surprise card charges, and no cloud access lockouts."
  },
  {
    icon: "ShieldCheck",
    title: "100% Private & Offline",
    description: "Runs locally on Microsoft Excel or Google Sheets. Your company figures, project estimates, and net worth never touch any cloud server."
  },
  {
    icon: "Cpu",
    title: "Battle-Tested Mathematical Models",
    description: "Every formula is audited by industry practitioners—from licensed civil engineers to certified chartered accountants."
  },
  {
    icon: "Zap",
    title: "Instant Digital Fulfillment",
    description: "Complete toolkit bundle delivered straight to your email inbox the second your secure UPI/Card checkout completes."
  }
];

export const COMPARISON_POINTS = [
  {
    feature: "Pricing Model",
    freeWeb: "Ad-heavy or paywalled later",
    saasApps: "₹1,500 – ₹5,000 / month recurring",
    thinktools: "₹499 one-time lifetime license"
  },
  {
    feature: "Data Privacy",
    freeWeb: "Collected for ad targeting",
    saasApps: "Stored on third-party servers",
    thinktools: "100% Local on your computer"
  },
  {
    feature: "Customizability",
    freeWeb: "Rigid, locked formulas",
    saasApps: "Limited to rigid UI dropdowns",
    thinktools: "Fully editable formulas & rows"
  },
  {
    feature: "Offline Access",
    freeWeb: "Requires active internet",
    saasApps: "Stops working without signal",
    thinktools: "Works 100% offline on any device"
  },
  {
    feature: "Indian Market Specifics",
    freeWeb: "Generic US / Western units",
    saasApps: "Poor Indian unit & tax support",
    thinktools: "Engineered specifically for India"
  }
];

export const FAQS = [
  {
    question: "How do I receive the toolkits after purchase?",
    answer: "Immediately upon completing payment via Razorpay (UPI, Credit/Debit Cards, Net Banking), your complete digital toolkit (.zip bundle containing all workbooks and PDF guides) is dispatched directly to your registered email address with the files attached for instant, permanent offline access."
  },
  {
    question: "Do I need special software or coding skills to use these tools?",
    answer: "No coding or advanced technical skills required. All our workbooks are engineered for Microsoft Excel (2016 or newer, Microsoft 365, Mac or Windows) and Google Sheets. They are completely macro-free (no dangerous VBA scripts), meaning they open smoothly without security warnings."
  },
  {
    question: "Can I customize the formulas, add my own rows, or change company branding?",
    answer: "Yes, 100%! Unlike locked web apps, you receive fully unlocked spreadsheet workbooks. You can insert your company logo, modify labor rates, add custom calculation rows, and tailor the layout to your specific business workflow."
  },
  {
    question: "What makes Construction Calculator Pro different from other online calculators?",
    answer: "Construction Calculator Pro is a 31-tab connected civil engineering package built to CPWD & IS 456 standards. It includes 3 workbooks (Blank Engine, 1,500 sq ft Chennai Example, and Rate Master), 13 PDF site guides, and 7 bonuses including contractor audit sheets. Clicking on it on this page will take you to its dedicated in-depth presentation."
  },
  {
    question: "Are there any recurring monthly charges or renewal fees?",
    answer: "None whatsoever. At Thinktools.in, we stand against the SaaS subscription trap. You pay once and own the workbooks, reference guides, and bonus templates for life."
  },
  {
    question: "What if I get stuck while using one of the workbooks?",
    answer: "Every toolkit comes accompanied by comprehensive PDF user guides, step-by-step video walkthrough references, and a pre-filled sample project workbook showing how inputs relate to outputs with built-in guidance notes on every sheet."
  }
];
