import Link from "next/link";

export function InsuranceWarning() {
  return (
    <Link
      href="/insurance"
      className="mt-3 flex items-start gap-2 rounded-xl border border-amber-500/25 bg-amber-500/[0.06] px-3 py-2.5 text-xs text-amber-200/90 transition hover:border-amber-500/40 hover:bg-amber-500/[0.09]"
    >
      <svg
        viewBox="0 0 24 24"
        className="mt-0.5 h-3.5 w-3.5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        />
      </svg>
      <span>
        <span className="font-semibold">Standard travel insurance usually won&apos;t cover this.</span>{" "}
        See what actually will &rarr;
      </span>
    </Link>
  );
}
