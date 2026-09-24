import type { VerifiedOperator } from "@/lib/operatorReviews";

export function VerifiedOperatorPanel({ operator }: { operator: VerifiedOperator }) {
  return (
    <div className="mt-4 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.04] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-300">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
            <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
          </svg>
          Verified operator — {operator.company}
        </p>
        <a
          href={operator.tripAdvisorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-white/60 hover:text-white"
        >
          See reviews on TripAdvisor →
        </a>
      </div>

      <blockquote className="mt-3 border-l-2 border-emerald-500/30 pl-3 text-[14px] italic leading-relaxed text-white/75">
        &ldquo;{operator.reviewQuote}&rdquo;
        <a
          href={operator.tripAdvisorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="not-italic ml-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/40 hover:text-white/60"
        >
          — via TripAdvisor
        </a>
      </blockquote>

      <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-wide text-white/40">What&apos;s included</p>
          <ul className="mt-1.5 space-y-1">
            {operator.included.map((item) => (
              <li key={item} className="flex items-start gap-1.5 text-[13px] text-white/70">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400/60" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2.5">
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-wide text-white/40">How it runs</p>
            <p className="mt-1 text-[13px] leading-relaxed text-white/70">{operator.format}</p>
          </div>
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-wide text-white/40">Book direct</p>
            <p className="mt-1 text-[13px] leading-relaxed text-white/70">
              {operator.booking}
              {operator.operatorUrl && (
                <>
                  {" "}
                  <a
                    href={operator.operatorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-300 hover:text-emerald-200"
                  >
                    Visit their site →
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
