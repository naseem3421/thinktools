import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Thinktools.in — Smart Digital Toolkits & Construction Calculators";
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
          background: "linear-gradient(135deg, #090d16 0%, #151a24 50%, #1a160d 100%)",
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
              Thinktools<span style={{ color: "#f59e0b" }}>.in</span>
            </span>
          </div>

          <div
            style={{
              display: "flex",
              background: "rgba(245, 158, 11, 0.15)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              color: "#fbbf24",
              padding: "8px 20px",
              borderRadius: "999px",
              fontSize: "15px",
              fontWeight: "700",
              letterSpacing: "0.5px",
            }}
          >
            LIFETIME ACCESS • NO SUBSCRIPTIONS
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "980px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "56px",
              fontWeight: "900",
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              marginBottom: "16px",
            }}
          >
            Smart Digital Toolkits & Construction Calculators
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              color: "#94a3b8",
              lineHeight: 1.4,
            }}
          >
            Engineered Excel suites, quantity estimators, and contractor audit kits. 100% offline, zero formulas to learn.
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            fontSize: "18px",
            color: "#cbd5e1",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginRight: "32px" }}>
            <span style={{ color: "#f59e0b", fontWeight: "900", marginRight: "8px" }}>[+]</span> 31-Tab Connected Civil Suite
          </div>
          <div style={{ display: "flex", alignItems: "center", marginRight: "32px" }}>
            <span style={{ color: "#f59e0b", fontWeight: "900", marginRight: "8px" }}>[+]</span> Instant Digital Delivery
          </div>
          <div style={{ display: "flex", alignItems: "center", marginRight: "32px" }}>
            <span style={{ color: "#f59e0b", fontWeight: "900", marginRight: "8px" }}>[+]</span> IS 456 & CPWD Compliant
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: "#f59e0b", fontWeight: "900", marginRight: "8px" }}>[+]</span> INR 499 One-Time
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
