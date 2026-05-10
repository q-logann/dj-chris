import Link from "next/link";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import VinylMark from "@/components/VinylMark";
import EqBars from "@/components/EqBars";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Gold horizon — a thin warm seam where the night meets the deck */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 md:grid-cols-12">
        {/* Brand block — vinyl mark slowly spinning beside the wordmark */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-4">
            <VinylMark size={64} spinning />
            <div>
              <p className="font-heading text-3xl italic leading-none tracking-[-0.02em] text-white">
                {BRAND.name}
              </p>
              <p className="mt-1.5 font-body text-xs uppercase tracking-[0.18em] text-white/55">
                {BRAND.serviceAreaShort}
              </p>
            </div>
          </div>
          <p className="mt-6 flex items-center gap-2 font-body text-sm text-white/70">
            <EqBars className="h-3 text-gold" />
            Now booking — showers, restaurants, private events
          </p>
        </div>

        {/* Quick links */}
        <div className="md:col-span-3">
          <p className="font-body text-[11px] uppercase tracking-[0.18em] text-white/55">
            // Quick links
          </p>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-body text-sm text-white/85 transition hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-4">
          <p className="font-body text-[11px] uppercase tracking-[0.18em] text-white/55">
            // Contact
          </p>
          {/* PLACEHOLDER contact info — replace in lib/constants.ts */}
          <ul className="mt-4 space-y-2.5 font-body text-sm text-white/85">
            <li>
              <a
                href={`tel:${BRAND.publicPhone.replace(/\D/g, "")}`}
                className="transition hover:text-white"
              >
                {BRAND.publicPhone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${BRAND.publicEmail}`}
                className="transition hover:text-white"
              >
                {BRAND.publicEmail}
              </a>
            </li>
            <li>
              <span className="text-white/65">{BRAND.instagram}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-6 py-6 font-body text-xs text-white/55 sm:flex-row sm:items-center sm:px-8">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. {BRAND.serviceAreaLine}
          </p>
          <p className="text-white/40">Music for the moments people remember.</p>
        </div>
      </div>
    </footer>
  );
}
