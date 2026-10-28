export interface SheetItem {
  number: number;
  name: string;
  category: string;
  part: string;
  description: string;
  userEnters: string;
  userGets: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  badgeTitle: string;
  subtitle: string;
  packageStats: {
    workbooksCount: number;
    tabsCount: number;
    pdfGuidesCount: number;
    bonusesCount: number;
    combinedGuidePages: number;
    versionDate: string;
  };
  workbooksIncluded: {
    filename: string;
    title: string;
    useCase: string;
    description: string;
  }[];
  category: "construction" | "nutrition" | "business" | "productivity";
  categoryLabel: string;
  price: number;
  originalPrice: number;
  currency: string;
  currencySymbol: string;
  badge?: string;
  unitsSupported: string[];
  compatibility: string[];
  summary: string;
  targetAudience: {
    title: string;
    situation: string;
    primaryUse: string;
    description: string;
  }[];
  buyerJourney: {
    step: number;
    name: string;
    action: string;
    tabs: string;
    docs: string;
  }[];
  workbookSheets: SheetItem[];
  implementationKit: {
    title: string;
    type: "plan" | "worksheet" | "checklist" | "exercise";
    description: string;
    pagesOrCount?: string;
  }[];
  toolsIncluded: {
    title: string;
    type: "template" | "script" | "tracker" | "cheat_sheet";
    description: string;
  }[];
  includedBonuses: {
    number: number;
    title: string;
    fearSolved: string;
    description: string;
    format: string;
    pages: number;
  }[];
  requirements: string[];
  disclaimer: string;
  whatItDoesNotDo: string[];
  listingTags: string[];
  orderBump: {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice: number;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  folderStructure?: {
    folder: string;
    path: string;
    files: string[];
    format: string;
    mainUse: string;
  }[];
  mainGuideModules?: {
    moduleNumber: number;
    title: string;
    purpose: string;
    time: string;
    output: string;
  }[];
  buyerRecommendedOrder?: {
    stepNumber: number;
    action: string;
    details: string;
    fileOrGuide: string;
  }[];
  workbookLinkingFlow?: {
    from: string;
    to: string;
    description: string;
  }[];
  benchmarkFigures?: {
    measure: string;
    exampleValue: string;
    context: string;
  }[];
  realSituations?: {
    id: string;
    situation: string;
    category: "cost" | "contractor" | "materials" | "bills" | "stages";
    whereToGo: string;
    tabs: string[];
    docs: string[];
    reason: string;
  }[];
  exercisesDetailed?: {
    exerciseNumber: number;
    title: string;
    skillPracticed: string;
    answerGiven: string;
  }[];
  glossary?: {
    term: string;
    meaning: string;
  }[];
  sellerChecklist?: {
    id: number;
    item: string;
    status: "Pending" | "Completed";
    notes: string;
  }[];
}

export const PRODUCTS: Record<string, Product> = {
  "construction-calculator-pro": {
    id: "prod_const_india_01",
    slug: "construction-calculator-pro",
    title: "CONSTRUCTION CALCULATOR PRO – INDIA",
    badgeTitle: "Excel Construction Quantity, Cost & Project Control Engine",
    subtitle: "Plan, price and pay for your house build or flat renovation across India with precision.",
    packageStats: {
      workbooksCount: 3,
      tabsCount: 31,
      pdfGuidesCount: 13,
      bonusesCount: 7,
      combinedGuidePages: 43,
      versionDate: "13 October 2026 Package"
    },
    workbooksIncluded: [
      {
        filename: "Construction_Calculator_Pro_INDIA_v2.xlsx",
        title: "Blank Project Calculator Engine",
        useCase: "For your own project",
        description: "Rates start blank so costs reflect your real local prices. Enter rooms, dimensions, and local supplier rates to generate your automated estimate, purchase order list, and bill-checking ledger."
      },
      {
        filename: "Construction_Calculator_Pro_EXAMPLE_filled.xlsx",
        title: "Complete 1,500 sq ft 3-BHK House Build (Chennai)",
        useCase: "Learn from Example",
        description: "A 30 × 50 ft, 1,500 sq ft 3-bedroom independent house fully filled with sample calculations, placeholder rates, contractor bids, sample bills, stage payments, and task trackers."
      },
      {
        filename: "Construction_Calculator_Pro_EXAMPLE_renovation.xlsx",
        title: "1,000 sq ft Apartment Flat Renovation",
        useCase: "For kitchen, bathroom & room upgrades",
        description: "A complete non-structural renovation model covering kitchen, bathroom, and bedroom upgrades in a 1,000 sq ft flat with room areas, paint, tiles, electrical points, and fixtures."
      }
    ],
    category: "construction",
    categoryLabel: "Construction & Engineering",
    price: 299,
    originalPrice: 999,
    currency: "INR",
    currencySymbol: "₹",
    badge: "31 Connected Sheets · 13 PDF Guides · 7 Bonuses",
    unitsSupported: [
      "Feet & Inches (Indian Construction Practice)",
      "Metres & Millimetres (Metric Units)"
    ],
    compatibility: [
      "Microsoft Excel Only (Office 365, Excel 2016 - 2024 on Windows & Mac)",
      "Engineered specifically for native Microsoft Excel calculation and formatting",
      "Dual Units: Toggle Feet/Inches or Metres with automatic conversions",
      "Instant Digital Download • One-Time Payment"
    ],
    summary:
      "Construction Calculator Pro turns a house plan into accurate material quantities, a costed estimate, a purchase order list, and a phased payment schedule. During construction, it gives you tools to compare contractor bids, audit contractor bills, approve change orders, and conduct site material quality checks.",
    targetAudience: [
      {
        title: "Homeowner Building a House",
        situation: "Hiring a turnkey or item-rate contractor and wants to verify the true cost and avoid overpaying.",
        primaryUse: "Quick Start, Cost Estimate, Bill Check, Payments, Specification Sheet, Snag List",
        description: "Verify material requirements before signing contracts and cross-check contractor claims so you never pay ahead of work."
      },
      {
        title: "Owner-Builder / Direct Site Manager",
        situation: "Managing labour piece-rates and procuring cement, steel, sand, and bricks directly.",
        primaryUse: "Calculators, Order List, Rate Quotes, Material Quality Checks, Task Tracker",
        description: "Know exactly how much cement and steel to order with wastage margins, when to place orders, and how to verify truck deliveries on site."
      },
      {
        title: "Home Renovator",
        situation: "Kitchen, bathroom, tiling, or room remodel with no structural RCC changes.",
        primaryUse: "Renovation Example (.xlsx), Room Area, Paint & Tiles, Services, Room Costs",
        description: "Calculate wall tile boxes, waterproofing litres, plastering bags, and electrical point costs for flats and apartments without paying for structural calculators."
      },
      {
        title: "Small Civil Contractor & Engineer",
        situation: "Pricing construction jobs for clients and managing up to 5 concurrent sites.",
        primaryUse: "Calculators, Print-ready Quotation (BOQ), Projects Tracker, Bids, Rate Library",
        description: "Generate professional client BOQ proposals in minutes and maintain your historical supplier pricing library across multiple projects."
      }
    ],
    buyerJourney: [
      {
        step: 1,
        name: "Start",
        action: "Answer six simple questions; choose Feet or Metres",
        tabs: "Start Here (1), Quick Start (2), Setup (3)",
        docs: "Start Here PDF (2 pages), Main Guide Module 1"
      },
      {
        step: 2,
        name: "Measure",
        action: "Enter rooms, walls, openings, concrete, steel, and services",
        tabs: "Room Area to Services (tabs 4 to 12)",
        docs: "Modules 2 & 3, Worksheets A to C, Site Cheat Sheet"
      },
      {
        step: 3,
        name: "Price",
        action: "Collect local supplier quotes and enter your city rates",
        tabs: "Rates (20), Rate Quotes (21), Rate Library (31)",
        docs: "Module 4, Worksheet D, Template 1, Script 1, Brand Sheet"
      },
      {
        step: 4,
        name: "Check",
        action: "Review estimate, 9-stage budget allocation, and budget headroom",
        tabs: "Cost Estimate (13), Room Costs (14), Stage Budget (15), Dashboard (24)",
        docs: "Module 5, Action Plan Week 3"
      },
      {
        step: 5,
        name: "Control",
        action: "Order materials, track tasks, audit contractor bills, and record payments",
        tabs: "Order List (17), Task Tracker (18), Permits (19), Bill Check (25), Bids (27), Payments (28)",
        docs: "Modules 6–8, Checklists, 7 Bonuses, Snag List"
      }
    ],
    workbookSheets: [
      // PART 1
      {
        number: 1,
        name: "Start Here",
        category: "Get Started",
        part: "Part 1 · Get Started",
        description: "Overview of the 5-step roadmap, what each tab does, and essential usage instructions.",
        userEnters: "Nothing (Read-only reference)",
        userGets: "5-step route, tab index, color coding rules"
      },
      {
        number: 2,
        name: "Quick Start",
        category: "Get Started",
        part: "Part 1 · Get Started",
        description: "20-minute setup engine. Enter basic project dimensions to unlock initial quantities immediately.",
        userEnters: "Project name, client, built-up area, budget, city, Feet or Metres",
        userGets: "Setup populated; step-by-step tab order recommendations"
      },
      {
        number: 3,
        name: "Setup",
        category: "Get Started",
        part: "Part 1 · Get Started",
        description: "Project parameters, unit conversion engine (Feet/Metres), default contingency, and tax placeholders.",
        userEnters: "Project type, contingency % (10% default), GST % (placeholder)",
        userGets: "Length & area conversion factors applied across all 31 tabs"
      },

      // PART 2
      {
        number: 4,
        name: "Room Area",
        category: "Measure & Quantify",
        part: "Part 2 · Measure & Quantify",
        description: "Calculates carpet area, built-up area, and room-by-room dimensions for up to 12 rooms.",
        userEnters: "Room name, length, width, count",
        userGets: "Carpet area per room (sq ft & sq m), total floor area"
      },
      {
        number: 5,
        name: "Earthwork",
        category: "Measure & Quantify",
        part: "Part 2 · Measure & Quantify",
        description: "Excavation volumes for foundation footings, trenches, and surplus soil cart-away.",
        userEnters: "Length, width, depth, count of pits/trenches; safety allowance",
        userGets: "Total volume to dig (cu.ft / cu.m) and excavation labor cost"
      },
      {
        number: 6,
        name: "Paint & Tiles",
        category: "Measure & Quantify",
        part: "Part 2 · Measure & Quantify",
        description: "Net interior wall areas after deducting doors/windows; calculates paint litres, primer, and tile counts.",
        userEnters: "Wall heights, doors/windows per room, tile sizes & coverage",
        userGets: "Net wall area, primer & paint litres, tile box counts and costs"
      },
      {
        number: 7,
        name: "Exterior & Roof",
        category: "Measure & Quantify",
        part: "Part 2 · Measure & Quantify",
        description: "Outside building perimeter, exterior wall paint coverage, and flat terrace waterproofing area.",
        userEnters: "Outside wall length, height, openings; flat roof dimensions",
        userGets: "Exterior paint litres, painting labor, terrace waterproofing cost"
      },
      {
        number: 8,
        name: "Concrete",
        category: "Measure & Quantify",
        part: "Part 2 · Measure & Quantify",
        description: "Footings, plinth beams, columns, lintels, and roof slabs concrete volume with nominal mix ratios.",
        userEnters: "Member dimensions, mix ratio from structural drawings (e.g. M20)",
        userGets: "Wet & dry concrete volume, cement bags, sand, aggregate, cost"
      },
      {
        number: 9,
        name: "Bricks & Blocks",
        category: "Measure & Quantify",
        part: "Part 2 · Measure & Quantify",
        description: "External 9-inch and internal 4.5-inch wall masonry quantities; supports red bricks and AAC blocks.",
        userEnters: "Wall length, height, thickness; standard brick or AAC block sizes",
        userGets: "Total brick / AAC block count, mortar cement bags, masonry labor"
      },
      {
        number: 10,
        name: "Plaster",
        category: "Measure & Quantify",
        part: "Part 2 · Measure & Quantify",
        description: "Internal wall, ceiling, and external plastering volume using areas linked automatically from Paint & Tiles.",
        userEnters: "Plaster thickness (12mm/15mm/20mm), cement-sand ratio, wastage %",
        userGets: "Cement bags, sand volume, material cost, and plastering labor"
      },
      {
        number: 11,
        name: "Steel",
        category: "Measure & Quantify",
        part: "Part 2 · Measure & Quantify",
        description: "Theoretical rebar steel calculator using standard IS:1786 D²/162 formula across 8mm to 25mm bars.",
        userEnters: "Bar diameter (8, 10, 12, 16, 20mm), bar length, number of bars",
        userGets: "Weight in kg and metric tonnes; total rebar cost"
      },
      {
        number: 12,
        name: "Services",
        category: "Measure & Quantify",
        part: "Part 2 · Measure & Quantify",
        description: "Plumbing fixture inlets/outlets and electrical light/switch point tally with unit rates.",
        userEnters: "Count of plumbing points and electrical switch points; rate/point",
        userGets: "Total plumbing & electrical point contracting estimates"
      },

      // PART 3
      {
        number: 13,
        name: "Cost Estimate",
        category: "Cost & Budget",
        part: "Part 3 · Cost & Budget",
        description: "Master estimate summarizing all 8 calculators, specialized items, actual spend, and cost per sq ft.",
        userEnters: "Specialized scopes (sanitaryware, kitchen, doors), actual spend",
        userGets: "Subtotal, 10% contingency, GST, total budget, cost per sq ft"
      },
      {
        number: 14,
        name: "Room Costs",
        category: "Cost & Budget",
        part: "Part 3 · Cost & Budget",
        description: "Automated cost breakdown showing the finish cost and percentage share of each individual room.",
        userEnters: "Nothing (Automatically reads from Paint & Tiles)",
        userGets: "Finish cost per room and each room's % share of finishing spend"
      },
      {
        number: 15,
        name: "Stage Budget",
        category: "Cost & Budget",
        part: "Part 3 · Cost & Budget",
        description: "Cash-flow allocation across 9 construction stages with variance flags (Over / Within budget).",
        userEnters: "Target % share for each of the 9 stages (foundation to finishes)",
        userGets: "Estimate vs target per stage, variance flag, budget share chart"
      },

      // PART 4
      {
        number: 16,
        name: "Stage Checklist",
        category: "Buy, Track & Approve",
        part: "Part 4 · Buy, Track & Approve",
        description: "Mandatory quality and verification checks before moving to the next stage or releasing funds.",
        userEnters: "Check status (Done/Pending), date, inspector name, site notes",
        userGets: "Readiness clearance before paying contractors or continuing"
      },
      {
        number: 17,
        name: "Order List",
        category: "Buy, Track & Approve",
        part: "Part 4 · Buy, Track & Approve",
        description: "Consolidated material purchase list with buffer wastage percentages and required order-by dates.",
        userEnters: "Wastage allowance % (e.g. 5%), selected supplier, order-by date",
        userGets: "Exact order quantities with safety buffers, cost per line"
      },
      {
        number: 18,
        name: "Task Tracker",
        category: "Buy, Track & Approve",
        part: "Part 4 · Buy, Track & Approve",
        description: "Site execution schedule tracking tasks, owners, target completion dates, and overdue alerts in red.",
        userEnters: "Task name, stage, owner, start/end dates, priority, status",
        userGets: "Days remaining, automated overdue alerts, visual progress chart"
      },
      {
        number: 19,
        name: "Permits & Approvals",
        category: "Buy, Track & Approve",
        part: "Part 4 · Buy, Track & Approve",
        description: "Regulatory tracking ledger for municipal plan sanctions, electricity meter, water connections, and fees.",
        userEnters: "Approval name, status, submission date, sanction ref, fee paid",
        userGets: "Approval status log; total fees linked directly to Cost Estimate"
      },

      // PART 5
      {
        number: 20,
        name: "Rates",
        category: "Rates & Assumptions",
        part: "Part 5 · Rates & Assumptions",
        description: "Master database of 16 editable local city rates for cement, steel, sand, bricks, and specialized labor.",
        userEnters: "Your local market rates with dated supplier quotes",
        userGets: "Every cost formula in the workbook recalculates automatically"
      },
      {
        number: 21,
        name: "Rate Quotes",
        category: "Rates & Assumptions",
        part: "Part 5 · Rates & Assumptions",
        description: "Side-by-side comparison ledger evaluating two suppliers on equal unit and site delivery terms.",
        userEnters: "Quotes from Supplier A and Supplier B, including delivery freight",
        userGets: "Highlights the true cheaper option factoring in delivery terms"
      },
      {
        number: 22,
        name: "Assumptions",
        category: "Rates & Assumptions",
        part: "Part 5 · Rates & Assumptions",
        description: "Transparent engineering documentation of all dry-volume ratios, mortar splits, and consumption factors.",
        userEnters: "Review notes from your qualified structural engineer or QS",
        userGets: "Complete formula audit trail with source validation status"
      },
      {
        number: 23,
        name: "Terms & Disclaimer",
        category: "Rates & Assumptions",
        part: "Part 5 · Rates & Assumptions",
        description: "Operational scope definition, licensing terms, and guidance on professional engineering review.",
        userEnters: "Nothing (Standard usage terms and license framework)",
        userGets: "Legal clarity on preliminary estimation vs structural drawings"
      },

      // PART 6
      {
        number: 24,
        name: "Dashboard",
        category: "Overview, Pay & Check",
        part: "Part 6 · Overview, Pay & Check",
        description: "Executive control board displaying primary spend indicators, material totals, and next action items.",
        userEnters: "Nothing (Real-time rollup of all 30 sheets)",
        userGets: "Visual financial dashboard, material splits, budget headroom"
      },
      {
        number: 25,
        name: "Bill Check",
        category: "Overview, Pay & Check",
        part: "Part 6 · Overview, Pay & Check",
        description: "Contractor bill auditing tool. Compares claimed quantities against calculated norms with a 5% flag.",
        userEnters: "Contractor's claimed bill quantities; tolerance margin (5% default)",
        userGets: "Identifies quantity discrepancies and flags overclaims above tolerance"
      },
      {
        number: 26,
        name: "Projects",
        category: "Overview, Pay & Check",
        part: "Part 6 · Overview, Pay & Check",
        description: "Multi-site portfolio tracker managing budgets, estimates, and actual spend for up to 5 properties.",
        userEnters: "Project names, allocated budget, client details",
        userGets: "Percentage of budget utilized and financial status per project"
      },
      {
        number: 27,
        name: "Bids",
        category: "Overview, Pay & Check",
        part: "Part 6 · Overview, Pay & Check",
        description: "Contractor quotation comparison matrix analyzing up to 3 competitive bids side-by-side.",
        userEnters: "Line-item quotations from up to 3 contractors",
        userGets: "Identifies lowest bidder per scope and calculates total savings"
      },
      {
        number: 28,
        name: "Payments",
        category: "Overview, Pay & Check",
        part: "Part 6 · Overview, Pay & Check",
        description: "Stage payment schedule tracking up to 15 milestone disbursements and 10 approved change orders.",
        userEnters: "Payment amount, date, milestone, and approved change order costs",
        userGets: "Revised forecast, total paid, and remaining balance still to pay"
      },
      {
        number: 29,
        name: "Timeline",
        category: "Overview, Pay & Check",
        part: "Part 6 · Overview, Pay & Check",
        description: "Construction phase schedule monitoring planned start/end dates and actual milestone progress.",
        userEnters: "Phase dates, completion percentage",
        userGets: "Phase duration and days remaining before handover"
      },
      {
        number: 30,
        name: "Quotation",
        category: "Overview, Pay & Check",
        part: "Part 6 · Overview, Pay & Check",
        description: "Print-ready professional Bill of Quantities (BOQ) proposal generated directly from Cost Estimate.",
        userEnters: "Contractor business details, client name, date",
        userGets: "Clean, print-ready client quotation for contracts and agreements"
      },
      {
        number: 31,
        name: "Rate Library",
        category: "Overview, Pay & Check",
        part: "Part 6 · Overview, Pay & Check",
        description: "Historical database of material and labor quotes across different suppliers and cities.",
        userEnters: "Material item, unit, city, supplier name, quoted rate, date",
        userGets: "Searchable reference library of past quotes for future projects"
      }
    ],
    implementationKit: [
      {
        title: "Action Plan: Four Weeks to a Signed Estimate",
        type: "plan",
        description: "Week-by-week execution plan breaking down target setting (Week 1), measuring (Week 2), pricing (Week 3), and stage budgeting with contractor terms (Week 4)."
      },
      {
        title: "Worksheet A: Room Measurement Log",
        type: "worksheet",
        description: "Printable dual-reading capture sheet (taking two independent measurements before typing into the workbook)."
      },
      {
        title: "Worksheet B: Outside Walls & Roof Area",
        type: "worksheet",
        description: "Printable worksheet for recording building perimeter, heights, deductions, and flat terrace dimensions on site."
      },
      {
        title: "Worksheet C: Paint Calculation by Hand",
        type: "worksheet",
        description: "Worked step-by-step verification sheet to understand wall deductions and primer coverage before buying paint."
      },
      {
        title: "Worksheet D: Quote Comparison Ledger",
        type: "worksheet",
        description: "Standardized table comparing two suppliers on identical unit definitions and on-site delivery terms."
      },
      {
        title: "Worksheet E: Contractor Bill Check Log",
        type: "worksheet",
        description: "Site sheet to record contractor invoice claims against your calculated quantities before releasing payment."
      },
      {
        title: "Worksheet F: Payment Balance & Forecast",
        type: "worksheet",
        description: "Calculation form to work out revised budget forecasts after change orders and verify the true balance to pay."
      },
      {
        title: "Pre-Build & Sanction Checklist",
        type: "checklist",
        description: "Essential prerequisites before starting: written budget, units chosen, rates entered, assumptions reviewed, approvals checked, and written contract signed."
      },
      {
        title: "9-Stage Quality Verification Checklist",
        type: "checklist",
        description: "Stage-by-stage inspections from foundation, structure, masonry, roof waterproofing ponding tests, through flooring and painting."
      },
      {
        title: "Pre-Payment Milestone Checklist",
        type: "checklist",
        description: "5-point verification protocol before making any payment: stage checks done, quantities audited, change orders in writing, payment logged, receipt kept."
      },
      {
        title: "Pre-Handover & Completion Checklist",
        type: "checklist",
        description: "Final walkthrough inspection, completion certificates, warranties collection, and retention release protocol."
      },
      {
        title: "5 Practical Hands-on Exercises (with Answers)",
        type: "exercise",
        description: "Practice measuring rooms, calculating paint, comparing delivery quotes (e.g. how ₹5 delivery changes the cheaper supplier), and spotting a 13.6% overclaim on a contractor bill."
      }
    ],
    toolsIncluded: [
      {
        title: "Template 1: Formal Rate Request Message",
        type: "template",
        description: "Structured request message asking suppliers to quote on identical items, units, and site delivery terms."
      },
      {
        title: "Template 2: Binding Change Order Form",
        type: "template",
        description: "Standard written form to approve extra work or deductions, signed by both homeowner and contractor before work starts."
      },
      {
        title: "Template 3: Stage Payment Verification Record",
        type: "template",
        description: "Payment sign-off sheet documenting that all technical checks were completed prior to releasing milestone funds."
      },
      {
        title: "Template 4: Municipal Approval Fee Record",
        type: "template",
        description: "Ledger recording each statutory clearance, sanction reference, application date, and official fee."
      },
      {
        title: "5 Negotiation Scripts (WhatsApp / Phone / Email)",
        type: "script",
        description: "Word-for-word polite scripts for asking identical quote scopes, requesting measurement sheets behind bills, freezing change orders in writing, holding payments until stage checks are complete, and asking about upcoming stages."
      },
      {
        title: "The 1-Page Jobsite Cheat Sheet",
        type: "cheat_sheet",
        description: "Single-page reference sheet with unit conversions, core quantity formulas, money formulas, and a 5-point verification checklist to keep printed on site."
      }
    ],
    includedBonuses: [
      {
        number: 1,
        title: "Contractor Quote & Bill Check Guide",
        fearSolved: "Removes fear: 'Is this contractor bill fair or am I being overcharged?'",
        description: "How to use the Bill Check tab, common causes of inflated claims, and exact questions to ask when claims exceed the 5% tolerance threshold.",
        format: "PDF Document",
        pages: 1
      },
      {
        number: 2,
        title: "Payment Schedule & Anti-Advance Guide",
        fearSolved: "Removes fear: 'Am I paying too much money ahead of the actual work done?'",
        description: "What to agree before paying, warning signs of contractor front-loading, and pre-payment technical checklists.",
        format: "PDF Document",
        pages: 1
      },
      {
        number: 3,
        title: "Change Order Control Protocol",
        fearSolved: "Removes fear: 'Extra surprise costs will suddenly appear on the final bill'",
        description: "The golden rule of variations, the change order form, how to price changes fairly, and how to update the revised budget forecast.",
        format: "PDF Document",
        pages: 1
      },
      {
        number: 4,
        title: "Specification & Brand Sheet",
        fearSolved: "Removes fear: 'Contractors are quoting different materials and cheap substitutes'",
        description: "5-page room-by-room brand, grade, and size specifications table (cement grade, rebar brand, tile specs, pipe classes). Send the exact same sheet to all contractors so the only variable is price.",
        format: "PDF Document",
        pages: 5
      },
      {
        number: 5,
        title: "Jobsite Material Quality Checks on Site",
        fearSolved: "Removes fear: 'Am I getting substandard cement, rebar, or unwashed sand?'",
        description: "Practical delivery checks: silt jar test for sand, cement bag manufacturing week check, steel bar ISI markings, brick efflorescence check, and material receipt delivery log.",
        format: "PDF Document",
        pages: 5
      },
      {
        number: 6,
        title: "Contractor Hiring & Scoring Kit",
        fearSolved: "Removes fear: 'How do I choose an honest contractor without getting scammed?'",
        description: "Shortlisting 4–6 builders, first-call interview questions, mandatory past site visits, previous client reference questions, and an objective numerical scoring sheet.",
        format: "PDF Document",
        pages: 3
      },
      {
        number: 7,
        title: "Snag List & Final Handover Inspection",
        fearSolved: "Removes fear: 'I will discover leaks and defects after I have already paid in full'",
        description: "Room-by-room inspection walkthrough, tools to bring on site, documents to collect before final settlement, and formal defect sign-off protocol with financial retention.",
        format: "PDF Document",
        pages: 5
      }
    ],
    requirements: [
      "Microsoft Excel Required (Office 365, Excel 2016, 2019, 2021, or 2024 on Windows & Mac).",
      "Requires Microsoft Excel for complete cross-sheet formula calculation and formatting.",
      "Dual units: Supports both Feet/Inches and Metres."
    ],
    disclaimer:
      "Important Notice: Construction Calculator Pro provides preliminary planning estimates only. It is not structural design and does not replace a licensed structural engineer, architect, quantity surveyor, or lawyer. Structural specifications, mix grades, and rebar details must always be confirmed with approved drawings. Initial rates start blank in the master file; example rates in filled files are strictly illustrative placeholders.",
    whatItDoesNotDo: [
      "It is not structural design and does not replace an engineer, architect, quantity surveyor or lawyer.",
      "Quantity thumb rules (e.g. 1.54 dry volume, 500 bricks per m³, 100 sq ft per litre) are practical guidelines documented on the Assumptions tab.",
      "It does not auto-calculate custom kitchen modular cabinetry, sanitaryware fittings, doors and windows, pitched roofs, scaffolding, or transport — buyers add these directly on the Cost Estimate tab.",
      "Master rates start blank; buyers enter current local supplier rates.",
      "Bill Check compares quantities only, not rates or billing percentages."
    ],
    listingTags: [
      "construction calculator",
      "house construction estimate India",
      "Excel construction template",
      "building material calculator",
      "cement sand aggregate calculator",
      "brick calculator",
      "steel rebar weight calculator",
      "tile calculator",
      "painting calculator",
      "contractor bill check",
      "change order template",
      "snag list handover checklist",
      "renovation calculator flat apartment",
      "BOQ template India"
    ],
    orderBump: {
      id: "bump_labor_log",
      title: "Contractor Site Progress & Labor Billing Suite",
      description: "Get the printable Site Inspection Checklist + Daily Work Progress Log (DPR) + Subcontractor Agreement Template.",
      price: 149,
      originalPrice: 799
    },
    faqs: [
      {
        question: "What is included in the package?",
        answer: "You receive 31 connected Excel sheets across master templates and finished examples (Blank Project Engine, Chennai 1,500 sq ft 3-BHK House Build Example, and 1,000 sq ft Flat Renovation Example), plus 13 PDF implementation guides, worksheets, checklists, negotiation scripts, and 7 specialized bonus kits."
      },
      {
        question: "Can I use this for flat, apartment, or room renovations?",
        answer: "Yes! The package includes a dedicated workbook: 'Construction_Calculator_Pro_EXAMPLE_renovation.xlsx'. It is built specifically for non-structural upgrades (kitchen remodel, bathroom tiling, bedroom flooring, wall painting, and electrical work) without overwhelming you with foundation and RCC sheets."
      },
      {
        question: "Does this workbook support both Feet and Metres?",
        answer: "Yes! In Sheet #3 (Setup), you can toggle between Feet and Metres. Length, area, concrete volume, and brick count formulas automatically adapt to your chosen measurement unit."
      },
      {
        question: "Can I enter my local city rates for cement, steel and sand?",
        answer: "Yes, absolutely! Sheet #20 is the 'Rates Table'. As soon as you enter your local prices for cement bags, steel per kg, sand per brass/cu.ft, bricks, or labor rates, all 31 sheets and your client BOQ update in real time."
      },
      {
        question: "How does the 'Bill Check' tab help review contractor claims?",
        answer: "When a contractor submits an invoice claiming material quantities (e.g. cement and steel), you type their numbers into the Bill Check tab. The file calculates the difference against calculated estimates and highlights any variation over 5% so you can review the measurement sheets before paying."
      },
      {
        question: "How does the digital delivery work?",
        answer: "This is an instant digital product. Immediately after completing checkout, you will receive on-screen download links for all 31 Excel sheets and all 13 PDF guides, along with an automated email backup confirmation."
      },
      {
        question: "Are there any recurring monthly charges?",
        answer: "Zero subscriptions. You pay a single one-time fee of ₹499. You can save, duplicate, and reuse the workbooks across your projects with permanent offline access."
      }
    ],
    folderStructure: [
      {
        folder: "Root",
        path: "/",
        files: ["README.pdf", "Construction_Calculator_Pro_Guide_COMBINED.pdf"],
        format: "PDF (43 Pages Combined)",
        mainUse: "Package index, find anything fast; read all 8 modules & tools in one continuous file"
      },
      {
        folder: "1 Core",
        path: "1_Core/",
        files: ["01_Main_Guide.pdf"],
        format: "PDF Guide (8 Modules)",
        mainUse: "Learn the methodology step by step, following the exact tab order"
      },
      {
        folder: "2 Quick Start",
        path: "2_Quick_Start/",
        files: ["00_Start_Here.pdf"],
        format: "PDF (2 Pages)",
        mainUse: "Get to a first calculated material result in your first 20 minutes"
      },
      {
        folder: "3 Implementation",
        path: "3_Implementation/",
        files: [
          "02_Action_Plan.pdf",
          "03_Worksheets.pdf",
          "04_Checklists.pdf",
          "05_Exercises.pdf"
        ],
        format: "PDF Worksheets & Kits",
        mainUse: "Do the work in the right sequence, print site forms, and practise with answer keys"
      },
      {
        folder: "4 Tools",
        path: "4_Tools/",
        files: [
          "06_Templates.pdf",
          "07_Scripts.pdf",
          "08_Trackers.pdf",
          "09_Cheat_Sheet.pdf"
        ],
        format: "PDF Forms & Scripts",
        mainUse: "Ready-made message scripts, change order forms, and 1-page site cheat sheet"
      },
      {
        folder: "5 Bonuses",
        path: "5_Bonuses/",
        files: [
          "Bonus_1_Contractor_Bill_Check.pdf",
          "Bonus_2_Payment_Schedule.pdf",
          "Bonus_3_Change_Order_Control.pdf",
          "Bonus_Specification_and_Brand_Sheet.pdf",
          "Bonus_Material_Quality_Checks.pdf",
          "Bonus_Contractor_Hiring_Kit.pdf",
          "Bonus_Snag_List_and_Handover.pdf"
        ],
        format: "7 Specialized PDFs",
        mainUse: "Directly solves the 7 biggest fears: bills, payments, changes, quotes, quality, hiring & handover"
      },
      {
        folder: "6 Workbook",
        path: "6_Workbook/",
        files: [
          "Construction_Calculator_Pro_INDIA_v2.xlsx",
          "Construction_Calculator_Pro_EXAMPLE_filled.xlsx",
          "Construction_Calculator_Pro_EXAMPLE_renovation.xlsx"
        ],
        format: "Excel Workbooks (.xlsx)",
        mainUse: "Master blank engine, 1,500 sq ft Chennai house filled example, and 1,000 sq ft flat renovation example"
      }
    ],
    mainGuideModules: [
      {
        moduleNumber: 1,
        title: "Set Up Your Project",
        purpose: "Establish units (Feet or Metres), built-up area, budget target, 10% contingency, and GST parameters",
        time: "10–15 min",
        output: "Master project settings that feed every calculator tab automatically"
      },
      {
        moduleNumber: 2,
        title: "Measure Once",
        purpose: "Measure rooms, walls, openings, external building perimeter, and flat roof dimensions",
        time: "30–60 min + measuring",
        output: "A single measured list where each room and dimension is entered once"
      },
      {
        moduleNumber: 3,
        title: "Calculate Quantities",
        purpose: "Understand how concrete, bricks, steel, paint, tiles, plaster, and roof areas are derived with wastage factors",
        time: "45–60 min",
        output: "Exact engineering quantities for each material with built-in wastage allowances"
      },
      {
        moduleNumber: 4,
        title: "Set Your Rates",
        purpose: "Collect verified local market quotes and enter dated supplier rates across 16 core categories",
        time: "1–2 hours over a few days",
        output: "A customized rate base that converts all physical quantities into real project costs"
      },
      {
        moduleNumber: 5,
        title: "Budget by Stage",
        purpose: "Establish milestone allocation targets across the 9 construction stages and test budget headroom",
        time: "30–45 min",
        output: "Stage target budgets and automated variance fit check"
      },
      {
        moduleNumber: 6,
        title: "Order Materials",
        purpose: "Translate calculated engineering quantities into actionable supplier purchase orders with lead times",
        time: "30–45 min",
        output: "Purchase list with exact buffer quantities and required order-by dates"
      },
      {
        moduleNumber: 7,
        title: "Track Payments, Approvals & Changes",
        purpose: "Maintain tight financial governance across stage payments, statutory fees, and signed variation orders",
        time: "30 min setup, 5 min/payment",
        output: "A transparent log of all money spent, approved changes, and balance still to pay"
      },
      {
        moduleNumber: 8,
        title: "Check a Quote or Bill",
        purpose: "Audit contractor invoices and claimed quantities against your calculations with a 5% tolerance flag",
        time: "30 min per bill",
        output: "A flagged quantity audit report with specific questions to ask before paying"
      }
    ],
    buyerRecommendedOrder: [
      {
        stepNumber: 1,
        action: "Inspect the Finished Example",
        details: "Open the new-build example file (1,500 sq ft Chennai house) to see how a completed project looks with all 31 tabs linked.",
        fileOrGuide: "Construction_Calculator_Pro_EXAMPLE_filled.xlsx"
      },
      {
        stepNumber: 2,
        action: "Read Start Here",
        details: "Read the 2-page quick onboarding document to understand the yellow/green cell color rules and 5-step path.",
        fileOrGuide: "00_Start_Here.pdf (2 Pages)"
      },
      {
        stepNumber: 3,
        action: "Fill Out Quick Start in Master File",
        details: "Open the blank calculator and complete Quick Start (Project name, area, budget, city, Feet or Metres) in 20 minutes.",
        fileOrGuide: "Construction_Calculator_Pro_INDIA_v2.xlsx"
      },
      {
        stepNumber: 4,
        action: "Follow the 4-Week Action Plan",
        details: "Work through the weekly milestones, reading each Main Guide module as the plan points to it.",
        fileOrGuide: "02_Action_Plan.pdf & 01_Main_Guide.pdf"
      },
      {
        stepNumber: 5,
        action: "Use Worksheets When Measuring",
        details: "Print Worksheets A to C on site to record dual readings and check formulas before typing them into Excel.",
        fileOrGuide: "03_Worksheets.pdf (Worksheets A–F)"
      },
      {
        stepNumber: 6,
        action: "Deploy Tools & Bonuses in Real Situations",
        details: "Pull out the specific bonus or template whenever a contractor quote arrives, material is delivered, or a bill is claimed.",
        fileOrGuide: "Folder 4 (Tools) & Folder 5 (Bonuses)"
      }
    ],
    workbookLinkingFlow: [
      {
        from: "Quick Start (Tab 02)",
        to: "Setup (Tab 03)",
        description: "Populates project units, contingency %, city, and built-up area"
      },
      {
        from: "Setup (Tab 03)",
        to: "Every Calculator (Tabs 04–12)",
        description: "Applies unit conversions (Feet/Metres), default contingency, and GST parameters across all sheets"
      },
      {
        from: "Room Area (Tab 04)",
        to: "Paint & Tiles (Tab 06) & Plaster (Tab 10)",
        description: "Transfers room lengths and widths for automatic wall, ceiling, and dado surface calculations"
      },
      {
        from: "Paint & Tiles (Tab 06)",
        to: "Bricks & Blocks (Tab 09) & Room Costs (Tab 14)",
        description: "Deducts door and window opening areas from masonry walls; feeds room-by-room finishing shares"
      },
      {
        from: "Calculators 05–12 + Services (12) + Permits (19)",
        to: "Cost Estimate (Tab 13)",
        description: "Feeds all material quantities and specialized costs into the master summary estimate"
      },
      {
        from: "Cost Estimate (Tab 13)",
        to: "Stage Budget (15), Dashboard (24), Payments (28), Quotation (30), Projects (26)",
        description: "Drives executive charts, client BOQ proposals, stage allocations, and running financial forecast"
      },
      {
        from: "Calculators 05–12",
        to: "Order List (Tab 17) & Bill Check (Tab 25)",
        description: "Creates procurement quantities with wastage buffers and populates baseline 'Our Calculation' on Bill Check"
      },
      {
        from: "Rate Quotes (21) & Rate Library (31)",
        to: "Master Rates (Tab 20)",
        description: "Compares supplier bids to choose best rates, then feeds every monetary formula across the workbook"
      }
    ],
    benchmarkFigures: [
      {
        measure: "Built-up Area / Carpet Area",
        exampleValue: "1,500 sq ft / 1,034 sq ft",
        context: "New-build independent 3-bedroom G+1 residential house in Chennai"
      },
      {
        measure: "Concrete Volume & Cement",
        exampleValue: "1,149 cu ft (32.5 m³) · 203 Cement Bags",
        context: "Nominal RCC mix including footings, plinth, columns, beams, and roof slabs"
      },
      {
        measure: "Masonry Bricks (or AAC)",
        exampleValue: "22,302 Red Clay Bricks (or 1,859 AAC Blocks)",
        context: "Calculated across 9-inch load-bearing/outer walls and 4.5-inch partition walls"
      },
      {
        measure: "Steel Reinforcement (TMT)",
        exampleValue: "3.43 Metric Tonnes",
        context: "Standard IS:1786 bar schedule across 8mm, 10mm, 12mm, 16mm, and 20mm rebar"
      },
      {
        measure: "Finishes: Paint & Vitrified Tiles",
        exampleValue: "80 Litres Interior, 34 Litres Exterior · 294 Tiles (600×600 mm)",
        context: "Net wall area after door/window deductions plus full floor tiling"
      },
      {
        measure: "Total Cost Estimate",
        exampleValue: "₹17,08,134 (₹1,139 per sq ft)",
        context: "Complete civil and finishing estimate including 10% contingency allowance"
      },
      {
        measure: "Renovation Example Total",
        exampleValue: "₹86,262 (against ₹4,00,000 target budget)",
        context: "1,000 sq ft flat non-structural remodel (kitchen, bath, retiling & painting)"
      }
    ],
    realSituations: [
      {
        id: "sit-1",
        situation: "How much will my house cost to build in my city?",
        category: "cost",
        whereToGo: "Quick Start → Calculators (04–12) → Rates (20) → Cost Estimate (13)",
        tabs: ["02 Quick Start", "04 Room Area", "20 Rates", "13 Cost Estimate"],
        docs: ["00_Start_Here.pdf", "01_Main_Guide.pdf (Modules 1–4)"],
        reason: "Enter basic room dimensions, plug in your local supplier rates, and immediately see your total cost and rate per sq ft."
      },
      {
        id: "sit-2",
        situation: "Which contractor should I choose without getting scammed?",
        category: "contractor",
        whereToGo: "Specification Sheet → Contractor Hiring Kit → Bids Tab (27)",
        tabs: ["27 Bids", "30 Quotation"],
        docs: ["Bonus_Specification_and_Brand_Sheet.pdf", "Bonus_Contractor_Hiring_Kit.pdf"],
        reason: "Send every contractor the exact same 5-page brand and spec sheet so only price varies, then score their references and past sites."
      },
      {
        id: "sit-3",
        situation: "Is this material supplier really cheaper, or are delivery fees hidden?",
        category: "materials",
        whereToGo: "Rate Quotes Tab (21) → Worksheet D → Negotiation Script 1",
        tabs: ["21 Rate Quotes", "31 Rate Library"],
        docs: ["03_Worksheets.pdf (Worksheet D)", "07_Scripts.pdf (Script 1)"],
        reason: "Compare two suppliers on identical unit definitions and on-site delivery terms to reveal hidden freight charges."
      },
      {
        id: "sit-4",
        situation: "How much cement, sand and TMT steel do I order, and when?",
        category: "materials",
        whereToGo: "Concrete (08) & Steel (11) Tabs → Order List (17)",
        tabs: ["08 Concrete", "11 Steel", "17 Order List"],
        docs: ["01_Main_Guide.pdf (Module 6)", "09_Cheat_Sheet.pdf"],
        reason: "Calculates exact required quantities with buffer wastage percentages and calculates the precise order-by dates before the stage starts."
      },
      {
        id: "sit-5",
        situation: "The truck has arrived on site. Is the material high quality or substandard?",
        category: "materials",
        whereToGo: "Material Quality Checks Bonus → Receipt Log",
        tabs: ["16 Stage Checklist", "17 Order List"],
        docs: ["Bonus_Material_Quality_Checks.pdf"],
        reason: "Run immediate field tests: sand silt jar test, cement bag manufacture week, steel ISI embossing, and brick water immersion tests."
      },
      {
        id: "sit-6",
        situation: "The contractor's bill looks unusually high. How do I challenge it politely?",
        category: "bills",
        whereToGo: "Bill Check Tab (25) → Bonus 1 → Script 2 → Worksheet E",
        tabs: ["25 Bill Check", "13 Cost Estimate"],
        docs: ["Bonus_1_Contractor_Bill_Check.pdf", "07_Scripts.pdf (Script 2)", "03_Worksheets.pdf (Worksheet E)"],
        reason: "Enter the claimed quantities. The tab flags any variation over 5%. Script 2 gives you the polite, non-confrontational words to request measurement sheets."
      },
      {
        id: "sit-7",
        situation: "The contractor demands extra money on the final bill for changes.",
        category: "bills",
        whereToGo: "Change Order Template 2 → Bonus 3 → Script 3 → Payments Tab (28)",
        tabs: ["28 Payments"],
        docs: ["06_Templates.pdf (Template 2)", "Bonus_3_Change_Order_Control.pdf", "07_Scripts.pdf (Script 3)"],
        reason: "Enforce the golden rule: no variation work starts without a signed, pre-priced change order, which automatically updates the revised budget forecast."
      },
      {
        id: "sit-8",
        situation: "Should I release the next stage payment or hold it back?",
        category: "stages",
        whereToGo: "Pre-Payment Checklist → Stage Checklist (16) → Payments Balance → Script 4",
        tabs: ["16 Stage Checklist", "28 Payments"],
        docs: ["04_Checklists.pdf", "03_Worksheets.pdf (Worksheet F)", "07_Scripts.pdf (Script 4)"],
        reason: "Complete the 5-point technical check before writing a cheque, and send Script 4 to explain why funds are held until inspections pass."
      },
      {
        id: "sit-9",
        situation: "Am I over budget on any construction stage?",
        category: "cost",
        whereToGo: "Stage Budget Tab (15) → Executive Dashboard (24)",
        tabs: ["15 Stage Budget", "24 Dashboard", "13 Cost Estimate"],
        docs: ["01_Main_Guide.pdf (Module 5)"],
        reason: "Compare target stage shares against real costs with automated Over/Within budget visual alerts and cash-flow headroom indicators."
      },
      {
        id: "sit-10",
        situation: "Which municipal approvals do I need, and how much will they cost?",
        category: "stages",
        whereToGo: "Permits & Approvals Tab (19) → Template 4",
        tabs: ["19 Permits & Approvals", "13 Cost Estimate"],
        docs: ["06_Templates.pdf (Template 4)"],
        reason: "Track building sanctions, water connection, temporary power, and sanctioned fees, automatically feeding fee totals into your Cost Estimate."
      },
      {
        id: "sit-11",
        situation: "The house is finished. Can I pay the contractor in full?",
        category: "stages",
        whereToGo: "Snag List & Handover Check Bonus → Pre-Handover Checklist",
        tabs: ["16 Stage Checklist", "28 Payments"],
        docs: ["Bonus_Snag_List_and_Handover.pdf", "04_Checklists.pdf"],
        reason: "Walk the house room-by-room with tools, document defects, and retain the agreed retention balance until all punch-list items are certified."
      },
      {
        id: "sit-12",
        situation: "I'm a contractor pricing a client job and running several sites.",
        category: "contractor",
        whereToGo: "Calculators → Cost Estimate → Quotation (30) → Projects (26) & Rate Library (31)",
        tabs: ["13 Cost Estimate", "30 Quotation", "26 Projects", "31 Rate Library"],
        docs: ["06_Templates.pdf", "08_Trackers.pdf"],
        reason: "Generate a print-ready client BOQ quotation, monitor budget utilization across 5 projects, and preserve supplier rates for future jobs."
      }
    ],
    exercisesDetailed: [
      {
        exerciseNumber: 1,
        title: "Measure a Room Twice",
        skillPracticed: "Accurate physical dimension verification before data entry",
        answerGiven: "Self-check protocol (ensures width & length variance is within 0.5 inches)"
      },
      {
        exerciseNumber: 2,
        title: "Paint One Room by Hand",
        skillPracticed: "Understanding net wall deductions (subtracting doors & windows) and primer/emulsion coverage",
        answerGiven: "403 sq ft net wall area, requiring exactly 9 litres of paint"
      },
      {
        exerciseNumber: 3,
        title: "Compare Two Supplier Quotes",
        skillPracticed: "Factoring in on-site delivery and unloading charges against raw ex-factory prices",
        answerGiven: "Supplier B is cheaper by ₹5 per bag once site delivery freight is included"
      },
      {
        exerciseNumber: 4,
        title: "Find the Gap in a Contractor Bill",
        skillPracticed: "Auditing claimed quantities against theoretical norms using the 5% tolerance threshold",
        answerGiven: "Contractor claimed 13.6% over tolerance; measurement sheet must be demanded before paying"
      },
      {
        exerciseNumber: 5,
        title: "Balance a Stage Payment",
        skillPracticed: "Calculating revised forecast after change orders and verifying true remaining balance",
        answerGiven: "Exact remaining balance to pay is verified at ₹7,50,000"
      }
    ],
    glossary: [
      {
        term: "AAC Block",
        meaning: "Autoclaved Aerated Concrete block; lightweight, thermally efficient alternative to traditional red clay bricks."
      },
      {
        term: "Aggregate (Jelly)",
        meaning: "Crushed blue metal stone used in concrete mix (standard 20mm for slabs and beams, 40mm for PCC foundation bedding)."
      },
      {
        term: "Allowance (Provisional Sum)",
        meaning: "A fixed provisional budget in a contract for an item not yet finalized (e.g. tile selection), adjusted later by a signed change order."
      },
      {
        term: "Built-up Area",
        meaning: "Total constructed floor area including external and internal wall thicknesses, balconies, and utility ducts."
      },
      {
        term: "Change Order",
        meaning: "A written, priced, and mutually signed authorization for any variation, addition, or deduction from original agreed work."
      },
      {
        term: "Contingency",
        meaning: "An emergency budget reserve for unforeseen site conditions, price escalations, or scope changes (default 10% in this workbook)."
      },
      {
        term: "Cost per sq ft",
        meaning: "Total construction expenditure divided by total built-up area; standard comparative yardstick across Indian cities."
      },
      {
        term: "Dry Volume Factor",
        meaning: "Multiplier converting dry material loose volumes into compacted wet concrete/mortar (1.54 for concrete, 1.27 for plaster)."
      },
      {
        term: "GST",
        meaning: "Goods and Services Tax on construction materials and works contracts; 0% editable placeholder in workbook until confirmed."
      },
      {
        term: "Headroom",
        meaning: "Target sanctioned budget minus total estimated cost; a positive number represents safety buffer, negative means over budget."
      },
      {
        term: "M-Sand",
        meaning: "Manufactured Sand; crushed hard granite stone produced to IS:383 grading zones as an eco-friendly replacement for river sand."
      },
      {
        term: "Order-by Date",
        meaning: "Calculated calendar date by which purchase orders must be placed so materials arrive on site prior to stage commencement."
      },
      {
        term: "Ponding Test",
        meaning: "Water retention test where flat terrace or bathroom sunken slabs are flooded with 50mm water for 48–72 hours to verify waterproofing integrity."
      },
      {
        term: "Retention",
        meaning: "A percentage of each stage payment (typically 5%) held back by the owner until the defects liability period or handover is complete."
      },
      {
        term: "Revised Forecast",
        meaning: "Original estimated project total plus/minus all approved signed change orders; represents the true final cash commitment."
      },
      {
        term: "Silt Test (Jar Test)",
        meaning: "Field sediment test where sand is shaken in a salt-water jar to check that fine silt content does not exceed 8% by volume."
      },
      {
        term: "Snag",
        meaning: "A defect, paint blemish, hairline crack, or hollow tile identified during final walkthrough that the contractor must rectify prior to full payment."
      },
      {
        term: "Stage",
        meaning: "One of 9 sequential construction phases used to group costs and gate cash-flow (site prep, foundation, plinth, RCC, masonry, plaster, flooring, painting, approvals)."
      },
      {
        term: "Tolerance Margin",
        meaning: "The permissible variance percentage between calculated engineering quantities and contractor billed quantities (5% default in this package)."
      },
      {
        term: "TMT Steel",
        meaning: "Thermo-Mechanically Treated high-strength steel reinforcement rebar (Fe 500, Fe 500D, or Fe 550) used in all RCC structural framing."
      },
      {
        term: "Wastage Allowance",
        meaning: "Extra material percentage ordered to accommodate cutting waste, transit breakage, and site spillage (e.g. 3–5% for steel, 5–8% for tiles)."
      }
    ],
    sellerChecklist: [
      {
        id: 1,
        item: "Open all 31 sheets across templates in Microsoft Excel and run the Excel Test Script (including negative-amount check)",
        status: "Pending",
        notes: "Verifies macro-free formula integrity and conditional formatting across Excel versions"
      },
      {
        id: 2,
        item: "Engineer or Quantity Surveyor signs off the factors on the Assumptions tab",
        status: "Pending",
        notes: "Confirms dry volume (1.54), brick consumption, and IS 456 compliance"
      },
      {
        id: 3,
        item: "Complete Terms & Disclaimer tab: seller, support, refund, license, update policy; confirm GST",
        status: "Pending",
        notes: "Legal safeguards and customer support contact details"
      },
      {
        id: 4,
        item: "Lawyer and local-practice review of the bonus guides; remove DRAFT labels only after review",
        status: "Pending",
        notes: "Validates change order terms, payment retention, and contractor contract clauses"
      },
      {
        id: 5,
        item: "Engineer review of Material Quality Checks and Snag List tolerances",
        status: "Pending",
        notes: "Ensures site testing methods match CPWD and IS civil specifications"
      },
      {
        id: 6,
        item: "Record the walkthrough video using the 40-page slide deck speaker notes",
        status: "Pending",
        notes: "High-converting video asset for YouTube, sales page, and post-purchase onboarding"
      },
      {
        id: 7,
        item: "Buyer user test with 8–10 homeowners: time to first estimate, drop-off points",
        status: "Pending",
        notes: "Optimizes onboarding so buyers never experience confusion or request refunds"
      },
      {
        id: 8,
        item: "Re-check Main Guide Module 1 against the blank workbook",
        status: "Pending",
        notes: "Ensures documentation exactly mirrors sheet inputs and cell references"
      }
    ]
  }
};

PRODUCTS["construction-calculator-pro-diwali"] = {
  ...PRODUCTS["construction-calculator-pro"],
  id: "prod_const_india_diwali_299",
  slug: "construction-calculator-pro-diwali",
  title: "CONSTRUCTION CALCULATOR PRO – DIWALI SPECIAL",
  badgeTitle: "Diwali Special Offer • Limited-Time Festive Deal",
  price: 299,
  originalPrice: 999,
  badge: "🪔 Diwali Special Deal (₹299)",
};

export interface AddonProduct {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  price: number;
  originalPrice: number;
  features: string[];
  fileFormat: string;
  badge?: string;
  videoSrc?: string;
}

export interface ReelVideo {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  priceTag: string;
  duration?: string;
  addonId?: string;
  isMainProduct?: boolean;
}

export const REEL_VIDEOS: Record<string, ReelVideo> = {
  "main-calculator": {
    id: "main-calculator",
    src: "/videos/main-calculator-reel.mp4",
    title: "Construction Calculator Pro",
    subtitle: "31 Connected Excel Sheets Walkthrough",
    priceTag: "₹299",
    duration: "60s",
    isMainProduct: true
  },
  "site-expense-profit-tracker": {
    id: "site-expense-profit-tracker",
    src: "/videos/site-expense-tracker-reel.mp4",
    title: "Site Expense & Profit Tracker",
    subtitle: "Real-time Expense, Cash Advance & Profit Tracker",
    priceTag: "₹99",
    duration: "60s",
    addonId: "site-expense-profit-tracker"
  },
  "labour-attendance-weekly-wage-sheet": {
    id: "labour-attendance-weekly-wage-sheet",
    src: "/videos/labour-attendance-sheet-reel.mp4",
    title: "Labour Attendance & Wage Sheet",
    subtitle: "Daily Attendance, Weekly Pay & Overtime Calculator",
    priceTag: "₹99",
    duration: "60s",
    addonId: "labour-attendance-weekly-wage-sheet"
  },
  "payment-collection-tracker": {
    id: "payment-collection-tracker",
    src: "/videos/payment-collection-tracker-reel.mp4",
    title: "Payment Collection Tracker",
    subtitle: "Track Invoices, Aging Debts & WhatsApp Follow-ups",
    priceTag: "₹99",
    duration: "60s",
    addonId: "payment-collection-tracker"
  }
};

export const BUNDLE_PRICE = 499;
export const BUNDLE_ORIGINAL_PRICE = 1896; // 999 + (3 * 299) = 1896
export const BUNDLE_INDIVIDUAL_TOTAL = 596; // 299 + (3 * 99) = 596
export const BUNDLE_DISCOUNT = 97; // 596 - 499 = 97

export function calculateOrderSummary(basePrice: number, addonIds: string[]): {
  addonsSubtotal: number;
  rawTotal: number;
  bundleDiscount: number;
  grandTotal: number;
  isBundleApplied: boolean;
} {
  const allAddonKeys = Object.keys(ADDON_PRODUCTS);
  const validIds = addonIds.filter((id) => Boolean(ADDON_PRODUCTS[id]));
  const addonsSubtotal = validIds.reduce(
    (sum, id) => sum + (ADDON_PRODUCTS[id]?.price || 0),
    0
  );
  const rawTotal = basePrice + addonsSubtotal;
  const isBundleApplied = validIds.length === allAddonKeys.length;
  const bundleDiscount = isBundleApplied ? BUNDLE_DISCOUNT : 0;
  const grandTotal = rawTotal - bundleDiscount;

  return {
    addonsSubtotal,
    rawTotal,
    bundleDiscount,
    grandTotal,
    isBundleApplied
  };
}

export const ADDON_PRODUCTS: Record<string, AddonProduct> = {
  "site-expense-profit-tracker": {
    id: "site-expense-profit-tracker",
    slug: "site-expense-profit-tracker",
    title: "Site Expense & Profit Tracker",
    shortTitle: "Site Expense Tracker",
    description: "Track construction site expenses and budgets, monitor client payments and supervisor advances, and view actual and projected site profit.",
    price: 99,
    originalPrice: 299,
    badge: "Add-on",
    videoSrc: "/videos/site-expense-tracker-reel.mp4",
    features: [
      "Track construction site expenses and budgets.",
      "Monitor client payments and supervisor advances.",
      "View actual and projected site profit."
    ],
    fileFormat: ".zip / .xlsx (Microsoft Excel)"
  },
  "labour-attendance-weekly-wage-sheet": {
    id: "labour-attendance-weekly-wage-sheet",
    slug: "labour-attendance-weekly-wage-sheet",
    title: "Labour Attendance & Weekly Wage Sheet",
    shortTitle: "Labour & Wage Sheet",
    description: "Record daily labour attendance, calculate weekly wages, overtime and advance deductions, and generate printable wage sheets.",
    price: 99,
    originalPrice: 299,
    badge: "Add-on",
    videoSrc: "/videos/labour-attendance-sheet-reel.mp4",
    features: [
      "Record daily labour attendance.",
      "Calculate weekly wages, overtime and advance deductions.",
      "Generate printable wage sheets."
    ],
    fileFormat: ".zip / .xlsx (Microsoft Excel)"
  },
  "payment-collection-tracker": {
    id: "payment-collection-tracker",
    slug: "payment-collection-tracker",
    title: "Payment Collection Tracker",
    shortTitle: "Payment Tracker",
    description: "Track outstanding invoices and overdue payments, prioritise payment follow-ups, and prepare WhatsApp payment reminders.",
    price: 99,
    originalPrice: 299,
    badge: "Add-on",
    videoSrc: "/videos/payment-collection-tracker-reel.mp4",
    features: [
      "Track outstanding invoices and overdue payments.",
      "Prioritise payment follow-ups.",
      "Prepare WhatsApp payment reminders."
    ],
    fileFormat: ".zip / .xlsx (Microsoft Excel)"
  }
};

