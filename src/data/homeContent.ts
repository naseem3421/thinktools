export interface DigitalProduct {
  id: string;
  name: string;
  category: string;
  availability: "Available Now" | "Coming Soon";
  isAvailable: boolean;
  coverImage?: string;
  description: string;
  facts: string[];
  price?: string;
  priceNote?: string;
  ctaText: string;
  ctaHref: string;
}

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: "construction-calculator-pro",
    name: "Construction Calculator Pro",
    category: "Excel Toolkit",
    availability: "Available Now",
    isAvailable: true,
    coverImage: "/screenshots/01_cost_estimate.png",
    description: "An Excel-based toolkit for construction quantity estimation, cost planning, and related calculations.",
    facts: [
      "Three Excel workbooks",
      "31 connected worksheets",
      "13 PDF guides and worksheets",
      "Seven bonus resources",
    ],
    price: "₹499",
    priceNote: "One-Time Payment",
    ctaText: "View Product Details",
    ctaHref: "/p/construction-calculator-pro",
  },
  {
    id: "construction-management-saas",
    name: "Construction Management SaaS",
    category: "Cloud Software",
    availability: "Coming Soon",
    isAvailable: false,
    description: "A planned software product for construction-related workflows. Product features, pricing, and availability will be announced when confirmed.",
    facts: [
      "Planned browser-based workspace",
      "Features to be confirmed",
      "Pricing announced at launch",
      "Early notifications upon release",
    ],
    ctaText: "Register Interest",
    ctaHref: "mailto:support@thinktools.in?subject=Register%20Interest%20-%20Construction%20Management%20SaaS",
  },
  {
    id: "whatsapp-automation",
    name: "WhatsApp Automation",
    category: "Business Automation",
    availability: "Coming Soon",
    isAvailable: false,
    description: "A planned solution for businesses exploring WhatsApp-based customer communication and workflow automation.",
    facts: [
      "Planned communication workflows",
      "Feasibility assessed per business",
      "Supported integrations announced when verified",
      "Early updates upon release",
    ],
    ctaText: "Register Interest",
    ctaHref: "mailto:support@thinktools.in?subject=Register%20Interest%20-%20WhatsApp%20Automation",
  },
];

export interface CustomService {
  id: string;
  title: string;
  description: string;
  examples: string[];
  ctaText: string;
  emailSubject: string;
}

export const CUSTOM_SERVICES: CustomService[] = [
  {
    id: "custom-calculators",
    title: "Custom Calculators",
    description: "Purpose-built calculators using your formulas, inputs, rules, and reporting needs.",
    examples: [
      "Cost estimation and budgeting",
      "Estimation and quotation tools",
      "Industry-specific calculations",
    ],
    ctaText: "Discuss Your Requirement",
    emailSubject: "Custom Calculator Requirement",
  },
  {
    id: "business-software-saas",
    title: "Business Software & SaaS",
    description: "Web applications designed around specific business processes.",
    examples: [
      "Business dashboards and internal tools",
      "Record-management applications",
      "Industry-specific web applications",
    ],
    ctaText: "Discuss Your Requirement",
    emailSubject: "Business Software Requirement",
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description: "Integrations and automated processes intended to reduce repetitive manual tasks.",
    examples: [
      "Enquiry-management workflows",
      "Form and data integrations",
      "Notifications and supported messaging integrations",
    ],
    ctaText: "Discuss Your Requirement",
    emailSubject: "Workflow Automation Requirement",
  },
  {
    id: "digital-product-development",
    title: "Digital Product Development",
    description: "Turn a repeatable process into a structured digital resource or product.",
    examples: [
      "Excel workbooks and templates",
      "Online calculators",
      "Niche-specific digital products",
    ],
    ctaText: "Discuss Your Requirement",
    emailSubject: "Digital Product Development Requirement",
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    description: "Tell us about the problem, intended users, and outcome you need.",
  },
  {
    number: "02",
    title: "Plan",
    description: "Agree on requirements, scope, cost, dependencies, and estimated timeline.",
  },
  {
    number: "03",
    title: "Develop",
    description: "Build and review the solution according to the agreed scope.",
  },
  {
    number: "04",
    title: "Handover",
    description: "Receive the agreed deliverables and any included documentation or support.",
  },
];

export interface ApproachPoint {
  title: string;
  description: string;
}

export const APPROACH_POINTS: ApproachPoint[] = [
  {
    title: "Purpose-Led Development",
    description: "Start with the task or workflow that needs to be solved.",
  },
  {
    title: "Clear Product Information",
    description: "Understand what a product includes, what it requires, and what it is designed to do.",
  },
  {
    title: "Agreed Scope and Pricing",
    description: "Discuss deliverables, costs, dependencies, and timelines before custom development begins.",
  },
  {
    title: "A Suitable Solution for the Task",
    description: "Depending on the requirement, the right approach may be a spreadsheet, calculator, automation, or web application.",
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const HOMEPAGE_FAQS: FAQItem[] = [
  {
    question: "What is ThinkTools?",
    answer: "ThinkTools offers digital products and custom calculator and software development services.",
  },
  {
    question: "What products are available now?",
    answer: "Construction Calculator Pro is currently listed at ₹499 as a one-time purchase. Construction Management SaaS and WhatsApp Automation are marked as Coming Soon.",
  },
  {
    question: "What is Construction Calculator Pro?",
    answer: "It is a downloadable Excel toolkit for construction quantity estimation, cost planning, and related calculations. Refer to the product page for complete specifications and included resources.",
  },
  {
    question: "How much does Construction Calculator Pro cost?",
    answer: "The current listed price is ₹499 as a one-time payment. It is separate from the planned Construction Management SaaS product.",
  },
  {
    question: "Can you build a calculator for my business?",
    answer: "You can submit your requirements for review. The proposed solution depends on your formulas, inputs, outputs, platform, and technical requirements.",
  },
  {
    question: "Can you develop custom software or SaaS?",
    answer: "You can enquire about a proposed project. Technical feasibility, scope, cost, and delivery timing are assessed individually.",
  },
  {
    question: "Are Construction Management SaaS and WhatsApp Automation available now?",
    answer: "No. Both are currently marked as Coming Soon. Availability, confirmed features, and pricing will be published when established.",
  },
  {
    question: "How do I enquire about a custom project?",
    answer: "Email support@thinktools.in with a brief description of your requirement and the functionality you need.",
  },
];
