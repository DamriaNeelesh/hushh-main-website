// app/_utilities/fonts.js
import { Figtree } from "next/font/google";

export const figtree = Figtree({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});
