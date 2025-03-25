import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteLayout } from "@/components/site-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoSearch - Find Your Perfect Used Car",
  description:
    "Search thousands of used cars from trusted dealers and private sellers.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteLayout>
            {modal}
            {children}
          </SiteLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
