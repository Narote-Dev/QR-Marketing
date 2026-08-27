"use client";

import { useDictionary } from "@/components/i18n-provider";

export function BulkQrGuide() {
  const guide = useDictionary().bulkQrGuide;

  return (
    <section id="bulk-qr-guide" aria-labelledby="bulk-guide-heading" className="mt-12 max-w-3xl space-y-10">
      <h2 id="bulk-guide-heading" className="text-2xl font-bold tracking-tight text-slate-900">
        {guide.heading}
      </h2>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">{guide.overviewTitle}</h3>
        {guide.overview.map((paragraph) => (
          <p key={paragraph} className="leading-7 text-slate-700">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">{guide.csvTitle}</h3>
        <p className="leading-7 text-slate-700">{guide.csvIntro}</p>
        <dl className="divide-y rounded-2xl border bg-white">
          {guide.csvColumns.map((column) => (
            <div key={column.name} className="grid gap-1 px-4 py-3 sm:grid-cols-[8rem_1fr]">
              <dt className="font-mono text-sm font-semibold text-brand-teal-dark">{column.name}</dt>
              <dd className="text-sm leading-6 text-slate-700">{column.description}</dd>
            </div>
          ))}
        </dl>
        <div>
          <p className="mb-2 text-sm font-medium text-slate-800">{guide.csvExampleTitle}</p>
          <pre className="overflow-x-auto rounded-2xl border bg-slate-950 p-4 text-sm leading-6 text-slate-100">
            <code>{guide.csvExample}</code>
          </pre>
        </div>
        <ul className="list-disc space-y-2 pl-6 text-sm leading-6 text-slate-700">
          {guide.csvNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">{guide.stepsTitle}</h3>
        <ol className="space-y-4">
          {guide.steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-brand-teal-dark">
                {index + 1}. {step.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">{guide.useCasesTitle}</h3>
        <ul className="list-disc space-y-2 pl-6 leading-7 text-slate-700">
          {guide.useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">{guide.tipsTitle}</h3>
        <ul className="list-disc space-y-2 pl-6 leading-7 text-slate-700">
          {guide.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">{guide.troubleshootingTitle}</h3>
        <div className="space-y-3">
          {guide.troubleshooting.map((item) => (
            <details key={item.question} className="rounded-2xl border bg-white p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">{item.question}</summary>
              <p className="mt-3 text-sm leading-6 text-slate-700">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
