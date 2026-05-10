"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND, NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <>
      <GlassHeader />
      {/* On non-home pages there's no full-bleed dark hero for the fixed
          header to overlay, so we add a spacer to push page content below
          the floating pill. */}
      {!isHome && <div aria-hidden="true" className="h-20" />}
    </>
  );
}

/* -------------------------------------------------------------------- */
/* Glass header — sits over the dark cinematic hero on the homepage.    */
/* -------------------------------------------------------------------- */

function GlassHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // `onLight` flips when the user has scrolled past the dark hero +
  // capabilities sections. We then switch to a cream-friendly variant so
  // the nav stays legible over the lower cream sections of the homepage.
  const [onLight, setOnLight] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    // Find the last dark section on the page. The header stays in glass
    // mode while the user is over it, and switches to cream mode the
    // moment they scroll past it. On pages with no dark sections (every
    // route except `/`) the header is in cream mode from the start.
    let boundary = -Infinity;

    const computeBoundary = () => {
      // Look at every dark-themed surface on the page (sections and footer).
      // The header stays in glass mode while the user is over them, and
      // switches to cream mode the moment they scroll past the last one.
      // For the all-dark site, the last dark element is the footer, so the
      // header effectively stays in glass mode the entire time.
      const darkSurfaces = Array.from(
        document.querySelectorAll<HTMLElement>(
          "section.bg-black, footer.bg-black",
        ),
      );
      if (darkSurfaces.length === 0) {
        boundary = -Infinity;
        return;
      }
      const last = darkSurfaces[darkSurfaces.length - 1];
      const rect = last.getBoundingClientRect();
      // Switch ~80px before the bottom so cream content reaches the
      // header pill before we flip styles — avoids a flash of white
      // text on cream during the transition.
      boundary = rect.bottom + window.scrollY - 80;
    };

    const onScroll = () => {
      setOnLight(window.scrollY >= boundary);
    };

    computeBoundary();
    onScroll();

    // Layout can shift after fonts/images/videos load — recompute once
    // things settle so the boundary is accurate.
    const tid = window.setTimeout(() => {
      computeBoundary();
      onScroll();
    }, 200);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", computeBoundary, { passive: true });

    return () => {
      window.clearTimeout(tid);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", computeBoundary);
    };
  }, []);

  // Color tokens swap based on the current background.
  const textPrimary = onLight ? "text-charcoal" : "text-white";
  const textSecondary = onLight ? "text-graphite" : "text-white/90";
  const textHover = onLight ? "hover:text-charcoal" : "hover:text-white";
  const navLinkHoverBg = onLight ? "hover:bg-charcoal/10" : "hover:bg-white/10";
  const navLinkActiveBg = onLight
    ? "bg-charcoal/10 text-charcoal"
    : "bg-white/15 text-white";
  const ctaButton = onLight
    ? "bg-charcoal text-cream hover:bg-graphite"
    : "bg-white text-black hover:bg-white/90";
  const containerBg = onLight
    ? "bg-cream/80 backdrop-blur border border-mist/70"
    : "liquid-glass";
  const containerHover = onLight ? "" : "transition hover:bg-white/[0.04]";

  return (
    <>
      <header className="fixed left-0 right-0 top-4 z-50 px-4 sm:px-8 lg:px-16">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          {/* Left: 48×48 circle with italic serif "c" */}
          <Link
            href="/"
            aria-label={BRAND.name}
            aria-current={isActive("/") ? "page" : undefined}
            className={`group flex h-12 w-12 items-center justify-center rounded-full ${containerBg} ${containerHover}`}
          >
            <span
              className={`font-heading text-2xl italic leading-none transition group-hover:scale-110 ${textPrimary}`}
            >
              c
            </span>
          </Link>

          {/* Center (desktop): pill with nav links */}
          <nav
            aria-label="Primary"
            className={`hidden items-center gap-0.5 rounded-full p-1.5 md:flex ${containerBg}`}
          >
            {NAV_LINKS.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3 py-2 font-body text-sm font-medium transition ${
                    active
                      ? navLinkActiveBg
                      : `${textSecondary} ${textHover} ${navLinkHoverBg}`
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: solid CTA pill (desktop) + circle mobile menu button */}
          <div className="flex items-center gap-2">
            <Link
              href="/quote"
              className={`hidden items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 font-body text-sm font-medium transition md:inline-flex ${ctaButton}`}
            >
              Get a Quote
              <ArrowUpRight className="h-4 w-4 transition-transform" />
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className={`flex h-12 w-12 items-center justify-center rounded-full md:hidden ${containerBg} ${containerHover} ${textPrimary}`}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {open ? (
                  <>
                    <path d="M6 6l12 12" />
                    <path d="M18 6L6 18" />
                  </>
                ) : (
                  <>
                    <path d="M3 6h18" />
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="fixed left-4 right-4 top-20 z-50 md:hidden"
        >
          <ul className={`flex flex-col gap-1 rounded-2xl p-3 ${containerBg}`}>
            {NAV_LINKS.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-full px-4 py-2 font-body text-base transition ${
                      active ? navLinkActiveBg : `${textPrimary} ${navLinkHoverBg}`
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );
}

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
