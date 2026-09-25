"use client";

import { useState, type FormEvent } from "react";

const inputClasses =
  "mt-1.5 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent/60";

type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  handle: string;
  platform: string;
  followerCount: string;
  niche: string;
  email: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  handle: "",
  platform: "",
  followerCount: "",
  niche: "",
  email: "",
  message: "",
};

function Field({
  label,
  id,
  required = true,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-widest text-white/50">
      {label}
      {!required && <span className="ml-1 normal-case text-white/30">(optional)</span>}
      {children}
    </label>
  );
}

export function CreatorApplicationForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const canSubmit =
    form.name.trim().length > 0 &&
    form.handle.trim().length > 0 &&
    form.platform.trim().length > 0 &&
    form.followerCount.trim().length > 0 &&
    form.niche.trim().length > 0 &&
    emailLooksValid;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit || status === "submitting") return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/creator-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <p className="font-semibold text-white">Thanks — we&apos;ll be in touch.</p>
        <p className="mt-1.5 text-sm text-white/65">
          We read every application ourselves and usually reply within a few days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-accent hover:text-accent-light"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
      noValidate
    >
      <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">Apply to be featured</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Field label="Name" id="ca-name">
            <input
              id="ca-name"
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              maxLength={200}
              required
              className={inputClasses}
              placeholder="Jane Smith"
            />
          </Field>
        </div>
        <div>
          <Field label="Handle" id="ca-handle">
            <input
              id="ca-handle"
              type="text"
              value={form.handle}
              onChange={(e) => update("handle", e.target.value)}
              maxLength={200}
              required
              className={inputClasses}
              placeholder="@janesmith"
            />
          </Field>
        </div>
        <div>
          <Field label="Platform" id="ca-platform">
            <input
              id="ca-platform"
              type="text"
              value={form.platform}
              onChange={(e) => update("platform", e.target.value)}
              maxLength={200}
              required
              className={inputClasses}
              placeholder="Instagram"
            />
          </Field>
        </div>
        <div>
          <Field label="Follower count" id="ca-followers">
            <input
              id="ca-followers"
              type="text"
              value={form.followerCount}
              onChange={(e) => update("followerCount", e.target.value)}
              maxLength={200}
              required
              className={inputClasses}
              placeholder="~15k"
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Niche / what you post about" id="ca-niche">
            <input
              id="ca-niche"
              type="text"
              value={form.niche}
              onChange={(e) => update("niche", e.target.value)}
              maxLength={200}
              required
              className={inputClasses}
              placeholder="Alpine climbing, van life, freediving..."
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Email" id="ca-email">
            <input
              id="ca-email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              maxLength={200}
              required
              className={inputClasses}
              placeholder="jane@example.com"
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Anything else" id="ca-message" required={false}>
            <textarea
              id="ca-message"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              maxLength={4000}
              rows={4}
              className={`${inputClasses} resize-none`}
              placeholder="A trip or activity you'd want featured, links to recent posts, anything that helps us make a fast call."
            />
          </Field>
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-[#e08e7f]" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit || status === "submitting"}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-ink shadow-[0_8px_24px_-6px_rgba(193,127,78,0.45)] transition hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "submitting" ? "Sending..." : "Submit application"}
        {status !== "submitting" && (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        )}
      </button>
    </form>
  );
}
