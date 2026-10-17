export interface FreeTool {
  id: string;
  name: string;
  description: string;
  category: "Construction & Civil" | "Electrical & Measurement" | "Estimation & Budgeting" | "Business & Productivity" | "Templates & Spreadsheets";
  categorySlug: string;
  status: "Ready to Use" | "Experimental" | "In Development";
  isFunctional: boolean;
  type: "calculator" | "template" | "estimator";
  defaultInputs?: Record<string, number | string>;
}

export const TOOL_CATEGORIES = [
  "All Categories",
  "Construction & Civil",
  "Electrical & Measurement",
  "Estimation & Budgeting",
  "Business & Productivity",
  "Templates & Spreadsheets",
] as const;

export const FREE_TOOLS: FreeTool[] = [
  {
    id: "concrete-mix-calculator",
    name: "Concrete Volume & Mix Estimator",
    description: "Calculate concrete wet volume, dry volume (1.54 factor), cement bags, coarse sand, and gravel for M15, M20, and M25 mix ratios.",
    category: "Construction & Civil",
    categorySlug: "construction",
    status: "Ready to Use",
    isFunctional: true,
    type: "calculator",
  },
  {
    id: "brick-mortar-calculator",
    name: "Brick & Mortar Wall Estimator",
    description: "Determine modular brick counts, cement bags, and sand volume for 4.5-inch half-brick and 9-inch full-brick masonry walls with opening deductions.",
    category: "Construction & Civil",
    categorySlug: "construction",
    status: "Ready to Use",
    isFunctional: true,
    type: "calculator",
  },
  {
    id: "room-paint-tile-calculator",
    name: "Room Tile & Paint Estimator",
    description: "Estimate floor carpet area, required 600×600 mm tile cartons, net wall surface area with window deductions, and paint litres.",
    category: "Estimation & Budgeting",
    categorySlug: "estimation",
    status: "Ready to Use",
    isFunctional: true,
    type: "calculator",
  },
  {
    id: "steel-bbs-calculator",
    name: "Steel Rebar BBS Weight Estimator",
    description: "Compute structural TMT rebar steel weight in kilograms and metric tonnes based on standard IS bar diameter formula (D²/162.2).",
    category: "Construction & Civil",
    categorySlug: "construction",
    status: "Ready to Use",
    isFunctional: true,
    type: "calculator",
  },
  {
    id: "electrical-load-estimator",
    name: "Electrical Load & Wire Gauge Estimator",
    description: "Estimate continuous operating current (Amps) at 230V and identify recommended copper conductor wire sizes (sq mm) and MCB breaker ratings.",
    category: "Electrical & Measurement",
    categorySlug: "electrical",
    status: "Ready to Use",
    isFunctional: true,
    type: "calculator",
  },
  {
    id: "hourly-rate-margin-calculator",
    name: "Hourly Rate & Profit Margin Calculator",
    description: "Calculate your target billable hourly rate, day rate, and revenue goals based on desired personal net income and operational business overhead.",
    category: "Business & Productivity",
    categorySlug: "business",
    status: "Ready to Use",
    isFunctional: true,
    type: "calculator",
  },
  {
    id: "gst-tax-invoice-calculator",
    name: "GST Split & Tax Invoice Breakdown",
    description: "Split inclusive or exclusive invoice totals into net base price, CGST, SGST, and IGST for standard 5%, 12%, 18%, and 28% GST brackets.",
    category: "Business & Productivity",
    categorySlug: "business",
    status: "Ready to Use",
    isFunctional: true,
    type: "calculator",
  },
  {
    id: "excavation-volume-calculator",
    name: "Earthwork & Excavation Volume Estimator",
    description: "Calculate foundation pit and trench excavation volume, loose soil swell volume (20%), brass units (100 cu ft), and tipper truck trips.",
    category: "Construction & Civil",
    categorySlug: "construction",
    status: "Ready to Use",
    isFunctional: true,
    type: "calculator",
  },
  {
    id: "plastering-mortar-calculator",
    name: "Plastering Mortar & Cement Estimator",
    description: "Determine cement bags and fine sand volume for 12mm internal and 18mm external wall plastering across 1:4 and 1:6 mix ratios.",
    category: "Construction & Civil",
    categorySlug: "construction",
    status: "Ready to Use",
    isFunctional: true,
    type: "calculator",
  },
  {
    id: "contractor-boq-template",
    name: "Contractor Bill of Quantities (BOQ) Starter",
    description: "A clean starter spreadsheet structure for item-rate contractor civil quotes, trade subtotals, and printable client estimate formats.",
    category: "Templates & Spreadsheets",
    categorySlug: "templates",
    status: "Ready to Use",
    isFunctional: true,
    type: "template",
  },
  {
    id: "solar-rooftop-estimator",
    name: "Rooftop Solar Capacity & Generation Estimator",
    description: "Estimate rooftop photovoltaic capacity (kWp), required roof shadow-free area (sq ft), and estimated monthly solar units generated.",
    category: "Electrical & Measurement",
    categorySlug: "electrical",
    status: "Experimental",
    isFunctional: true,
    type: "calculator",
  },
  {
    id: "saas-cash-runway-calculator",
    name: "SaaS Runway & Burn Rate Calculator",
    description: "Calculate cash runway in months, net monthly burn, and zero-cash projections for bootstrapped software tools and small agencies.",
    category: "Business & Productivity",
    categorySlug: "business",
    status: "In Development",
    isFunctional: true,
    type: "calculator",
  },
];

