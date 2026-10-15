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
        "logo": `${siteUrl}/logo.png`,
        "description":
          "Premier Indian publisher of professional digital tools, quantity takeoff models, construction estimators, and business spreadsheets.",
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
          "IS 456:2000 Standards",
          "CPWD Rate Norms",
          "Contractor Bill Auditing",
          "Building Material Calculation",
          "Financial Modeling in Microsoft Excel",
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "support@thinktools.in",
          "contactType": "Customer Support & Technical Help",
          "availableLanguage": ["English", "Hindi"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        "url": siteUrl,
        "name": "Thinktools.in",
        "description":
          "Smart digital toolkits, construction estimators, and Excel calculators for builders, professionals, and creators.",
        "publisher": {
          "@id": `${siteUrl}#organization`,
        },
        "inLanguage": "en-IN",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${siteUrl}/#catalog?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}#catalog`,
        "name": "Thinktools Digital Spreadsheet Suites & Calculators",
        "description": "Curated collection of professional offline Excel calculators with zero recurring subscriptions.",
        "itemListElement": CATALOG_TOOLS.map((tool, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Product",
            "name": tool.title,
            "description": tool.description,
            "url": tool.isReady ? `${siteUrl}${tool.href}` : `${siteUrl}/#catalog`,
            "image": `${siteUrl}/opengraph-image`,
            "brand": {
              "@type": "Brand",
              "name": "Thinktools",
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": tool.price.toString(),
              "availability": tool.isReady
                ? "https://schema.org/InStock"
                : "https://schema.org/PreOrder",
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": tool.rating.toString(),
              "reviewCount": tool.reviewCount.toString(),
            },
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}#faq`,
        "mainEntity": FAQS.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a,
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
