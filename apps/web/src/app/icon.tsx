import { ImageResponse } from "next/og";
import { BrandMark } from "@/components/BrandMark";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0a08",
          borderRadius: 14,
        }}
      >
        <BrandMark size={40} strokeWidth={7} />
      </div>
    ),
    { ...size }
  );
}
