import { Resend } from "resend";
import type { InquiryInput, QuoteResult } from "@/types/inquiry";
import { BRAND, EVENT_TYPES } from "@/lib/constants";
import { formatUSD, formatDateLong, formatTime, escapeHtml } from "@/lib/format";

// PLACEHOLDER — replace with a verified Resend sender once a domain is verified.
// Until then, use Resend's onboarding sender: "DJ Christina <onboarding@resend.dev>"
const FROM_ADDRESS = "DJ Christina Site <onboarding@resend.dev>";

export async function sendInquiryEmail(
  input: InquiryInput,
  quote: QuoteResult
): Promise<{ ok: true } | { ok: false }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.MOM_BOOKING_EMAIL;

  if (!apiKey || !to) {
    console.error("[email] Missing RESEND_API_KEY or MOM_BOOKING_EMAIL");
    return { ok: false };
  }

  const eventLabel =
    EVENT_TYPES.find((e) => e.key === input.eventType)?.label ?? input.eventType;

  const subject = `New ${BRAND.name} Booking Inquiry — ${eventLabel} — Estimated ${formatUSD(quote.lowEstimate)}–${formatUSD(quote.highEstimate)}`;

  const html = renderHtml(input, quote, eventLabel);
  const text = renderText(input, quote, eventLabel);

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: FROM_ADDRESS,
      to,
      replyTo: input.email,
      subject,
      html,
      text,
    });
    if ((result as { error?: unknown }).error) {
      console.error("[email] Resend returned error:", (result as { error: unknown }).error);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    // Never expose Resend errors to the client.
    console.error("[email] Send failed:", err);
    return { ok: false };
  }
}

function renderHtml(input: InquiryInput, quote: QuoteResult, eventLabel: string): string {
  const row = (label: string, value?: string) =>
    value
      ? `<tr><td style="padding:6px 12px 6px 0;color:#4A4742;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#2B2A28;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`
      : "";

  const breakdownItems = quote.breakdown
    .map((b) => `<li style="margin:4px 0;">${escapeHtml(b)}</li>`)
    .join("");

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#FAF6EF;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#2B2A28;">
  <div style="max-width:640px;margin:0 auto;padding:24px;">
    <h1 style="font-size:20px;margin:0 0 4px 0;">New booking inquiry</h1>
    <p style="margin:0 0 20px 0;color:#4A4742;">${escapeHtml(eventLabel)} — ${escapeHtml(formatDateLong(input.eventDate))} at ${escapeHtml(formatTime(input.startTime))}</p>

    <div style="background:#FDFCF8;border:1px solid #E8E3DA;border-radius:14px;padding:16px;margin-bottom:16px;">
      <h2 style="font-size:16px;margin:0 0 8px 0;">Contact</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${row("Name", input.fullName)}
        ${row("Email", input.email)}
        ${row("Phone", input.phone)}
      </table>
    </div>

    <div style="background:#FDFCF8;border:1px solid #E8E3DA;border-radius:14px;padding:16px;margin-bottom:16px;">
      <h2 style="font-size:16px;margin:0 0 8px 0;">Estimated quote</h2>
      <p style="margin:0 0 8px 0;font-size:18px;font-weight:700;">${formatUSD(quote.lowEstimate)} – ${formatUSD(quote.highEstimate)}</p>
      <ul style="padding-left:18px;margin:8px 0;font-size:14px;">${breakdownItems}</ul>
      <p style="font-size:12px;color:#4A4742;margin:8px 0 0 0;">${escapeHtml(quote.disclaimer)}</p>
    </div>

    <div style="background:#FDFCF8;border:1px solid #E8E3DA;border-radius:14px;padding:16px;margin-bottom:16px;">
      <h2 style="font-size:16px;margin:0 0 8px 0;">Event details</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${row("Event type", eventLabel)}
        ${row("Custom description", input.customEventDescription)}
        ${row("Venue type", input.venueType)}
        ${row("Date", formatDateLong(input.eventDate))}
        ${row("Start time", formatTime(input.startTime))}
        ${row("Duration", `${input.durationHours} hours`)}
        ${row("Location / city", input.locationCity)}
        ${row("Guest count", String(input.guestCount))}
        ${row("Indoor / outdoor", input.indoorOutdoor)}
      </table>
    </div>

    <div style="background:#FDFCF8;border:1px solid #E8E3DA;border-radius:14px;padding:16px;">
      <h2 style="font-size:16px;margin:0 0 8px 0;">Music & notes</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${row("Music vibe", input.musicVibe)}
        ${row("Must play", input.mustPlay)}
        ${row("Do not play", input.doNotPlay)}
        ${row("Setup notes", input.setupNotes)}
        ${row("Parking", input.parkingNotes)}
        ${row("Access", input.accessNotes)}
        ${row("Additional notes", input.additionalNotes)}
      </table>
    </div>
  </div>
</body></html>`;
}

function renderText(input: InquiryInput, quote: QuoteResult, eventLabel: string): string {
  const line = (label: string, value?: string) =>
    value ? `${label}: ${value}\n` : "";
  return [
    `New ${BRAND.name} booking inquiry`,
    `${eventLabel} — ${formatDateLong(input.eventDate)} at ${formatTime(input.startTime)}`,
    ``,
    `CONTACT`,
    line("Name", input.fullName),
    line("Email", input.email),
    line("Phone", input.phone),
    ``,
    `ESTIMATED QUOTE: ${formatUSD(quote.lowEstimate)}–${formatUSD(quote.highEstimate)}`,
    quote.breakdown.map((b) => `  - ${b}`).join("\n"),
    ``,
    quote.disclaimer,
    ``,
    `EVENT DETAILS`,
    line("Event type", eventLabel),
    line("Custom description", input.customEventDescription),
    line("Venue type", input.venueType),
    line("Date", formatDateLong(input.eventDate)),
    line("Start time", formatTime(input.startTime)),
    line("Duration", `${input.durationHours} hours`),
    line("Location", input.locationCity),
    line("Guests", String(input.guestCount)),
    line("Indoor/outdoor", input.indoorOutdoor),
    ``,
    `MUSIC & NOTES`,
    line("Music vibe", input.musicVibe),
    line("Must play", input.mustPlay),
    line("Do not play", input.doNotPlay),
    line("Setup notes", input.setupNotes),
    line("Parking", input.parkingNotes),
    line("Access", input.accessNotes),
    line("Additional notes", input.additionalNotes),
  ].join("\n");
}
