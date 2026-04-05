import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClickUp Brain - AI Super Agents",
  description: "A new era of humans, with AI Super Agents. The world's only human-level AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(jakarta.variable, jetbrainsMono.variable)}>
      <body className="min-h-screen font-[family-name:var(--font-jakarta)] antialiased">
        {children}
      </body>
    </html>
  );
}
