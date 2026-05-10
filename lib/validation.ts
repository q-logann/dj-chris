import { EVENT_TYPES, VENUE_TYPES } from "@/lib/constants";
import type { InquiryInput } from "@/types/inquiry";

const validEventKeys = new Set(EVENT_TYPES.map((e) => e.key));
const validVenues = new Set<string>(VENUE_TYPES);

const FIELD_LIMITS = {
  fullName: 80,
  email: 120,
  phone: 30,
  customEventDescription: 500,
  locationCity: 120,
  musicVibe: 500,
  mustPlay: 1000,
  doNotPlay: 500,
  setupNotes: 500,
  parkingNotes: 300,
  indoorOutdoor: 50,
  accessNotes: 500,
  additionalNotes: 1000,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRegex = /^[\d\s().+-]{7,30}$/;

export function validateInquiry(
  raw: unknown
): { ok: true; data: InquiryInput } | { ok: false; fieldErrors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (typeof raw !== "object" || raw === null) {
    return { ok: false, fieldErrors: { _root: "Invalid request body." } };
  }
  const r = raw as Record<string, unknown>;

  // Honeypot: if filled, mark as spam — caller should reject silently.
  if (typeof r.website === "string" && r.website.trim() !== "") {
    return { ok: false, fieldErrors: { _root: "Spam detected." } };
  }

  const fullName = str(r.fullName);
  if (!fullName || fullName.length < 2 || fullName.length > FIELD_LIMITS.fullName) {
    errors.fullName = "Please enter your name (2–80 characters).";
  }

  const email = str(r.email).toLowerCase();
  if (!email || email.length > FIELD_LIMITS.email || !emailRegex.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  const phone = str(r.phone);
  if (!phone || phone.length > FIELD_LIMITS.phone || !phoneRegex.test(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  const eventType = str(r.eventType);
  if (!eventType || !validEventKeys.has(eventType as never)) {
    errors.eventType = "Please choose an event type.";
  }

  const customEventDescription = str(r.customEventDescription);
  if (eventType === "other") {
    if (!customEventDescription) {
      errors.customEventDescription = "Please describe your event.";
    } else if (customEventDescription.length > FIELD_LIMITS.customEventDescription) {
      errors.customEventDescription = "Description is too long.";
    }
  }

  const eventDate = str(r.eventDate);
  if (!eventDate || !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
    errors.eventDate = "Please choose a valid event date.";
  } else {
    const t = new Date(`${eventDate}T12:00:00Z`).getTime();
    if (isNaN(t)) {
      errors.eventDate = "Please choose a valid event date.";
    } else {
      const days = (t - Date.now()) / (1000 * 60 * 60 * 24);
      if (days < -1) errors.eventDate = "Event date appears to be in the past.";
      if (days > 365 * 3) errors.eventDate = "Please choose a date within 3 years.";
    }
  }

  const startTime = str(r.startTime);
  if (!startTime || !/^\d{2}:\d{2}$/.test(startTime)) {
    errors.startTime = "Please choose a start time.";
  }

  const durationHours = num(r.durationHours);
  if (durationHours == null || durationHours < 1 || durationHours > 12) {
    errors.durationHours = "Duration must be between 1 and 12 hours.";
  }

  const venueType = str(r.venueType);
  if (!venueType || !validVenues.has(venueType)) {
    errors.venueType = "Please choose a venue type.";
  }

  const locationCity = str(r.locationCity);
  if (!locationCity || locationCity.length < 2 || locationCity.length > FIELD_LIMITS.locationCity) {
    errors.locationCity = "Please enter a city or location.";
  }

  const guestCount = num(r.guestCount);
  if (guestCount == null || guestCount < 1 || guestCount > 1000 || !Number.isFinite(guestCount)) {
    errors.guestCount = "Guest count must be between 1 and 1000.";
  }

  const optional = {
    musicVibe: capStr(r.musicVibe, FIELD_LIMITS.musicVibe, errors, "musicVibe"),
    mustPlay: capStr(r.mustPlay, FIELD_LIMITS.mustPlay, errors, "mustPlay"),
    doNotPlay: capStr(r.doNotPlay, FIELD_LIMITS.doNotPlay, errors, "doNotPlay"),
    setupNotes: capStr(r.setupNotes, FIELD_LIMITS.setupNotes, errors, "setupNotes"),
    parkingNotes: capStr(r.parkingNotes, FIELD_LIMITS.parkingNotes, errors, "parkingNotes"),
    indoorOutdoor: capStr(r.indoorOutdoor, FIELD_LIMITS.indoorOutdoor, errors, "indoorOutdoor"),
    accessNotes: capStr(r.accessNotes, FIELD_LIMITS.accessNotes, errors, "accessNotes"),
    additionalNotes: capStr(r.additionalNotes, FIELD_LIMITS.additionalNotes, errors, "additionalNotes"),
  };

  if (Object.keys(errors).length > 0) {
    return { ok: false, fieldErrors: errors };
  }

  return {
    ok: true,
    data: {
      fullName,
      email,
      phone,
      eventType: eventType as InquiryInput["eventType"],
      customEventDescription: customEventDescription || undefined,
      eventDate,
      startTime,
      durationHours: durationHours!,
      venueType,
      locationCity,
      guestCount: guestCount!,
      ...optional,
    },
  };
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}
function num(v: unknown): number | null {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return isNaN(n) ? null : n;
  }
  return null;
}
function capStr(
  v: unknown,
  max: number,
  errors: Record<string, string>,
  key: string
): string | undefined {
  const s = str(v);
  if (!s) return undefined;
  if (s.length > max) {
    errors[key] = `Please keep this under ${max} characters.`;
    return s.slice(0, max);
  }
  return s;
}
