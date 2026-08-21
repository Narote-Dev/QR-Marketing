"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useDictionary } from "@/components/i18n-provider";
import type { QrFormValues, QrType } from "@/lib/qr/types";

type Props = { type: QrType; values: QrFormValues; onChange: (values: QrFormValues) => void; error?: string };

const inputStyle =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      {children}
    </label>
  );
}

export function QrForm({ type, values, onChange, error }: Props) {
  const dictionary = useDictionary();
  // Change: Allow users to reveal or hide the WiFi password.
  // Step 1: Track the password visibility state.
  const [showWifiPassword, setShowWifiPassword] = useState(false);

  // Step 2: Update the selected QR form value.
  const set = (key: keyof QrFormValues, value: string) => onChange({ ...values, [key]: value });
  const input = (label: string, key: keyof QrFormValues, placeholder: string, inputType = "text") => (
    <Field label={label}>
      <input className={inputStyle} type={inputType} value={values[key]} onChange={(event) => set(key, event.target.value)} placeholder={placeholder} />
    </Field>
  );

  return (
    <div className="space-y-4">
      {type === "url" && input(dictionary.form.websiteAddress, "url", dictionary.form.websitePlaceholder, "url")}
      {type === "text" && (
        <Field label={dictionary.form.text}>
          <textarea className={inputStyle} value={values.text} onChange={(event) => set("text", event.target.value)} placeholder={dictionary.form.textPlaceholder} rows={5} />
        </Field>
      )}
      {type === "wifi" && (
        <>
          <Field label={dictionary.form.wifiSsid}>
            <input className={inputStyle} value={values.wifiSsid} onChange={(event) => set("wifiSsid", event.target.value)} placeholder={dictionary.form.wifiSsidPlaceholder} />
          </Field>
          <Field label={dictionary.form.wifiSecurity}>
            <select className={inputStyle} value={values.wifiEncryption} onChange={(event) => set("wifiEncryption", event.target.value as QrFormValues["wifiEncryption"])}>
              <option value="WPA">{dictionary.form.wifiWpa}</option>
              <option value="WEP">{dictionary.form.wifiWep}</option>
              <option value="nopass">{dictionary.form.wifiNopass}</option>
            </select>
          </Field>
          {values.wifiEncryption !== "nopass" && (
            <div className="text-sm font-medium text-slate-700">
              <label htmlFor="wifi-password">{dictionary.form.wifiPassword}</label>
              <div className="relative">
                <input
                  id="wifi-password"
                  className={`${inputStyle} pr-11`}
                  type={showWifiPassword ? "text" : "password"}
                  value={values.wifiPassword}
                  onChange={(event) => set("wifiPassword", event.target.value)}
                  placeholder={dictionary.form.wifiPasswordPlaceholder}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 mt-1 flex w-11 items-center justify-center text-slate-500 transition hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600"
                  onClick={() => setShowWifiPassword((visible) => !visible)}
                  aria-label={showWifiPassword ? dictionary.form.hidePassword : dictionary.form.showPassword}
                  aria-pressed={showWifiPassword}
                >
                  {showWifiPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                </button>
              </div>
            </div>
          )}
        </>
      )}
      {type === "email" && (
        <>
          {input(dictionary.form.recipientEmail, "email", dictionary.form.emailPlaceholder, "email")}
          {input(dictionary.form.emailSubject, "emailSubject", dictionary.form.emailSubjectPlaceholder)}
          <Field label={dictionary.form.emailMessage}>
            <textarea className={inputStyle} value={values.emailBody} onChange={(event) => set("emailBody", event.target.value)} placeholder={dictionary.form.emailMessagePlaceholder} rows={3} />
          </Field>
        </>
      )}
      {type === "phone" && input(dictionary.form.phoneNumber, "phone", dictionary.form.phonePlaceholder, "tel")}
      {type === "sms" && (
        <>
          {input(dictionary.form.smsPhone, "smsPhone", dictionary.form.smsPhonePlaceholder, "tel")}
          <Field label={dictionary.form.smsMessage}>
            <textarea className={inputStyle} value={values.smsMessage} onChange={(event) => set("smsMessage", event.target.value)} placeholder={dictionary.form.smsMessagePlaceholder} rows={3} />
          </Field>
        </>
      )}
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
