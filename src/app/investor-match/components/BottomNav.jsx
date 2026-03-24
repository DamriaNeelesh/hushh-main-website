'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/investor-match/discover', icon: '🔥', label: 'Discover' },
  { href: '/investor-match/connections', icon: '⭐', label: 'Connections' },
  { href: '/investor-match/profile', icon: '👤', label: 'My Profile' },
];

export default function BottomNav() {
  const pathname = usePathname() || "";

  return (
    <nav className="im-bottom-nav" role="navigation" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`im-nav-item ${isActive ? 'im-nav-item--active' : ''}`}
            aria-label={item.label}
          >
            <span className="im-nav-icon">{item.icon}</span>
            <span className="im-nav-label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
