"use client";

import { useRef, useState, type FormEvent } from "react";
import { Copy, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { internationalContacts, internationalCopy, type InternationalLocale } from "@/lib/international";
import styles from "./international.module.css";

export function InternationalBookingForm({ locale }: { locale: InternationalLocale }) {
  const copy = internationalCopy[locale].booking;
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const preview = useRef<HTMLTextAreaElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const fields = [
      ["name", copy.name], ["service", copy.service], ["date", copy.date], ["time", copy.time],
      ["from", copy.from], ["to", copy.to], ["passengers", copy.passengers],
      ["luggage", copy.luggage], ["flight", copy.flight], ["notes", copy.notes]
    ];
    const text = [internationalCopy[locale].brand, ...fields.map(([key, label]) => `${label}: ${String(data.get(key) || "").trim()}`).filter((line) => !line.endsWith(": "))].join("\n");
    setMessage(text);
    setStatus("");
    const button = (event.nativeEvent as SubmitEvent).submitter;
    if (button?.getAttribute("data-channel") === "line") {
      try {
        await navigator.clipboard.writeText(text);
        setStatus(copy.copied);
      } catch {
        setStatus(copy.copyFailed);
        window.requestAnimationFrame(() => { preview.current?.focus(); preview.current?.select(); });
      }
    } else {
      window.location.assign(`${internationalContacts.whatsapp}?text=${encodeURIComponent(text)}`);
    }
  }

  const labels = [
    { name: "name", label: copy.name, type: "text", required: true, autoComplete: "name" },
    { name: "date", label: copy.date, type: "date", required: true },
    { name: "time", label: copy.time, type: "time", required: true },
    { name: "passengers", label: copy.passengers, type: "number", required: true },
    { name: "from", label: copy.from, type: "text", required: true },
    { name: "to", label: copy.to, type: "text", required: true },
    { name: "luggage", label: copy.luggage, type: "text" },
    { name: "flight", label: copy.flight, type: "text" }
  ];

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className="block space-y-2 text-sm font-semibold">
        <span>{copy.service}</span>
        <select name="service" className="h-12 w-full rounded-lg border bg-background px-3 text-base">
          {copy.options.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        {labels.map((field) => (
          <label key={field.name} className="block min-w-0 space-y-2 text-sm font-semibold">
            <span>{field.label}{field.required ? " *" : ""}</span>
            <Input name={field.name} type={field.type} required={field.required} autoComplete={field.autoComplete} min={field.type === "number" ? 1 : undefined} max={field.type === "number" ? 50 : undefined} step={field.type === "number" ? 1 : undefined} maxLength={field.type === "text" ? 200 : undefined} className="h-12 min-w-0 text-base" />
          </label>
        ))}
      </div>
      <label className="block space-y-2 text-sm font-semibold">
        <span>{copy.notes}</span>
        <Textarea name="notes" maxLength={1000} className="text-base" />
      </label>
      <p className="text-sm leading-6 text-muted-foreground">{copy.disclaimer}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Button type="submit" data-channel="whatsapp" size="lg" className={`${styles.sendButton} h-auto min-h-14 whitespace-normal px-4 py-3`}><MessageCircle />{copy.send}</Button>
        <Button type="submit" data-channel="line" size="lg" variant="outline" className="h-auto min-h-14 whitespace-normal px-4 py-3"><Copy />{copy.copy}</Button>
      </div>
      <p role="status" aria-live="polite" className="text-sm font-semibold">{status}</p>
      {message ? <label className="block space-y-2 text-sm font-semibold"><span>{copy.preview}</span><Textarea ref={preview} readOnly value={message} rows={12} className="text-base" /><a href={internationalContacts.line} target="_blank" rel="noopener noreferrer" className="inline-block py-3 underline underline-offset-4">{internationalCopy[locale].line}</a></label> : null}
    </form>
  );
}
