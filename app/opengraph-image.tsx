import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Trusted HVAC Repair & Installation in Eagan, MN`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #16355f 0%, #0b2545 55%, #071930 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.1)",
              fontSize: "36px",
            }}
          >
            🔥
          </div>
          <div style={{ display: "flex", fontSize: "40px", fontWeight: 800 }}>
            <span>Eagan</span>
            <span style={{ color: "#fd8037" }}>HVACs</span>
          </div>
        </div>
        <div
          style={{
            marginTop: "48px",
            fontSize: "72px",
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: "950px",
          }}
        >
          Heating & cooling help, fast.
        </div>
        <div
          style={{
            marginTop: "28px",
            fontSize: "34px",
            color: "rgba(223,234,245,0.85)",
            maxWidth: "900px",
          }}
        >
          Trusted local HVAC pros serving Eagan, MN & the south metro
        </div>
        <div
          style={{
            marginTop: "48px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "18px 36px",
              borderRadius: "16px",
              background: "#f2610d",
              fontSize: "30px",
              fontWeight: 700,
            }}
          >
            {site.phone}
          </div>
          <div style={{ display: "flex", fontSize: "28px", color: "rgba(223,234,245,0.7)" }}>
            www.eaganhvacs.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
