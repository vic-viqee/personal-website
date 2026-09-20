import type { Metadata } from "next";
import { Bangers, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  variable: "--font-heading",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-body",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VL Murimi - Portfolio",
  description: "Victor Lewis Murimi — Developer by day, vigilante coder by night. Comic-book themed portfolio.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${bangers.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}