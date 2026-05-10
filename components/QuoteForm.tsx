"use client";
import { useState } from "react";
import FormField from "@/components/FormField";
import QuoteResultCard from "@/components/QuoteResult";
import { EVENT_TYPES, VENUE_TYPES } from "@/lib/constants";
import type { InquiryApiResponse, QuoteResult } from "@/types/inquiry";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  customEventDescription: string;
  eventDate: string;
  startTime: string;
  durationHours: string;
  venueType: string;
  locationCity: string;
  guestCount: string;
  musicVibe: string;
  mustPlay: string;
  doNotPlay: string;
  setupNotes: string;
  parkingNotes: string;
  indoorOutdoor: string;
  accessNotes: string;
  additionalNotes: string;
  website: string;
};

const empty: FormState = {
  fullName: "",
  email: "",
  phone: "",
  eventType: "",
  customEventDescription: "",
  eventDate: "",
  startTime: "",
  durationHours: "3",
  venueType: "",
  locationCity: "",
  guestCount: "",
  musicVibe: "",
  mustPlay: "",
  doNotPlay: "",
  setupNotes: "",
  parkingNotes: "",
  indoorOutdoor: "",
  accessNotes: "",
  additionalNotes: "",
  website: "",
};

export default function QuoteForm() {
  const [state, setState] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setState((s) => ({ ...s, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setGeneralError(null);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...state,
          durationHours: Number(state.durationHours),
          guestCount: Number(state.guestCount),
        }),
      });
      const data = (await res.json()) as InquiryApiResponse;
      if (data.success) {
        setQuote(data.quote);
        setStatus("success");
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setGeneralError(data.error);
        setStatus("error");
      }
    } catch {
      setStatus("error");
      setGeneralError("We couldn't send the inquiry right now. Please try again in a few minutes.");
    }
  }

  if (status === "success" && quote) {
    return (
      <div className="space-y-6">
        <QuoteResultCard quote={quote} />
        <div className="rounded-xl2 border border-mist/70 bg-cream p-6 text-sm text-graphite">
          <p>
            Thanks, <span className="font-medium text-charcoal">{state.fullName.split(" ")[0] || "and welcome"}</span>.
            Your details are on the way to DJ Christina. Most replies come within 1–2 business days.
          </p>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-mist bg-ivory px-3.5 py-2.5 text-sm text-charcoal shadow-sm placeholder:text-graphite/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      {/* Honeypot — hidden from sighted/keyboard users, attractive to bots */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={state.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      {generalError && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {generalError}
        </div>
      )}

      <fieldset className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <legend className="sr-only">Your contact info</legend>

        <FormField id="fullName" label="Full name" required error={errors.fullName}>
          <input id="fullName" type="text" required maxLength={80} value={state.fullName}
            onChange={(e) => set("fullName", e.target.value)} className={inputClass} autoComplete="name" />
        </FormField>

        <FormField id="email" label="Email" required error={errors.email}>
          <input id="email" type="email" required maxLength={120} value={state.email}
            onChange={(e) => set("email", e.target.value)} className={inputClass} autoComplete="email" inputMode="email" />
        </FormField>

        <FormField id="phone" label="Phone number" required error={errors.phone}
          hint="US format — any common style works.">
          <input id="phone" type="tel" required maxLength={30} value={state.phone}
            onChange={(e) => set("phone", e.target.value)} className={inputClass} autoComplete="tel" />
        </FormField>

        <FormField id="locationCity" label="Event location / city" required error={errors.locationCity}>
          <input id="locationCity" type="text" required maxLength={120} value={state.locationCity}
            onChange={(e) => set("locationCity", e.target.value)} className={inputClass}
            placeholder="e.g., Lawrenceville, GA" />
        </FormField>
      </fieldset>

      <fieldset className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <legend className="sr-only">Event basics</legend>

        <FormField id="eventType" label="Event type" required error={errors.eventType}>
          <select id="eventType" required value={state.eventType}
            onChange={(e) => set("eventType", e.target.value)} className={inputClass}>
            <option value="">Choose an event type…</option>
            {EVENT_TYPES.map((e) => (
              <option key={e.key} value={e.key}>{e.label}</option>
            ))}
          </select>
        </FormField>

        <FormField id="venueType" label="Venue type" required error={errors.venueType}>
          <select id="venueType" required value={state.venueType}
            onChange={(e) => set("venueType", e.target.value)} className={inputClass}>
            <option value="">Choose a venue type…</option>
            {VENUE_TYPES.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </FormField>

        {state.eventType === "other" && (
          <div className="sm:col-span-2">
            <FormField id="customEventDescription" label="Tell us about your event" required
              error={errors.customEventDescription}
              hint="A sentence or two — what is this and what's the vibe?">
              <textarea id="customEventDescription" required maxLength={500} rows={3}
                value={state.customEventDescription}
                onChange={(e) => set("customEventDescription", e.target.value)} className={inputClass} />
            </FormField>
          </div>
        )}

        <FormField id="eventDate" label="Event date" required error={errors.eventDate}>
          <input id="eventDate" type="date" required value={state.eventDate}
            onChange={(e) => set("eventDate", e.target.value)} className={inputClass} />
        </FormField>

        <FormField id="startTime" label="Start time" required error={errors.startTime}>
          <input id="startTime" type="time" required value={state.startTime}
            onChange={(e) => set("startTime", e.target.value)} className={inputClass} />
        </FormField>

        <FormField id="durationHours" label="Estimated duration (hours)" required error={errors.durationHours}>
          <input id="durationHours" type="number" required min={1} max={12} step={0.5}
            value={state.durationHours} onChange={(e) => set("durationHours", e.target.value)} className={inputClass} />
        </FormField>

        <FormField id="guestCount" label="Estimated guest count" required error={errors.guestCount}>
          <input id="guestCount" type="number" required min={1} max={1000} value={state.guestCount}
            onChange={(e) => set("guestCount", e.target.value)} className={inputClass} inputMode="numeric" />
        </FormField>
      </fieldset>

      <fieldset className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <legend className="text-sm font-semibold text-charcoal">Music & notes (optional)</legend>

        <FormField id="musicVibe" label="Music style / vibe">
          <input id="musicVibe" type="text" maxLength={500} value={state.musicVibe}
            onChange={(e) => set("musicVibe", e.target.value)} className={inputClass}
            placeholder="e.g., warm soul + a little Motown" />
        </FormField>

        <FormField id="indoorOutdoor" label="Indoor / outdoor">
          <input id="indoorOutdoor" type="text" maxLength={50} value={state.indoorOutdoor}
            onChange={(e) => set("indoorOutdoor", e.target.value)} className={inputClass}
            placeholder="Indoor, outdoor, or both" />
        </FormField>

        <div className="sm:col-span-2">
          <FormField id="mustPlay" label="Must-play songs">
            <textarea id="mustPlay" rows={2} maxLength={1000} value={state.mustPlay}
              onChange={(e) => set("mustPlay", e.target.value)} className={inputClass} />
          </FormField>
        </div>

        <div className="sm:col-span-2">
          <FormField id="doNotPlay" label="Do-not-play songs">
            <textarea id="doNotPlay" rows={2} maxLength={500} value={state.doNotPlay}
              onChange={(e) => set("doNotPlay", e.target.value)} className={inputClass} />
          </FormField>
        </div>

        <FormField id="setupNotes" label="Setup notes">
          <textarea id="setupNotes" rows={2} maxLength={500} value={state.setupNotes}
            onChange={(e) => set("setupNotes", e.target.value)} className={inputClass} />
        </FormField>

        <FormField id="parkingNotes" label="Parking notes">
          <textarea id="parkingNotes" rows={2} maxLength={300} value={state.parkingNotes}
            onChange={(e) => set("parkingNotes", e.target.value)} className={inputClass} />
        </FormField>

        <FormField id="accessNotes" label="Stairs / elevator / access notes">
          <textarea id="accessNotes" rows={2} maxLength={500} value={state.accessNotes}
            onChange={(e) => set("accessNotes", e.target.value)} className={inputClass} />
        </FormField>

        <FormField id="additionalNotes" label="Anything else we should know?">
          <textarea id="additionalNotes" rows={2} maxLength={1000} value={state.additionalNotes}
            onChange={(e) => set("additionalNotes", e.target.value)} className={inputClass} />
        </FormField>
      </fieldset>

      <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-charcoal px-7 py-3 text-sm font-medium text-cream transition hover:bg-graphite disabled:cursor-not-allowed disabled:bg-graphite/60"
        >
          {status === "submitting" ? "Sending…" : "Get my approximate quote"}
        </button>
        <p className="text-xs text-graphite">No spam. Your info goes only to DJ Christina.</p>
      </div>
    </form>
  );
}
