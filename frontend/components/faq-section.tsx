type FaqPage = { faqs: { question: string; answer: string }[] };

export function FaqSection({ page }: { page: FaqPage }) {
  return (
    <section className="mt-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold tracking-tight">Frequently asked questions</h2>
      <div className="mt-5 grid gap-3">
        {page.faqs.map((faq) => (
          <details key={faq.question} className="rounded-xl border bg-white p-4">
            <summary className="cursor-pointer font-semibold text-slate-900">{faq.question}</summary>
            <p className="mt-3 text-slate-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
