// JSON.stringify output embedded verbatim in a <script> tag can be broken
// out of by a literal "</script>" substring — escape "<" so that can never
// happen, regardless of how trusted the source data currently is.
export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
