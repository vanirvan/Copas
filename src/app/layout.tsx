import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shorten your long URL as eazy as Copy and Paste with COPAS",
  description:
    "URL Shortener service that easy to use, no need to signin, NO ADS and NO TRACKER built in",
  keywords: ["copas", "url", "shortening", "url shortener"],
  authors: { name: "Irvan Maulana Ahmad", url: "https://vanirvan.my.id/" },
  robots: { index: true, follow: true },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL!,
  },
  openGraph: {
    title: "Shorten your long URL as eazy as Copy and Paste with COPAS",
    description:
      "URL Shortener service that easy to use, no need to signin, NO ADS and NO TRACKER built in",
    url: process.env.NEXT_PUBLIC_APP_URL!,
  },
  twitter: {
    title: "Shorten your long URL as eazy as Copy and Paste with COPAS",
    description:
      "URL Shortener service that easy to use, no need to signin, NO ADS and NO TRACKER built in",
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Toaster closeButton />
      </body>
    </html>
  );
}
