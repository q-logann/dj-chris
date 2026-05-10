import Link from "next/link";
import { BRAND, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-mist/70 bg-ivory">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3 sm:px-8">
        <div>
          <p className="font-serif text-lg text-charcoal">{BRAND.name}</p>
          <p className="mt-2 text-sm text-graphite">{BRAND.serviceAreaShort}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-graphite">Quick links</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-charcoal hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-graphite">Contact</p>
          {/* PLACEHOLDER contact info — replace in lib/constants.ts */}
          <ul className="mt-3 space-y-1.5 text-sm text-charcoal">
            <li>{BRAND.publicPhone}</li>
            <li>{BRAND.publicEmail}</li>
            <li>{BRAND.instagram}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-mist/70">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-graphite sm:px-8">
          © {new Date().getFullYear()} {BRAND.name}. {BRAND.serviceAreaLine}
        </div>
      </div>
    </footer>
  );
}
