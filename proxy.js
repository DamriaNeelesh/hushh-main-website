import { NextResponse } from "next/server";

export default function proxy(req) {
  if (req.nextUrl.pathname === "/pda") {
    return NextResponse.redirect(new URL("/products/personal-data-agent", req.url));
  }

  if (req.nextUrl.pathname === "/voice") {
    return NextResponse.redirect("https://hushhvoice-2.onrender.com/");
  }

  if (req.nextUrl.pathname === "/hushhwallet") {
    return NextResponse.redirect("https://hushh-wallet-app.vercel.app");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pda", "/voice", "/hushhwallet"],
};
