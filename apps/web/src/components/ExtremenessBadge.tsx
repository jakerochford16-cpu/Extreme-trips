export function ExtremenessBadge({ rating }: { rating: number }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white/85 backdrop-blur-sm"
      title={`Extremeness: ${rating}/5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-3 w-3 ${i < rating ? "text-orange-400" : "text-white/25"}`}
          fill="currentColor"
        >
          <path d="M12 2c1 3-2 4-2 7a2 2 0 104 0c1.5 1 2.5 3 2.5 5a6.5 6.5 0 11-13 0c0-4 3-6 3-9 0-1.5.5-2.5 1.5-3z" />
        </svg>
      ))}
    </span>
  );
}
