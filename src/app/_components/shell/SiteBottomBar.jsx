"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    label: "Home",
    href: "/",
    icon: (
      <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Agents",
    href: "/agents",
    icon: (
      <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
    ),
  },
  {
    label: "Comm",
    href: "/hushh-community",
    icon: (
      <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Profile",
    href: "/login",
    icon: (
      <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

function navClass(isActive) {
  return [
    "flex flex-col items-center gap-1 group",
    isActive ? "text-white" : "text-white/60 hover:text-white",
  ].join(" ");
}

export default function SiteBottomBar() {
  const pathname = usePathname() || "";

  return (
    <nav data-site-bottom-bar className="floating-nav" aria-label="Primary site navigation">
      {items.slice(0, 2).map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link key={item.label} className={navClass(isActive)} href={item.href}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-white/10">
              {item.icon}
            </div>
            <span className="text-[8px] font-bold tracking-widest uppercase">{item.label}</span>
          </Link>
        );
      })}

      <div className="relative -top-6" aria-hidden="true">
        <Link href="/" className="block">
          <div className="w-14 h-14 bg-gradient-to-tr from-yukonGold to-[#E5D2A0] rounded-full border-4 border-deepNavy flex items-center justify-center shadow-lg">
            <div className="w-8 h-8 rounded-full bg-richBlack flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">H</span>
            </div>
          </div>
        </Link>
      </div>

      {items.slice(2).map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link key={item.label} className={navClass(isActive)} href={item.href}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-white/10">
              {item.icon}
            </div>
            <span className="text-[8px] font-bold tracking-widest uppercase">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
