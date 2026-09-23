import { ImageResponse } from "next/og";

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
          background: "#06060a",
          borderRadius: 14,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M3 19L9.5 7L13 13.5L15.5 9L21 19H3Z" fill="#fb923c" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
