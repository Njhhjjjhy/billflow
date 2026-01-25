import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans_TC, Space_Mono } from "next/font/google";
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
  title: "Billflow - Bilingual Invoicing for Taiwan Freelancers",
  description: "Create professional bilingual invoices, track payments, and manage clients. Designed for Taiwan tax compliance.",
  keywords: ["invoicing", "Taiwan", "freelancer", "bilingual", "統一發票"],
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
        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {children}
      </body>
    </html>
  );
}
