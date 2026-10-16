import React from "react";
import { CATALOG_TOOLS, FAQS } from "@/data/catalog";

export default function HomeJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thinktools.in";

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        "name": "Thinktools",
        "legalName": "Thinktools.in",
        "url": siteUrl,
        "logo": `${siteUrl}/favicon.ico`,
        "description":
          "Publisher of practical digital tools, quantity takeoff models, construction estimators, and engineering spreadsheets.",
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
          "Civil Engineering Estimation",
          "IS 456 Standards",
          "CPWD Rate Norms",
          "Contractor Bill Verification",
          "Building Material Calculation",
          "Microsoft Excel Models",
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
        "name": "Thinktools.in",
        "description":
          "Practical tools, construction estimators, and Excel calculators for builders, professionals, and homeowners.",
        "publisher": {
          "@id": `${siteUrl}#organization`,
        },
        "inLanguage": "en-IN",
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}#catalog`,
        "name": "Thinktools Digital Toolkits & Calculators",
        "description": "Practical Excel calculators and estimation workbooks with zero recurring subscriptions.",
        "itemListElement": CATALOG_TOOLS.map((tool, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Product",
            "name": tool.title,
            "description": tool.description,
            "url": `${siteUrl}${tool.href}`,
            "image": `${siteUrl}/screenshots/01_cost_estimate.png`,
            "brand": {
              "@type": "Brand",
              "name": "Thinktools",
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": tool.price.toString(),
              "availability": "https://schema.org/InStock",
              "url": `${siteUrl}${tool.href}`,
            },
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}#faq`,
        "mainEntity": FAQS.map((faq) => ({
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
