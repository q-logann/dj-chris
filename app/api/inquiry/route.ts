import { NextResponse } from "next/server";
import { validateInquiry } from "@/lib/validation";
import { calculateQuote } from "@/lib/quote";
import { sendInquiryEmail } from "@/lib/email";
import type { InquiryApiResponse } from "@/types/inquiry";

export const runtime = "nodejs";

export async function POST(req: Request): Promise<NextResponse<InquiryApiResponse>> {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Could not read your submission. Please try again." },
      { status: 400 }
    );
  }

  const validated = validateInquiry(json);
  if (!validated.ok) {
    if (validated.fieldErrors._root === "Spam detected.") {
      // Quietly accept-as-success for honeypot to avoid signaling bots.
      return NextResponse.json(
        { success: false, error: "Thank you." },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: "Please review the highlighted fields and try again.",
        fieldErrors: validated.fieldErrors,
      },
      { status: 400 }
    );
  }

  const quote = calculateQuote(validated.data);
  const emailResult = await sendInquiryEmail(validated.data, quote);

  if (!emailResult.ok) {
    return NextResponse.json(
      {
        success: false,
        error:
          "We couldn't send the inquiry right now. Please try again in a few minutes.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, quote }, { status: 200 });
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } }
  );
}
