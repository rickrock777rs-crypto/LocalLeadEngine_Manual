export interface LegalSection {
  heading: string;
  body: string;
}

export function LegalPage({ title, sections }: { title: string; sections: LegalSection[] }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">Legal</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 rounded-xl border border-dashed border-border p-4 text-sm text-muted">
        This is a placeholder for the MVP. Replace with counsel-reviewed legal language before a
        public launch.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="text-lg font-bold text-foreground">{s.heading}</h2>
            <p className="mt-2 text-sm text-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
