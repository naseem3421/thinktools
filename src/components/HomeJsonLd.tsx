import React from "react";
import { HOMEPAGE_FAQS } from "@/data/homeContent";

export default function HomeJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thinktools.in";

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        "name": "ThinkTools",
        "legalName": "Thinktools.in",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.png`,
        "sameAs": ["https://www.instagram.com/thinktools.in"],
        "description":
          "Publisher of practical digital products, construction calculators, and custom software and workflow solutions.",
        "email": "support@thinktools.in",
        "foundingLocation": {
          "@type": "Place",
          "name": "India",
        },
        "areaServed": {
          "@type": "Country",
          "name": "India",
        },
        "knowsAbout": [
          "Digital Products",
          "Custom Calculator Development",
          "Construction Quantity Estimation",
          "Workflow Automation",
          "Custom Software & SaaS Development",
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "support@thinktools.in",
          "contactType": "Customer Support",
          "availableLanguage": ["English", "Hindi"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        "url": siteUrl,
        "name": "ThinkTools",
        "description":
          "Digital products and custom software solutions for practical workflows.",
        "publisher": {
          "@id": `${siteUrl}#organization`,
        },
        "inLanguage": "en-IN",
      },
      {
        "@type": "Product",
        "@id": `${siteUrl}#construction-calculator-pro`,
        "name": "Construction Calculator Pro",
        "description":
          "An Excel-based toolkit for construction quantity estimation, cost planning, and related calculations.",
        "url": `${siteUrl}/p/construction-calculator-pro`,
        "image": `${siteUrl}/screenshots/01_cost_estimate.png`,
        "brand": {
          "@type": "Brand",
          "name": "ThinkTools",
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "499",
          "availability": "https://schema.org/InStock",
          "url": `${siteUrl}/p/construction-calculator-pro`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}#faq`,
        "mainEntity": HOMEPAGE_FAQS.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
    />
  );
}
