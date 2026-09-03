"use client";

import { useId, useRef, useState } from "react";
import type { CompanyContactForm } from "@/lib/company/types";
import { supportEmail } from "@/lib/site/support";

type Props = {
  copy: CompanyContactForm;
};

const inputStyle =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal-light/30";

export function ContactMailtoForm({ copy }: Props) {
  // Step 1: Collect optional reply email + required message for a support draft.
  const titleId = useId();
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string>();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // Step 2: Require a real message before opening the mail client.
    const trimmed = message.trim();
    if (!trimmed) {
      setError(copy.messageRequired);
      messageRef.current?.focus();
      return;
    }
    setError(undefined);

    // Step 3: Open the user's mail app with a pre-filled draft to support@.
    const bodyLines = [
      trimmed,
      "",
      email.trim() ? `${copy.replyLine}: ${email.trim()}` : undefined,
      `Page: ${typeof window !== "undefined" ? window.location.href : "/contact"}`,
    ].filter(Boolean);
    const mailto = `mailto:${supportEmail}?subject=${encodeURIComponent(copy.mailSubject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    window.location.href = mailto;
  }

  return (
    <section
      className="mt-8 rounded-2xl border border-brand-teal/30 bg-brand-teal-light/10 px-5 py-6"
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="text-xl font-bold text-brand-ink">
        {copy.title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">{copy.intro}</p>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="contact-reply-email" className="text-sm font-semibold text-slate-800">
            {copy.emailLabel}
          </label>
          <input
            id="contact-reply-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={copy.emailPlaceholder}
            className={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="text-sm font-semibold text-slate-800">
            {copy.messageLabel}
          </label>
          <textarea
            id="contact-message"
            ref={messageRef}
            required
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={copy.messagePlaceholder}
            className={inputStyle}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "contact-message-error" : "contact-mailto-hint"}
          />
          {error ? (
            <p id="contact-message-error" className="mt-1 text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          ) : (
            <p id="contact-mailto-hint" className="mt-1 text-xs text-slate-500">
              {copy.mailtoHint}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-brand-teal px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-teal-dark"
        >
          {copy.send}
        </button>
      </form>
    </section>
  );
}
