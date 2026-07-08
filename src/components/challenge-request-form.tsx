"use client";

import { FormEvent, useState } from "react";
import { ASSET_TYPES, BUSINESS_CATEGORIES, BUSINESS_GOALS } from "@/lib/types";

const BUDGET_OPTIONS = [
  "Just exploring the free tier",
  "Under $100",
  "$100–$300",
  "$300+",
  "Interested in monthly sponsorship",
];

export function ChallengeRequestForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      business_name: data.get("business_name"),
      contact_name: data.get("contact_name"),
      email: data.get("email"),
      phone: data.get("phone"),
      business_category: data.get("business_category"),
      website_or_social: data.get("website_or_social"),
      message: data.get("message"),
      desired_asset_type: data.get("desired_asset_type"),
      promotion_goal: data.get("promotion_goal"),
      offer_details: data.get("offer_details"),
      deadline: data.get("deadline"),
      budget_interest: data.get("budget_interest"),
      feature_permission: data.get("feature_permission") === "on",
    };

    try {
      const res = await fetch("/api/challenge-request", {
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
        <p className="text-2xl">🎉</p>
        <h3 className="mt-3 text-lg font-bold text-foreground">Challenge request received</h3>
        <p className="mt-2 text-sm text-muted">
          Our team reviews every request before matching creators. We&apos;ll follow up at the
          email you provided.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Business name" required>
          <input name="business_name" required className={inputClass} placeholder="Sonoma Coffee House" />
        </Field>
        <Field label="Contact name" required>
          <input name="contact_name" required className={inputClass} placeholder="Dana Reyes" />
        </Field>
        <Field label="Email" required>
          <input type="email" name="email" required className={inputClass} placeholder="you@business.com" />
        </Field>
        <Field label="Phone">
          <input name="phone" className={inputClass} placeholder="(707) 555-0142" />
        </Field>
        <Field label="Business category" required>
          <select name="business_category" required className={inputClass} defaultValue="">
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
        <Field label="Website or social link">
          <input name="website_or_social" className={inputClass} placeholder="https://" />
        </Field>
      </div>

      <Field label="What do you want promoted?" required>
        <textarea
          name="message"
          required
          rows={3}
          className={inputClass}
          placeholder="A new seasonal menu item, a happy hour promo, our grand opening..."
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="What type of asset do you want creators to make?" required>
          <select name="desired_asset_type" required className={inputClass} defaultValue="">
            <option value="" disabled>
              Select an asset type
            </option>
            {ASSET_TYPES.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Business goal" required>
          <select name="promotion_goal" required className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a goal
            </option>
            {BUSINESS_GOALS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Offer or promotion details">
        <textarea
          name="offer_details"
          rows={2}
          className={inputClass}
          placeholder="20% off for first-time customers, buy-one-get-one, etc."
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Deadline">
          <input type="date" name="deadline" className={inputClass} />
        </Field>
        <Field label="Budget / sponsor interest">
          <select name="budget_interest" className={inputClass} defaultValue={BUDGET_OPTIONS[0]}>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-border bg-surface-2 p-4 text-sm text-foreground/90">
        <input type="checkbox" name="feature_permission" required className="mt-1 h-4 w-4" />
        I give Local Ad Battle permission to feature my business name, logo, and offer details
        publicly as part of this challenge.
      </label>

      {status === "error" && <p className="text-sm text-loss">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-fit rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-ink transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Submit Challenge Request"}
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
