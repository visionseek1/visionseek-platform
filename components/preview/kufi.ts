import {Noto_Kufi_Arabic} from "next/font/google";

export const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-kufi",
  adjustFontFallback: true,
  preload: true,
});
