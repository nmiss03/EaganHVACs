import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import {
  kitChecklist,
  kitPrices,
  kitQuestions,
  kitRebates,
} from "@/lib/buyers-kit";

interface SubscribePayload {
  email?: string;
  source?: string;
  company?: string; // honeypot
}

function sanitize(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  let payload: SubscribePayload;
  try {
    payload = (await request.json()) as SubscribePayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot filled in — silently accept so bots learn nothing.
  if (payload.company) {
    return NextResponse.json({ ok: true });
  }

  const email = sanitize(payload.email, 200);
  const source = sanitize(payload.source, 60) || "site";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  try {
    await deliverKit(email, source);
  } catch (error) {
    console.error("Failed to deliver Buyer's Kit:", error);
    return NextResponse.json(
      { error: "We couldn't send the kit right now. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

/**
 * Emails the Buyer's Kit to the subscriber, notifies the business inbox, and
 * (when configured) adds the contact to a Resend Audience so the list is a
 * real, exportable owned asset. Falls back to logging without credentials.
 */
async function deliverKit(email: string, source: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL ?? site.email;
  const from = process.env.INQUIRY_FROM_EMAIL ?? `${site.name} <onboarding@resend.dev>`;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey) {
    console.info("[subscribe] RESEND_API_KEY not set — logging subscriber instead:", {
      email,
      source,
    });
    return;
  }

  // Best-effort: add to the owned audience list. Don't fail the signup if this errors.
  if (audienceId) {
    try {
      await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      });
    } catch (err) {
      console.error("[subscribe] Failed to add contact to audience:", err);
    }
  }

  // Send the kit to the subscriber.
  const kitRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Your Minnesota HVAC Buyer's Kit 🧰",
      html: kitEmailHtml(),
    }),
  });

  if (!kitRes.ok) {
    throw new Error(`Resend API responded with ${kitRes.status}: ${await kitRes.text()}`);
  }

  // Notify the business inbox of the new subscriber (best-effort).
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New kit subscriber: ${email}`,
        text: `New Buyer's Kit subscriber\n\nEmail: ${email}\nSource: ${source}`,
      }),
    });
  } catch (err) {
    console.error("[subscribe] Failed to send owner notification:", err);
  }
}

function kitEmailHtml(): string {
  const li = (items: string[]) =>
    items
      .map(
        (t) =>
          `<li style="margin:0 0 8px;padding:0;color:#334155;font-size:15px;line-height:1.5;">${t}</li>`
      )
      .join("");

  const priceRows = kitPrices
    .map(
      (p) =>
        `<tr><td style="padding:6px 0;color:#334155;font-size:15px;">${p.label}</td><td style="padding:6px 0;color:#0f172a;font-weight:700;font-size:15px;text-align:right;">${p.range}</td></tr>`
    )
    .join("");

  const rebateRows = kitRebates
    .map(
      (r) =>
        `<li style="margin:0 0 10px;padding:0;color:#334155;font-size:15px;line-height:1.5;"><strong style="color:#0f172a;">${r.program}:</strong> ${r.covers}</li>`
    )
    .join("");

  const url = site.url;
  const h = (t: string) =>
    `<h2 style="margin:32px 0 12px;color:#0f172a;font-size:18px;font-weight:800;">${t}</h2>`;

  return `<!doctype html><html><body style="margin:0;background:#f1f5f9;padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
    <div style="background:#0f172a;padding:28px 32px;">
      <p style="margin:0;color:#ffffff;font-size:20px;font-weight:800;">Eagan<span style="color:#f97316;">HVACs</span></p>
      <p style="margin:8px 0 0;color:#cbd5e1;font-size:14px;">Your Minnesota HVAC Buyer's Kit</p>
    </div>
    <div style="padding:28px 32px;">
      <p style="margin:0 0 4px;color:#334155;font-size:15px;line-height:1.6;">Thanks for grabbing the kit. Everything below is yours to use before you talk to a single contractor — print it, screenshot it, bring it to your quotes.</p>

      ${h("✅ The quote-comparison checklist")}
      <p style="margin:0 0 12px;color:#64748b;font-size:14px;">A trustworthy replacement quote should include every one of these:</p>
      <ul style="margin:0;padding:0 0 0 20px;">${li(kitChecklist)}</ul>

      ${h("❓ The exact questions to ask")}
      <ul style="margin:0;padding:0 0 0 20px;">${li(kitQuestions)}</ul>

      ${h("💵 Fair Twin Cities price ranges (installed, before rebates)")}
      <table style="width:100%;border-collapse:collapse;">${priceRows}</table>

      ${h("🏷️ Minnesota rebate cheat sheet")}
      <ul style="margin:0;padding:0 0 0 20px;">${rebateRows}</ul>
      <p style="margin:12px 0 0;color:#64748b;font-size:13px;">Rebate amounts change yearly — always verify current values with your utility.</p>

      <div style="margin:32px 0 8px;text-align:center;">
        <a href="${url}/tools/hvac-quote-analyzer" style="display:inline-block;background:#f97316;color:#0f172a;font-weight:700;font-size:15px;text-decoration:none;padding:14px 28px;border-radius:12px;">Analyze a real quote &rarr;</a>
      </div>
      <p style="margin:16px 0 0;text-align:center;color:#94a3b8;font-size:13px;">Free tools &amp; honest guides at <a href="${url}" style="color:#0f172a;">eaganhvacs.com</a></p>
    </div>
    <div style="padding:18px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;">
      <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.5;">Eagan HVACs helps Minnesota homeowners make smarter heating &amp; cooling decisions. You're receiving this because you requested the Buyer's Kit.</p>
    </div>
  </div>
  </body></html>`;
}
