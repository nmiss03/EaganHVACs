"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { serviceOptions } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

interface FieldErrors {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
}

const inputClasses =
  "w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3.5 text-[15px] text-navy-900 placeholder:text-slate-400 transition-colors focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/25 aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-400/20";

const labelClasses = "mb-2 block text-sm font-semibold text-navy-900";

function validate(data: Record<string, string>): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name?.trim()) errors.name = "Please enter your name.";
  const phone = data.phone?.replace(/\D/g, "") ?? "";
  if (!phone) {
    errors.phone = "Please enter your phone number.";
  } else if (phone.length < 10) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.service) errors.service = "Please choose a service.";
  return errors;
}

export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(
      new FormData(form).entries()
    ) as Record<string, string>;

    const fieldErrors = validate(data);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-xl bg-white p-10 text-center shadow-card-hover"
        role="status"
        aria-live="polite"
      >
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <Icon name="check" className="h-10 w-10" strokeWidth={2.2} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-extrabold text-navy-900">
          Request received!
        </h3>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-slate-600">
          Thanks for reaching out. A local HVAC pro will contact you shortly —
          usually within the hour during business hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-semibold text-navy-700 underline decoration-accent-400 decoration-2 underline-offset-4 transition-colors hover:text-accent-600"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl bg-white p-7 shadow-card-hover sm:p-9"
      aria-label="Service inquiry form"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="inquiry-name" className={labelClasses}>
            Full name <span className="text-accent-600">*</span>
          </label>
          <input
            id="inquiry-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Jane Anderson"
            className={inputClasses}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "inquiry-name-error" : undefined}
          />
          {errors.name && (
            <p id="inquiry-name-error" className="mt-1.5 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="inquiry-phone" className={labelClasses}>
            Phone <span className="text-accent-600">*</span>
          </label>
          <input
            id="inquiry-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="(612) 555-0123"
            className={inputClasses}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "inquiry-phone-error" : undefined}
          />
          {errors.phone && (
            <p id="inquiry-phone-error" className="mt-1.5 text-sm text-red-600">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="inquiry-email" className={labelClasses}>
          Email <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <input
          id="inquiry-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@example.com"
          className={inputClasses}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "inquiry-email-error" : undefined}
        />
        {errors.email && (
          <p id="inquiry-email-error" className="mt-1.5 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="inquiry-service" className={labelClasses}>
          What do you need help with? <span className="text-accent-600">*</span>
        </label>
        <select
          id="inquiry-service"
          name="service"
          required
          defaultValue=""
          className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23294e77%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-11`}
          aria-invalid={errors.service ? true : undefined}
          aria-describedby={errors.service ? "inquiry-service-error" : undefined}
        >
          <option value="" disabled>
            Choose a service…
          </option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.service && (
          <p id="inquiry-service-error" className="mt-1.5 text-sm text-red-600">
            {errors.service}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="inquiry-message" className={labelClasses}>
          Tell us more <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <textarea
          id="inquiry-message"
          name="message"
          rows={4}
          placeholder="e.g. Furnace is blowing cold air, house built in 1998, system is about 12 years old…"
          className={`${inputClasses} resize-y`}
        />
      </div>

      {/* Honeypot — hidden from real users, catches naive bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="inquiry-company">Company</label>
        <input id="inquiry-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p
          className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          role="alert"
        >
          Something went wrong sending your request. Please try again, or call
          us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-xl bg-accent-500 px-7 py-4 text-base font-semibold text-white shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 disabled:pointer-events-none disabled:opacity-70"
      >
        {submitting ? (
          <>
            <span
              className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
              aria-hidden="true"
            />
            Sending your request…
          </>
        ) : (
          <>
            Request My Free Quote
            <Icon name="arrowRight" className="h-5 w-5" />
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
        No spam, no obligation. By submitting, you agree to be contacted about
        your service request.
      </p>
    </form>
  );
}
