import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/** Shared 1200x630 OG image size + content type for every route. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface OgTemplateOptions {
  /** Main headline (page title). */
  title: string;
  /** Small eyebrow label above the title, e.g. "Service Guide", "Free Tool". */
  category?: string;
}

/**
 * Renders the brand OG image (navy gradient + EaganHVACs mark) with a given
 * title/category. @vercel/og supports only its default font, so this reuses
 * the plain-weight system font stack the root image already relies on.
 */
export function renderOgImage({ title, category }: OgTemplateOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #16355f 0%, #0b2545 55%, #071930 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
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

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {category ? (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                padding: "8px 20px",
                borderRadius: "999px",
                background: "rgba(253,128,55,0.16)",
                color: "#fd8037",
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "28px",
              }}
            >
              {category}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: title.length > 60 ? "60px" : "72px",
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer row */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              padding: "16px 32px",
              borderRadius: "16px",
              background: "#f2610d",
              color: "#071930",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            {site.phone}
          </div>
          <div style={{ display: "flex", fontSize: "26px", color: "rgba(223,234,245,0.7)" }}>
            www.eaganhvacs.com
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
