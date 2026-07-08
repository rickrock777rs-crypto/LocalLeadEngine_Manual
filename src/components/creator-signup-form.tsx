"use client";

import { FormEvent, useState } from "react";
import { BUSINESS_CATEGORIES, CREATOR_SKILLS, EXPERIENCE_LEVELS } from "@/lib/types";

export function CreatorSignupForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      creator_name: data.get("creator_name"),
      email: data.get("email"),
      location: data.get("location"),
      main_skill: data.get("main_skill"),
      portfolio_link: data.get("portfolio_link"),
      bio: data.get("bio"),
      preferred_category: data.get("preferred_category"),
      experience_level: data.get("experience_level"),
      agreed_to_rules: data.get("agreed_to_rules") === "on",
    };

    try {
      const res = await fetch("/api/creator-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) {
        setErrorMessage(result.error ?? "Something went wrong. Try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("Network error — try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-brand/40 bg-brand/10 p-8 text-center">
        <p className="text-2xl">🥊</p>
        <h3 className="mt-3 text-lg font-bold text-foreground">You&apos;re on the roster</h3>
        <p className="mt-2 text-sm text-muted">
          We&apos;ll reach out by email when there&apos;s a battle that fits your skills and
          category.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Creator name" required>
          <input name="creator_name" required className={inputClass} placeholder="Alex Creative" />
        </Field>
        <Field label="Email" required>
          <input type="email" name="email" required className={inputClass} placeholder="you@example.com" />
        </Field>
        <Field label="Location" required>
          <input name="location" required className={inputClass} placeholder="Santa Rosa, CA" />
        </Field>
        <Field label="Main skill" required>
          <select name="main_skill" required className={inputClass} defaultValue="">
            <option value="" disabled>
              Select your main skill
            </option>
            {CREATOR_SKILLS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Portfolio / social link">
          <input name="portfolio_link" className={inputClass} placeholder="https://" />
        </Field>
        <Field label="Preferred battle category" required>
          <select name="preferred_category" required className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a category
            </option>
            {BUSINESS_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Experience level" required>
          <select name="experience_level" required className={inputClass} defaultValue="">
            <option value="" disabled>
              Select experience level
            </option>
            {EXPERIENCE_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Short bio" required>
        <textarea
          name="bio"
          required
          rows={3}
          className={inputClass}
          placeholder="What do you make, and who do you make it for?"
        />
      </Field>

      <label className="flex items-start gap-3 rounded-xl border border-border bg-surface-2 p-4 text-sm text-foreground/90">
        <input type="checkbox" name="agreed_to_rules" required className="mt-1 h-4 w-4" />
        I agree to the{" "}
        <a href="/rules" className="text-brand hover:underline">
          competition rules
        </a>
        , including submitting original work and granting winning-asset usage rights to the
        featured business.
      </label>

      {status === "error" && <p className="text-sm text-loss">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-fit rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-ink transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Join as a Creator"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-brand";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-foreground">
        {label} {required && <span className="text-side-b">*</span>}
      </span>
      {children}
    </label>
  );
}
