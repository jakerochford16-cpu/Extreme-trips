// Mirrors the favorites/reviews localStorage + CustomEvent pattern used
// elsewhere in this app. Only two real cookie-ish concerns exist on this
// site: Clerk's own session cookie (essential — sign-in can't work without
// it, so it's never gated behind this) and the Skimlinks affiliate script
// (non-essential tracking, gated by AffiliateScript reading this).
export type ConsentChoice = "accepted" | "essential-only";

const STORAGE_KEY = "outer-line:cookie-consent";
export const CONSENT_EVENT = "outer-line:cookie-consent-changed";

export function getConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw === "accepted" || raw === "essential-only" ? raw : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
  } catch {
    // localStorage unavailable — the banner will just keep reappearing,
    // which is the safe failure mode for a consent gate
  }
}
