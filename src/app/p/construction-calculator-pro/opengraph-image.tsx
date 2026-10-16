import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Construction Calculator Pro — 31-Tab Master Civil Suite (₹499)";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #090d16 0%, #151a24 45%, #1f1606 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "32px", fontWeight: "900", letterSpacing: "-0.5px" }}>
              Think<span style={{ color: "#b7fa4d" }}>Tools</span><span style={{ color: "#94a3b8", fontSize: "22px" }}>.in</span>
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                background: "rgba(16, 185, 129, 0.2)",
                border: "1px solid rgba(16, 185, 129, 0.5)",
                color: "#34d399",
                padding: "8px 18px",
                borderRadius: "999px",
                fontSize: "15px",
                fontWeight: "700",
                marginRight: "12px",
              }}
            >
              CPWD & IS 456 STANDARDS
            </div>
            <div
              style={{
                display: "flex",
                background: "#f59e0b",
                color: "#0f172a",
                padding: "8px 20px",
                borderRadius: "999px",
                fontSize: "16px",
                fontWeight: "900",
              }}
            >
              INR 499 ONLY
            </div>
          </div>
        </div>

        {/* Product Title & Highlights */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "18px",
              fontWeight: "800",
              color: "#fbbf24",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: "12px",
            }}
          >
            Flagship Engineering Suite · 100% Offline Excel
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "58px",
              fontWeight: "900",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              marginBottom: "16px",
            }}
          >
            Construction Calculator Pro
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "23px",
              color: "#94a3b8",
              lineHeight: 1.4,
            }}
          >
            31 interconnected sheets for cement, steel, bricks, paint, tiles, foundation and contractor bill audits. 3 Excel workbooks + 43-page guide + 7 bonuses.
          </div>
        </div>

        {/* Bottom Feature Grid */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            fontSize: "17px",
            color: "#e2e8f0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginRight: "32px" }}>
            <span style={{ color: "#f59e0b", fontWeight: "900", marginRight: "8px" }}>[+]</span> 31 Connected Tabs
          </div>
          <div style={{ display: "flex", alignItems: "center", marginRight: "32px" }}>
            <span style={{ color: "#f59e0b", fontWeight: "900", marginRight: "8px" }}>[+]</span> IS 456 and CPWD Norms
          </div>
          <div style={{ display: "flex", alignItems: "center", marginRight: "32px" }}>
            <span style={{ color: "#f59e0b", fontWeight: "900", marginRight: "8px" }}>[+]</span> Contractor Bill Audit
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: "#f59e0b", fontWeight: "900", marginRight: "8px" }}>[+]</span> Instant Email Dispatch
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
