// The Outer Line mark: O + L fused into a ridge — a peak for "Outer", a base
// line for "Line". Shared between the header, the favicon (icon.tsx), and the
// OG image (opengraph-image.tsx) so all three stay in sync from one source.
export function BrandMark({
  size = 32,
  peakColor = "#FBF8F3",
  lineColor = "#c17f4e",
  strokeWidth = 4,
}: {
  size?: number;
  peakColor?: string;
  lineColor?: string;
  strokeWidth?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 78 L50 20 L80 78 L64 78 L50 50 L36 78 Z"
        stroke={peakColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="14" y1="78" x2="86" y2="78" stroke={lineColor} strokeWidth={strokeWidth + 1} strokeLinecap="round" />
    </svg>
  );
}
