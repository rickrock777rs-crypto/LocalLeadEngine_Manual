"use client";

import { useEffect, useState } from "react";
import { timeRemaining } from "@/lib/format";

export function CountdownTimer({ endsAt, className }: { endsAt: string; className?: string }) {
  const [label, setLabel] = useState(() => timeRemaining(endsAt));

  useEffect(() => {
    const id = setInterval(() => setLabel(timeRemaining(endsAt)), 30_000);
    return () => clearInterval(id);
  }, [endsAt]);

  return <span className={className}>{label}</span>;
}
