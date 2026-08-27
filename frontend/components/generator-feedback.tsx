"use client";

import { MessageSquare, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useDictionary } from "@/components/i18n-provider";
import { supportEmail } from "@/lib/site/support";

type Props = {
  qrMode?: "static" | "dynamic";
  qrType?: string;
};

const inputStyle =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal-light/30";

export function GeneratorFeedback({ qrMode, qrType }: Props) {
  const dictionary = useDictionary();
  const copy = dictionary.generator.feedback;
  const titleId = useId();
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string>();

  // Step 1: Focus the message field when the panel opens.
  useEffect(() => {
    if (!open) return;
    messageRef.current?.focus();
  }, [open]);

  // Step 2: Close on Escape while the feedback panel is open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function close() {
    setOpen(false);
    setError(undefined);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) {
      setError(copy.messageRequired);
      return;
    }
    setError(undefined);

    // Step 3: Open the user's mail app with a pre-filled support draft.
    const subject = copy.mailSubject;
    const bodyLines = [
      trimmed,
      "",
      email.trim() ? `${copy.replyLine}: ${email.trim()}` : undefined,
      `${copy.pageLine}: ${window.location.href}`,
      qrMode ? `${copy.modeLine}: ${qrMode}` : undefined,
      qrType ? `${copy.typeLine}: ${qrType}` : undefined,
    ].filter(Boolean);
    const mailto = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    window.location.href = mailto;
    close();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand-teal hover:bg-brand-cream hover:text-brand-teal-dark"
      >
        <MessageSquare className="h-4 w-4" aria-hidden="true" />
        {copy.button}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-4 sm:items-center"
          onClick={close}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id={titleId} className="text-lg font-bold text-slate-900">
                  {copy.title}
                </h2>
                <p className="mt-1 text-sm text-slate-600">{copy.intro}</p>
              </div>
              <button
                type="button"
                onClick={close}
                className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                aria-label={copy.close}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-slate-700">
                {copy.emailLabel}
                <input
                  className={inputStyle}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={copy.emailPlaceholder}
                  autoComplete="email"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                {copy.messageLabel}
                <textarea
                  ref={messageRef}
                  className={inputStyle}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={copy.messagePlaceholder}
                  rows={4}
                  required
                />
              </label>
              {error && (
                <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              )}
              <p className="text-xs text-slate-500">{copy.mailtoHint}</p>
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  {copy.cancel}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-brand-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-teal-dark"
                >
                  {copy.send}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
