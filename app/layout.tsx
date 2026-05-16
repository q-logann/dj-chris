import type { Metadata } from "next";
import { Instrument_Serif, Barlow } from "next/font/google";
import { BotIdClient } from "botid/client";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageFade from "@/components/PageFade";
import { SITE_METADATA } from "@/lib/constants";

const botIdProtectedRoutes = [{ path: "/api/inquiry", method: "POST" as const }];

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-heading",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${barlow.variable}`}>
      <head>
        <BotIdClient protect={botIdProtectedRoutes} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:text-black"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          <PageFade>{children}</PageFade>
        </main>
        <Footer />
      </body>
    </html>
  );
}
