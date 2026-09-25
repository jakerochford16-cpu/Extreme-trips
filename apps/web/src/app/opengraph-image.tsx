import { ImageResponse } from "next/og";
import { BrandMark } from "@/components/BrandMark";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "linear-gradient(135deg, #0b0a08 0%, #1c130a 60%, #0b0a08 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#c17f4e",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Not a sightseeing app
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 76,
            fontWeight: 900,
            color: "white",
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          Find out what a country actually offers if you want to suffer for it.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 36,
          }}
        >
          <BrandMark size={44} strokeWidth={4.5} />
          <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: "#d99a6c" }}>
            50 countries &middot; 250+ extreme activities &middot; OUTER LINE
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
