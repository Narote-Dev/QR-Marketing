"use client";
import { AtSign, FileText, Link2, MessageSquare, Phone, Wifi } from "lucide-react";
import { qrTypeLabels, type QrType } from "@/lib/qr/types";
const icons = { url: Link2, text: FileText, wifi: Wifi, email: AtSign, phone: Phone, sms: MessageSquare };
export function QrTypeSelector({ type, onChange }: { type: QrType; onChange: (type: QrType) => void }) {
  return <div className="grid grid-cols-3 gap-2 sm:grid-cols-6" role="tablist" aria-label="QR code type">{(Object.keys(qrTypeLabels) as QrType[]).map((item) => { const Icon = icons[item]; const selected = item === type; return <button key={item} type="button" role="tab" aria-selected={selected} onClick={() => onChange(item)} className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-xl border px-2 text-sm font-medium transition ${selected ? "border-blue-600 bg-blue-600 text-white" : "bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"}`}><Icon size={19} aria-hidden="true" />{qrTypeLabels[item]}</button>; })}</div>;
}
