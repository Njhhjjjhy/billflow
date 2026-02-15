import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans_TC, Space_Mono } from "next/font/google";
import { Navbar, Footer } from "@/components/landing";
import "./globals.css";

// Display font (headings, buttons)
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Body font (Chinese + fallback)
const notoSansTC = Noto_Sans_TC({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// Monospace (numbers, codes)
const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Billflow — Invoicing Built for Taiwan",
  description: "Create bilingual invoices, handle local tax compliance, and get paid faster — all in one tool designed for freelancers like you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${notoSansTC.variable} ${spaceMono.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
