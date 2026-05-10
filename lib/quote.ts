import { PRICING, QUOTE_DISCLAIMER, type EventTypeKey } from "@/lib/constants";
import type { InquiryInput, QuoteResult } from "@/types/inquiry";
import { formatUSD } from "@/lib/format";

export function calculateQuote(
  input: Pick<
    InquiryInput,
    "eventType" | "durationHours" | "guestCount" | "eventDate"
  > & { travelFee?: number }
): QuoteResult {
  const basePrice = PRICING.basePriceByEventType[input.eventType as EventTypeKey];

  // Duration fee — round any partial extra hour UP to the next full hour.
  const extraRaw = Math.max(0, input.durationHours - PRICING.baseHoursIncluded);
  const extraHours = Math.ceil(extraRaw);
  const durationFee = extraHours * PRICING.perExtraHour;

  // Guest count fee.
  const guestFee =
    PRICING.guestTiers.find((t) => input.guestCount <= t.maxGuests)?.fee ?? 0;

  // Rush fee — event within rushWindowDays days from today.
  const rushFee = isRushEvent(input.eventDate) ? PRICING.rushFee : 0;

  const travelFee = input.travelFee ?? PRICING.defaultTravelFee;

  const totalBeforeBuffer =
    basePrice + durationFee + guestFee + rushFee + travelFee;

  const lowEstimate = roundToFive(totalBeforeBuffer);
  let highEstimate = roundToFive(
    totalBeforeBuffer * (1 + PRICING.highEstimateBufferPct)
  );
  if (highEstimate - lowEstimate < PRICING.minimumSpread) {
    highEstimate = lowEstimate + PRICING.minimumSpread;
  }

  const breakdown: string[] = [
    `Base price: ${formatUSD(basePrice)}`,
    extraHours > 0
      ? `Additional hours (${extraHours} × ${formatUSD(PRICING.perExtraHour)}): ${formatUSD(durationFee)}`
      : `Includes up to ${PRICING.baseHoursIncluded} hours of performance.`,
    guestFee > 0
      ? `Guest count adjustment (${input.guestCount} guests): ${formatUSD(guestFee)}`
      : `Guest count (${input.guestCount}): no adjustment.`,
    rushFee > 0
      ? `Short-notice fee (event within ${PRICING.rushWindowDays} days): ${formatUSD(rushFee)}`
      : `No short-notice fee.`,
    travelFee > 0
      ? `Travel: ${formatUSD(travelFee)}`
      : `Travel: included within service area.`,
    `Estimated range: ${formatUSD(lowEstimate)}–${formatUSD(highEstimate)}`,
  ];

  return {
    lowEstimate,
    highEstimate,
    basePrice,
    durationFee,
    guestFee,
    rushFee,
    travelFee,
    totalBeforeBuffer,
    breakdown,
    disclaimer: QUOTE_DISCLAIMER,
  };
}

function isRushEvent(iso: string): boolean {
  const event = new Date(`${iso}T12:00:00Z`).getTime();
  const now = Date.now();
  if (isNaN(event)) return false;
  const days = (event - now) / (1000 * 60 * 60 * 24);
  return days <= PRICING.rushWindowDays && days >= -1;
}

function roundToFive(n: number): number {
  return Math.round(n / 5) * 5;
}
