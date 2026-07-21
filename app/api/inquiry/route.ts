import { NextResponse } from "next/server";
import { site } from "@/lib/site";

interface InquiryPayload {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
  company?: string; // honeypot
}

function sanitize(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  let payload: InquiryPayload;
  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot filled in — silently accept so bots don't learn anything.
  if (payload.company) {
    return NextResponse.json({ ok: true });
  }

  const inquiry = {
    name: sanitize(payload.name, 120),
    phone: sanitize(payload.phone, 30),
    email: sanitize(payload.email, 200),
    service: sanitize(payload.service, 120),
    message: sanitize(payload.message, 2000),
  };

  if (!inquiry.name || !inquiry.service || inquiry.phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { error: "Name, a valid phone number, and a service are required." },
      { status: 422 }
    );
  }

  if (inquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 422 }
    );
  }

  try {
    await deliverInquiry(inquiry);
  } catch (error) {
    console.error("Failed to deliver inquiry:", error);
    return NextResponse.json(
      { error: "We couldn't send your request. Please call us instead." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

/**
 * Sends the inquiry to the business inbox via the Resend API when
 * RESEND_API_KEY is configured; otherwise logs it so local development
 * and preview deployments work without credentials.
 */
async function deliverInquiry(inquiry: {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL ?? site.email;
  const from = process.env.INQUIRY_FROM_EMAIL ?? `${site.name} <onboarding@resend.dev>`;

  if (!apiKey) {
    console.info("[inquiry] RESEND_API_KEY not set — logging inquiry instead:", inquiry);
    return;
  }

  const lines = [
    `Name: ${inquiry.name}`,
    `Phone: ${inquiry.phone}`,
    `Email: ${inquiry.email || "(not provided)"}`,
    `Service: ${inquiry.service}`,
    "",
    "Message:",
    inquiry.message || "(none)",
  ];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: inquiry.email || undefined,
      subject: `New inquiry: ${inquiry.service} — ${inquiry.name}`,
      text: lines.join("\n"),
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend API responded with ${res.status}: ${await res.text()}`);
  }
}
