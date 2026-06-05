"use client";

import { FormEvent, useState } from "react";
import type { Locale } from "@rootfablink/i18n";
import { getCorporateCopy } from "@/components/corporate/corporate-copy";
import { contactDepartmentOrder, contactEmails, type ContactDepartmentKey } from "./contact-copy";

type ContactFormData = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  subject: string;
  department: ContactDepartmentKey;
  message: string;
};

const initialForm: ContactFormData = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  country: "",
  subject: "",
  department: "support",
  message: ""
};

export function ContactForm({ locale }: { locale: Locale }) {
  const copy = getCorporateCopy(locale).contact.form;
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "error" | "pending">("idle");
  const recipient = contactEmails[form.department];

  const update = (field: keyof ContactFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus("idle");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.fullName.trim() || !form.email.includes("@") || !form.country.trim() || !form.subject.trim() || !form.message.trim()) {
      setStatus("error");
      return;
    }

    setStatus("pending");
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-md border border-ink/10 bg-white p-5 shadow-soft sm:p-6">
      <div>
        <h2 className="text-2xl font-bold text-ink">{copy.title}</h2>
        <p className="mt-2 text-sm leading-6 text-steel">{copy.subtitle}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ContactInput label={copy.fullName} value={form.fullName} onChange={(value) => update("fullName", value)} required />
        <ContactInput label={copy.companyName} value={form.companyName} onChange={(value) => update("companyName", value)} />
        <ContactInput label={copy.email} value={form.email} onChange={(value) => update("email", value)} type="email" required />
        <ContactInput label={copy.phone} value={form.phone} onChange={(value) => update("phone", value)} type="tel" />
        <ContactInput label={copy.country} value={form.country} onChange={(value) => update("country", value)} required />
        <ContactInput label={copy.subject} value={form.subject} onChange={(value) => update("subject", value)} required />
        <label className="grid gap-2 text-sm font-semibold text-ink sm:col-span-2">
          {copy.department}
          <select
            value={form.department}
            onChange={(event) => update("department", event.target.value as ContactDepartmentKey)}
            className="h-12 rounded-md border border-ink/12 bg-white px-3 text-sm font-medium text-ink outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/20"
          >
            {contactDepartmentOrder.map((department) => (
              <option key={department} value={department}>
                {copy.departments[department]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-semibold text-ink">
        {copy.message}
        <textarea
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          required
          rows={6}
          className="rounded-md border border-ink/12 bg-white px-3 py-3 text-sm font-medium text-ink outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/20"
        />
      </label>

      {status === "error" && <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{copy.required}</p>}
      {status === "pending" && (
        <p className="mt-4 rounded-md border border-signal/20 bg-cloud px-3 py-3 text-sm font-semibold leading-6 text-ink">
          {copy.pending}{" "}
          <a className="text-copper underline" href={`mailto:${recipient}`}>
            {recipient}
          </a>
        </p>
      )}

      <button type="submit" className="mt-5 inline-flex h-12 items-center justify-center rounded-md bg-signal px-5 text-sm font-bold text-white shadow-[0_14px_28px_rgba(249,115,22,0.22)] transition hover:bg-copper">
        {copy.submit}
      </button>
    </form>
  );
}

function ContactInput({
  label,
  value,
  onChange,
  type = "text",
  required = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-ink">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="h-12 rounded-md border border-ink/12 bg-white px-3 text-sm font-medium text-ink outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/20"
      />
    </label>
  );
}