export interface DigitalProduct {
  id: string;
  name: string;
  category: string;
  availability: "Available Now" | "Coming Soon";
  isAvailable: boolean;
  coverImage: string;
  description: string;
  details: string[];
  price?: string;
  priceNote?: string;
  ctaText: string;
  ctaHref?: string;
  disclaimer: string;
}

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: "construction-calculator-pro",
    name: "Construction Calculator Pro",
    category: "Downloadable Excel Toolkit",
    availability: "Available Now",
    isAvailable: true,
    coverImage: "/screenshots/01_cost_estimate.png",
    description: "Plan construction quantities, organize estimated costs, and review project calculations using a collection of editable Excel workbooks and supporting resources.",
    details: [
      "Three Excel workbooks",
      "31 connected worksheets",
      "13 PDF guides and worksheets",
      "Seven bonus reference resources",
    ],
    price: "₹499",
    priceNote: "One-Time Payment",
    ctaText: "View Product Details",
    ctaHref: "/p/construction-calculator-pro",
    disclaimer: "Estimates depend on the dimensions, rates, assumptions, and inputs supplied by the user. This toolkit does not replace professional structural design or engineering review.",
  },
  {
    id: "construction-management-saas",
    name: "Construction Management SaaS",
    category: "Cloud-Based Software",
    availability: "Coming Soon",
    isAvailable: false,
    coverImage: "/products/construction-management-saas.jpg",
    description: "A planned software product for organizing construction-related workflows in a browser-based environment.",
    details: [
      "Browser-based multi-user workspaces",
      "Centralized material & contractor tracking",
      "Real-time cloud database synchronization",
      "Site log and measurement ledger access",
    ],
    ctaText: "Register Interest",
    disclaimer: "This product is not currently available for purchase. Do not display a purchase button or promise a release date until confirmed.",
  },
  {
    id: "whatsapp-automation",
    name: "WhatsApp Automation",
    category: "Business Automation",
    availability: "Coming Soon",
    isAvailable: false,
    coverImage: "/products/whatsapp-automation.jpg",
    description: "A planned solution for businesses interested in using WhatsApp to manage customer enquiries and routine communication.",
    details: [
      "Automated lead capture & instant replies",
      "Catalogue and quotation trigger flows",
      "Site progress notification dispatches",
      "Integration with CRM and spreadsheets",
    ],
    ctaText: "Register Interest",
    disclaimer: "This product is not currently available for purchase. Custom automation enquiries can be discussed separately through the Custom Solutions section.",
  },
];

export interface CustomSolutionCategory {
  title: string;
  description: string;
  examples: string[];
}

