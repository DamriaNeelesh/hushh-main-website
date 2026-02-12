"use client";

import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export default function HushhVaniLayout({ children }) {
  return (
    <div className={`${plusJakarta.variable} font-sans`}>
      {children}
    </div>
  );
}
