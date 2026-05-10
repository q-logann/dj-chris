import type { EventTypeKey } from "@/lib/constants";

export type InquiryInput = {
  fullName: string;
  email: string;
  phone: string;
  eventType: EventTypeKey;
  customEventDescription?: string;
  eventDate: string;
  startTime: string;
  durationHours: number;
  venueType: string;
  locationCity: string;
  guestCount: number;
  musicVibe?: string;
  mustPlay?: string;
  doNotPlay?: string;
  setupNotes?: string;
  parkingNotes?: string;
  indoorOutdoor?: string;
  accessNotes?: string;
  additionalNotes?: string;
  website?: string;
};

export type QuoteResult = {
  lowEstimate: number;
  highEstimate: number;
  basePrice: number;
  durationFee: number;
  guestFee: number;
  rushFee: number;
  travelFee: number;
  totalBeforeBuffer: number;
  breakdown: string[];
  disclaimer: string;
};

export type InquiryApiResponse =
  | { success: true; quote: QuoteResult }
  | { success: false; error: string; fieldErrors?: Record<string, string> };