export const CUSTOM_SOLUTIONS: CustomSolutionCategory[] = [
  {
    title: "Custom Calculator Development",
    description: "Calculators designed around your formulas, inputs, rules, and reporting requirements.",
    examples: [
      "Cost and budget calculators",
      "Estimation and quotation tools",
      "Industry-specific calculation tools",
      "Excel-based calculation systems",
    ],
  },
  {
    title: "Custom Software & SaaS",
    description: "Purpose-built web applications for specific business processes.",
    examples: [
      "Business dashboards and internal tools",
      "Workflow and record-management applications",
      "Industry-specific web applications",
      "SaaS product planning and development",
    ],
  },
  {
    title: "WhatsApp & Workflow Automation",
    description: "Tools and integrations intended to reduce repetitive communication and manual steps.",
    examples: [
      "Enquiry-management workflows",
      "WhatsApp-based business processes",
      "Form and data integrations",
      "Notifications and follow-up workflows",
    ],
  },
  {
    title: "Digital Product Development",
    description: "Turn a repeatable process or specialist workflow into a structured digital product.",
    examples: [
      "Excel workbooks and templates",
      "Online tools and calculators",
      "Digital resources for a defined niche",
      "Product prototypes and minimum viable products (MVPs)",
    ],
  },
];

export const PROJECT_WORK_STEPS = [
  {
    step: "01",
    title: "Share Your Requirement",
    description: "Explain the problem, your intended users, and the outcome you need from the tool or software.",
  },
  {
    step: "02",
    title: "Define the Scope",
    description: "Discuss the proposed features, technical requirements, dependencies, estimated cost, and delivery timeline.",
  },
  {
    step: "03",
    title: "Develop and Review",
    description: "Once the scope is agreed, development proceeds with review points appropriate to the project.",
  },
  {
    step: "04",
    title: "Handover",
    description: "The completed deliverables, usage instructions, and any agreed support arrangements are provided according to the project scope.",
  },
];

export const WHY_THINKTOOLS = [
  {
    title: "Built Around Real Requirements",
    description: "Tools and software should address a specific task or workflow rather than add unnecessary complexity.",
  },
  {
    title: "Clear Product Information",
    description: "We aim to explain what each product includes, what it requires, and what it is designed to do.",
  },
  {
    title: "Transparent Scope and Pricing",
    description: "For paid products, the price and included deliverables should be visible before purchase. For custom projects, scope and cost are discussed before work begins.",
  },
  {
    title: "Different Ways to Solve a Problem",
    description: "Depending on the requirement, the right solution may be a free online tool, an Excel workbook, an automation, or a custom application.",
  },
];

export const WHO_WE_BUILD_FOR = [
  {
    title: "Construction & Civil",
    description: "Calculation, estimation, budgeting, and project-related tools.",
  },
  {
    title: "Business & Operations",
    description: "Calculators, templates, dashboards, and tools for routine business tasks.",
  },
  {
    title: "Professionals & Consultants",
    description: "Specialized utilities and digital resources for repeatable workflows.",
  },
  {
    title: "Businesses With Specific Requirements",
    description: "Custom calculators and software concepts developed around an agreed scope.",
  },
];

export const HOMEPAGE_FAQS = [
  {
    question: "What is ThinkTools?",
    answer: "ThinkTools is a digital tools brand offering online utilities, downloadable digital products, and custom calculator and software development services.",
  },
  {
    question: "Are the online tools free?",
    answer: "Tools marked “Free” can be used without purchasing a digital product. Check each tool for its current functionality and any stated limitations.",
  },
  {
    question: "What is Construction Calculator Pro?",
    answer: "It is a downloadable Excel toolkit for construction quantity estimation, cost planning, and related calculations. The product page contains the full specifications and included resources.",
  },
  {
    question: "How much does Construction Calculator Pro cost?",
    answer: "The current listed price is ₹499 as a one-time payment. It is a separate product from the planned Construction Management SaaS.",
  },
  {
    question: "Can you develop a custom calculator for my business?",
    answer: "Yes, you can submit your requirements for review. The formulas, inputs, outputs, platform, complexity, and feasibility will determine the proposed scope and cost.",
  },
  {
    question: "Can you develop custom software or a SaaS product?",
    answer: "You can contact ThinkTools to discuss a web application, internal business tool, or SaaS concept. Acceptance, technical feasibility, scope, cost, and delivery timing are assessed individually.",
  },
  {
    question: "Is Construction Management SaaS available now?",
    answer: "No. It is marked as coming soon. Features, pricing, and availability should be confirmed before any purchase is offered.",
  },
  {
    question: "Can you build WhatsApp automation?",
    answer: "You can contact ThinkTools to discuss a WhatsApp-related automation requirement. The supported integrations, permissions, platform requirements, and scope will need to be assessed.",
  },
  {
    question: "How do I enquire about a custom project?",
    answer: "Email support@thinktools.in with a brief description of your requirement, intended users, and preferred functionality.",
  },
];
