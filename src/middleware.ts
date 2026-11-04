import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const HOMEPAGE_MARKDOWN = `# ThinkTools — Work Smarter

> Practical engineering calculation engines, Excel construction toolkits, and custom software solutions for Indian builders, civil engineers, contractors, and creators.

## Flagship Toolkit
### Construction Calculator Pro (31 Sheets)
Complete civil estimation system aligned with Indian Standards (IS 456, IS 1200, CPWD).
- **Base License:** ₹299 (Master 31-sheet calculation workbook + PDF quick-start guide + 7 contractor audit checklists)
- **VIP Complete Bundle:** ₹499 (Master toolkit + Site Expense & Profit Tracker + Labour Attendance Sheet + Payment Collection Tracker)
- **Product Details & Checkout:** https://thinktools.in/p/construction-calculator-pro
- **Format:** Unlocked Microsoft Excel (.xlsx), 100% offline, zero monthly subscriptions.

## Modules Included
1. Stage-wise built-up area cost estimator (₹/sq.ft. budgeting)
2. Concrete volume & mix design (M15, M20, M25, M30)
3. Steel bar bending schedule (BBS) & weight calculation
4. Brickwork & AAC block masonry estimator
5. Plastering & mortar quantity calculator
6. Flooring, tiling, and skirting estimator
7. Painting, primer, and putty calculator
8. Electrical & plumbing rough-in estimator
9. Excavation & earthwork volume calculator
10. Contractor rate analysis & BOQ generator

## Machine-Readable Agent Resources
- **LLM Summary:** https://thinktools.in/llms.txt
- **Full Agent Context:** https://thinktools.in/llms-full.txt
- **MCP Server Card:** https://thinktools.in/.well-known/mcp/server-card.json
- **Robots Directives:** https://thinktools.in/robots.txt (Content-Signal: search=yes, ai-train=no)

## Company Information
- **Publisher:** ThinkTools (Thinktools.in)
- **Location:** Anna Nagar, Chennai, Tamil Nadu 600040, India
- **Email:** support@thinktools.in / orders@thinktools.in
- **Phone:** +91-93450-48201
- **About:** https://thinktools.in/about
- **Contact:** https://thinktools.in/contact
- **Terms:** https://thinktools.in/terms
- **Refund Policy:** https://thinktools.in/refund-policy
`;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const acceptHeader = request.headers.get("accept") || "";

  // 1. Check if the client/agent requests Markdown content negotiation
  const wantsMarkdown =
    acceptHeader.includes("text/markdown") ||
    acceptHeader.includes("text/x-markdown");

  if (wantsMarkdown && (pathname === "/" || pathname === "")) {
    return new NextResponse(HOMEPAGE_MARKDOWN, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
        "Vary": "Accept",
        "Link": '</llms.txt>; rel="describedby"; type="text/markdown", </>; rel="alternate"; type="text/markdown"',
      },
    });
  }

  // 2. Default flow: Add RFC 8288 Link header on pages to advertise llms.txt & Markdown alternate
  const response = NextResponse.next();

  if (pathname === "/" || pathname === "" || pathname.startsWith("/p/")) {
    response.headers.set(
      "Link",
      '</llms.txt>; rel="describedby"; type="text/markdown", </>; rel="alternate"; type="text/markdown"'
    );
    response.headers.set("Vary", "Accept");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes (unless negotiated)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, downloads
     */
    "/((?!api|_next/static|_next/image|favicon.ico|downloads|screenshots).*)",
  ],
};

