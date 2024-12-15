// hushh_website/src/app/_components/Navbar.jsx
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <Link href="/" className="brand">
        Hushh Developer API
      </Link>
      <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="nextra-search">
          <input type="search" placeholder="Search documentation…" />
        </div>
        <Link href="/developer-Api/on-boarding" className="login-link">
          
            <img src="/_next/static/media/hushhLogoS.63f82129.svg" alt="hushhLogo" width="34" height="34" />
            <button type="button" className="login-button">LogIn</button>
          
        </Link>
      </div>
      <button type="button" aria-label="Menu" className="nextra-hamburger" onClick={toggleMenu}>
        <svg fill="none" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;