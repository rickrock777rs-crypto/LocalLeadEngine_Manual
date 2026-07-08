"use client";

import { useEffect, useState } from "react";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  // Starts empty so the server and first client render match, then fills in
  // after mount — reading window.location during render causes a hydration
  // mismatch since the server has no URL to render.
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — ignore for MVP
    }
  }

  const text = encodeURIComponent(`Vote for the better ad: ${title}`);

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="text-muted">Share this battle:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-border px-3 py-1.5 text-foreground transition hover:border-brand hover:text-brand"
      >
        X / Twitter
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-border px-3 py-1.5 text-foreground transition hover:border-brand hover:text-brand"
      >
        Facebook
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="rounded-full border border-border px-3 py-1.5 text-foreground transition hover:border-brand hover:text-brand"
      >
        {copied ? "Link copied!" : "Copy link"}
      </button>
    </div>
  );
}
