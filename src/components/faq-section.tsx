export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSection({
  items,
  title = "Frequently asked questions",
}: {
  items: FAQItem[];
  title?: string;
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-foreground">{title}</h2>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-border bg-surface p-5 open:border-brand/40"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-foreground marker:content-none">
              {item.question}
              <span className="ml-4 shrink-0 text-muted transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
