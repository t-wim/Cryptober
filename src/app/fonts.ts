import { Bricolage_Grotesque, Inter, IBM_Plex_Mono } from "next/font/google";

export const fontHero = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600","700"],
  variable: "--font-hero",
  display: "swap",
});

export const fontUI = Inter({
  subsets: ["latin"],
  weight: ["400","600","700"],
  variable: "--font-ui",
  display: "swap",
});

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
});