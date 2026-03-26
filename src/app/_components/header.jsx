"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import HushhWalletIcon from "./svg/hushhWalletIcon";
import HushhButtonIcon from "./svg/hushhButton";
import VibeSearchIcon from "./svg/vibeSearch";
import { SearchIcon } from "@chakra-ui/icons";
import ChromeExtentionLogo from "./svg/ChromeExtensionLogo";
import ValetChat from "./svg/valetChat";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { CloseIcon, HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/AuthContext";
import UserAvatar from "./auth/UserAvatar";
import HushhNewLogo from "../../../public/svgs/hushh_new_logo.svg";
import { useHushhIdFlow } from "../hooks/useHushhIdFlow";
import HushhFlow from "../_components/svg/icons/flowLogo.svg";
import HushhGrid from "../_components/svg/icons/girdLogo.svg";
import HushhLink from "../_components/svg/icons/linkLogo.svg";
import HushhVault from "../_components/svg/icons/vaultLogo.svg";
import HushhPDA from "../_components/svg/icons/pdaLogo.svg";
import HushhVoice from "../_components/svg/icons/vaultLogo.svg";
import SearchModal from "./features/SearchModal";

export default function Header({ borderBottom: _borderBottom, topOffset = 0 }) {
  const mobileMenuOffset = typeof topOffset === "number"
    ? `${70 + topOffset}px`
    : `calc(70px + ${topOffset})`;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure();

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onSearchOpen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSearchOpen]);

  const noHeaderPaths = ['/vivaConnect', '/viva-connect', '/viva-connect/qrPage', '/qrCodePage'];
  const shouldShowHeader = !noHeaderPaths.includes(pathname);

  // Auth context
  const { isAuthenticated, user, loading, signOut } = useAuth();
  const toast = useToast();

  // Use our reusable authentication flow hook for consistent user status checking
  const { navigateToProfile } = useHushhIdFlow();

  // Handle sign out for mobile
  const handleSignOut = async () => {
    try {
      setIsMenuOpen(false);
      await signOut();
      router.push('/');

      setTimeout(() => {
        toast({
          title: "✅ Signed out successfully",
          description: "You have been signed out of your account.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      }, 100);

    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Sign out error",
        description: "There was an error signing out. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    }
  };

  const handleMenuIconToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMenuOpen) {
      setActiveDropdown(null);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  let menuRef = useRef();
  let hamburgerRef = useRef();
  const closeDropdownTimeoutRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      // Check if click is on a dropdown item (Link)
      const isDropdownLink = e.target.closest('a[href]');
      const isDropdownMenu = e.target.closest('.dropdown-menu');

      // Don't close if clicking on:
      // 1. Hamburger button or inside mobile menu
      // 2. Dropdown link (let navigation happen first)
      // 3. Inside dropdown menu
      if (!menuRef.current?.contains(e.target) &&
      !hamburgerRef.current?.contains(e.target) &&
      !isDropdownLink &&
      !isDropdownMenu) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // Dropdown menu data
  const menuItems = {
    products: {
      title: "Products",
      items: [
      {
        name: "Agent Kai",
        description: "Your Explainable Investing Copilot",
        href: "/products/kai",
        icon: HushhPDA
      },
      {
        name: "Hushh Vault",
        description: "Secure personal data storage and management",
        href: "/hushh-vault",
        icon: HushhVault
      },
      {
        name: "Hushh Link",
        description: "Connect and share data seamlessly",
        href: "/hushh-link",
        icon: HushhLink
      },
      {
        name: "Hushh Flow",
        description: "Streamline your data workflows",
        href: "/products/hushh-flow",
        icon: HushhFlow
      },
      {
        name: "Hushh Grid",
        description: "Visualize and organize your data",
        href: "/products/hushh-grid",
        icon: HushhGrid
      },
      {
        name: "Hushh Voice",
        description: "Your private, consent-first AI copilot",
        href: "/hushh-voice",
        icon: HushhVoice
      }]

    },
    solutions: {
      title: "Solutions",
      items: [
      {
        name: "Hushh Wallet App",
        description: "Your personal data vault. Organize, control, and monetize your information",
        href: "/products/hushh-wallet-app",
        icon: HushhWalletIcon
      },
      {
        name: "Hushh Button",
        description: "Seamlessly share your preferences with brands for personalized experiences",
        href: "/products/hushh-button",
        icon: HushhButtonIcon
      },
      {
        name: "Hushh Browser Companion",
        description: "Track and manage your online browsing data, building a complete digital profile",
        href: "/products/browser-companion",
        icon: ChromeExtentionLogo
      },
      {
        name: "VIBE Search App",
        description: "Discover products you love with image-based search and AI recommendations",
        href: "/products/hushh-vibe-search",
        icon: VibeSearchIcon
      },
      {
        name: "Hushh For Students",
        description: "Rewards & empowers students with data control (safe & secure)",
        href: "/products/hushh-for-students",
        icon: ValetChat
      }]

    },
    developers: {
      title: "API Reference",
      items: [
      {
        name: "API Reference",
        description: "Start at the developer hub and choose Agent Kai or Agentic APIs",
        href: "/developers"
      },
      {
        name: "Agent Kai API",
        description: "PKM, consent, REST, and MCP runtime guidance",
        href: "/developers/agent-kai"
      },
      {
        name: "Agentic APIs",
        description: "A2A, MuleSoft, browser-proxy, and enrichment flows",
        href: "/developers/agentic-apis"
      },
      {
        name: "Developer Console Setup",
        description: "Complete profile setup, API key, session token, and validation",
        href: "/developers/on-boarding"
      },
      {
        name: "Support",
        description: "Troubleshooting and escalation guidance",
        href: "/developers/support"
      }]

    },
    whyHushh: {
      title: "Why Hushh?",
      items: [
      {
        name: "Our Philosophy",
        description: "Understanding our core beliefs",
        href: "/why-hushh"
      },
      {
        name: "Privacy Manifesto",
        description: "Our commitment to your privacy",
        href: "/privacy"
      },
      {
        name: "Terms of Use",
        description: "The legal terms governing our website and services",
        href: "/terms"
      },
      {
        name: "Consent Protocol",
        description: "How we handle your consent",
        href: "/consent-ai-protocol"
      }]

    },
    community: {
      title: "Community",
      items: [
      {
        name: "Agent Builders Club",
        description: "Join our developer community",
        href: "/hushh-community"
      },
      {
        name: "Solutions",
        description: "Delivering tailored IT services that meets the rigorous demands of modern business",
        href: "/solutions"
      },
      {
        name: "Hackathons",
        description: "Build the future with us",
        href: "/pda/iithackathon"
      }]


    },
    company: {
      title: "Company",
      items: [
      {
        name: "About",
        description: "Learn about our mission",
        href: "/about"
      },
      {
        name: "Contact",
        description: "Get in touch with us",
        href: "/contact-us"
      },
      {
        name: "Careers",
        description: "Join our team",
        href: "/career"
      },
      {
        name: "Blogs",
        description: "Latest news and insights",
        href: "/hushhBlogs"
      },
      {
        name: "FAQ",
        description: "Frequently asked questions",
        href: "/frequently-asked-questions"
      }]

    }
  };

  // Hover intent utilities for desktop dropdowns
  const openDropdown = (menuKey) => {
    if (closeDropdownTimeoutRef.current) {
      clearTimeout(closeDropdownTimeoutRef.current);
      closeDropdownTimeoutRef.current = null;
    }
    setActiveDropdown(menuKey);
  };

  const closeDropdowns = () => {
    if (closeDropdownTimeoutRef.current) {
      clearTimeout(closeDropdownTimeoutRef.current);
      closeDropdownTimeoutRef.current = null;
    }
    setActiveDropdown(null);
  };

  const toggleDropdown = (menuKey) => {
    if (activeDropdown === menuKey) {
      closeDropdowns();
      return;
    }
    openDropdown(menuKey);
  };

  const scheduleCloseDropdown = () => {
    if (closeDropdownTimeoutRef.current) {
      clearTimeout(closeDropdownTimeoutRef.current);
    }
    closeDropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleDesktopDropdownBlur = (event) => {
    const nextFocused = event.relatedTarget;
    if (!event.currentTarget.contains(nextFocused)) {
      scheduleCloseDropdown();
    }
  };

  const handleDesktopDropdownKeyDown = (event, menuKey) => {
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      openDropdown(menuKey);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeDropdowns();
    }
  };

  useEffect(() => {
    return () => {
      if (closeDropdownTimeoutRef.current) {
        clearTimeout(closeDropdownTimeoutRef.current);
      }
    };
  }, []);

  const renderDropdownMenu = (menuKey, menuData) => {
    // Check if this is the solutions or products dropdown to apply grid layout
    const isSolutionsDropdown = menuKey === 'solutions';
    const isProductsDropdown = menuKey === 'products';

    return (
      <div
        id={`desktop-menu-${menuKey}`}
        className="dropdown-menu absolute top-full left-0 bg-white shadow-2xl border border-gray-100 z-50 rounded-2xl mt-2"
        style={{
          animation: "fadeInDown 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          minWidth: isSolutionsDropdown ? "800px" : isProductsDropdown ? "600px" : "280px",
          maxWidth: isSolutionsDropdown ? "900px" : isProductsDropdown ? "700px" : "380px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12), 0 8px 25px rgba(0, 0, 0, 0.08)",
          backdropFilter: "blur(20px)"
        }}
        role="menu"
        aria-label={menuData.title}
        onMouseEnter={() => openDropdown(menuKey)}
        onMouseLeave={scheduleCloseDropdown}>
        
          {/* Dropdown Arrow */}
          <div
          className="absolute -top-2 left-6 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45"
          style={{
            filter: "drop-shadow(0 -2px 4px rgba(0, 0, 0, 0.02))"
          }}>
        </div>
          
          <div className="relative bg-white rounded-2xl overflow-hidden">
            <div className="px-4 py-4">
              <div className={
            isSolutionsDropdown ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" :
            isProductsDropdown ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" :
            "space-y-1"
            }>
                {menuData.items.map((item, index) =>
              <Link
                key={`${menuKey}-${item.href}`}
                href={item.href}
                role="menuitem"
                className="group block cursor-pointer rounded-xl p-3 transition-all duration-200 hover:bg-gradient-to-r hover:from-[rgba(248,246,241,0.94)] hover:to-[rgba(232,224,209,0.72)] hover:shadow-sm dropdown-item"
                onClick={() => {
                  closeDropdowns();
                }}>
                
                    <div className={
                isSolutionsDropdown ? "flex flex-col items-start text-left space-y-2" :
                isProductsDropdown ? "flex flex-col items-start text-left space-y-2" :
                "flex items-center space-x-3"
                }>
                      {/* Show icons for products and other dropdowns (not solutions) */}
                      {item.icon && menuKey !== 'solutions' &&
                  <div className="flex-shrink-0">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 transition-all duration-200 group-hover:from-[rgba(248,246,241,0.92)] group-hover:to-[rgba(232,224,209,0.88)]">
                            <Image
                        src={item.icon}
                        alt={item.name}
                        width={16}
                        height={16}
                        className="w-4 h-4"
                        style={{ borderRadius: '20%' }}
                        onError={(e) => {
                          console.log('Image load error:', item.name, item.icon);
                          e.target.style.display = 'none';
                        }} />
                      
                          </div>
                        </div>
                  }
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-[#171b29] transition-colors duration-200">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 leading-relaxed group-hover:text-gray-600 transition-colors duration-200">
                          {item.description}
                        </div>
                        
                      </div>
                     
                    </div>
                  </Link>
              )}
              </div>
            </div>
          </div>
        </div>);

  };

  const renderMobileMenuItems = (menuKey, items) =>
  <div className="mt-3 space-y-3 pl-4">
      {items.map((item) =>
    <Link
      key={`${menuKey}-${item.href}`}
      href={item.href}
      onClick={() => {
        setIsMenuOpen(false);
        closeDropdowns();
      }}
      className="block mobile-menu-item">
      
          <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            {item.icon ?
        <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Image
              src={item.icon}
              alt={item.name}
              width={16}
              height={16}
              className="w-4 h-4"
              style={{ borderRadius: "20%" }} />
            
                </div>
              </div> :
        null}
            <div>
              <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.description}</p>
            </div>
          </div>
        </Link>
    )}
    </div>;


  return (
    <>
      {shouldShowHeader &&
      <div>
          {/* Apple-style Header */}
          <header
          className="bg-white bg-opacity-95 backdrop-blur-xl border-b border-gray-200 sticky top-0 left-0 right-0 z-50"
          style={{
            height: "70px",
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "saturate(180%) blur(20px)",
            zIndex: 1000,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)"
          }}>
          
            <div className="w-full mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 2xl:px-12">
              <div
              className="flex items-center justify-between"
              style={{
                height: "70px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%"
              }}>
              
                {/* Logo */}
                <div className="flex-shrink-0 mr-4 h-full flex items-center">
                  <Link href="/" className="flex items-center">
                    <Image
                    src={HushhNewLogo}
                    alt="Hushh Logo"
                    width={210}
                    height={68}
                    priority
                    className="block h-12 w-auto sm:h-[60px] lg:h-[66px]" />
                  
                  </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="desktop-nav hidden lg:flex items-center space-x-3 xl:space-x-5 2xl:space-x-6 flex-1 justify-center max-w-5xl mx-auto">
                  {/* Products Dropdown */}
                  <div
                  className="relative group"
                  onMouseEnter={() => openDropdown('products')}
                  onMouseLeave={scheduleCloseDropdown}
                  onFocus={() => openDropdown('products')}
                  onBlur={handleDesktopDropdownBlur}>
                  
                    <button
                    type="button"
                    aria-expanded={activeDropdown === 'products'}
                    aria-controls="desktop-menu-products"
                    onClick={() => toggleDropdown('products')}
                    onKeyDown={(event) => handleDesktopDropdownKeyDown(event, 'products')}
                    className="text-gray-800 text-xs lg:text-sm xl:text-sm font-medium hover:text-[#171b29] transition-colors duration-200 flex items-center space-x-1 py-4 px-2 xl:px-3 nav-button whitespace-nowrap">
                    
                      <span>Products</span>
                      <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === 'products' && renderDropdownMenu('products', menuItems.products)}
                  </div>
 
                  {/* Solutions Dropdown */}
                  <div
                  className="relative group"
                  onMouseEnter={() => openDropdown('solutions')}
                  onMouseLeave={scheduleCloseDropdown}
                  onFocus={() => openDropdown('solutions')}
                  onBlur={handleDesktopDropdownBlur}>
                  
                    <button
                    type="button"
                    aria-expanded={activeDropdown === 'solutions'}
                    aria-controls="desktop-menu-solutions"
                    onClick={() => toggleDropdown('solutions')}
                    onKeyDown={(event) => handleDesktopDropdownKeyDown(event, 'solutions')}
                    className="text-gray-800 text-xs lg:text-sm xl:text-sm font-medium hover:text-[#171b29] transition-colors duration-200 flex items-center space-x-1 py-4 px-2 xl:px-3 nav-button whitespace-nowrap">
                    
                      <span>Solutions</span>
                      <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === 'solutions' && renderDropdownMenu('solutions', menuItems.solutions)}
                  </div>

                  {/* Hushh Labs Direct Link */}
 <div className="relative group">
                    <Link
                    href="/labs"
                    className="text-gray-800 text-xs lg:text-sm xl:text-sm font-medium hover:text-[#171b29] transition-colors duration-200 py-4 px-2 xl:px-3 nav-button whitespace-nowrap inline-flex">
                    
                      <span>Hushh Labs</span>
                    </Link>
                  </div>

                  {/* Developers Dropdown */}
                  <div
                  className="relative group"
                  onMouseEnter={() => openDropdown('developers')}
                  onMouseLeave={scheduleCloseDropdown}
                  onFocus={() => openDropdown('developers')}
                  onBlur={handleDesktopDropdownBlur}>
                  
                    <button
                    type="button"
                    aria-expanded={activeDropdown === 'developers'}
                    aria-controls="desktop-menu-developers"
                    onClick={() => toggleDropdown('developers')}
                    onKeyDown={(event) => handleDesktopDropdownKeyDown(event, 'developers')}
                    className="text-gray-800 text-xs lg:text-sm xl:text-sm font-medium hover:text-[#171b29] transition-colors duration-200 flex items-center space-x-1 py-4 px-2 xl:px-3 nav-button whitespace-nowrap">
                    
                      <span>API Reference</span>
                      <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'developers' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === 'developers' && renderDropdownMenu('developers', menuItems.developers)}
                  </div>

                  {/* Why Hushh Dropdown */}
                  <div
                  className="relative group"
                  onMouseEnter={() => openDropdown('whyHushh')}
                  onMouseLeave={scheduleCloseDropdown}
                  onFocus={() => openDropdown('whyHushh')}
                  onBlur={handleDesktopDropdownBlur}>
                  
                    <button
                    type="button"
                    aria-expanded={activeDropdown === 'whyHushh'}
                    aria-controls="desktop-menu-whyHushh"
                    onClick={() => toggleDropdown('whyHushh')}
                    onKeyDown={(event) => handleDesktopDropdownKeyDown(event, 'whyHushh')}
                    className="text-gray-800 text-xs lg:text-sm xl:text-sm font-medium hover:text-[#171b29] transition-colors duration-200 flex items-center space-x-1 py-4 px-2 xl:px-3 nav-button whitespace-nowrap">
                    
                      <span>Why Hushh?</span>
                      <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'whyHushh' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === 'whyHushh' && renderDropdownMenu('whyHushh', menuItems.whyHushh)}
                  </div>

                  {/* Community Dropdown */}
                  <div
                  className="relative group"
                  onMouseEnter={() => openDropdown('community')}
                  onMouseLeave={scheduleCloseDropdown}
                  onFocus={() => openDropdown('community')}
                  onBlur={handleDesktopDropdownBlur}>
                  
                    <button
                    type="button"
                    aria-expanded={activeDropdown === 'community'}
                    aria-controls="desktop-menu-community"
                    onClick={() => toggleDropdown('community')}
                    onKeyDown={(event) => handleDesktopDropdownKeyDown(event, 'community')}
                    className="text-gray-800 text-xs lg:text-sm xl:text-sm font-medium hover:text-[#171b29] transition-colors duration-200 flex items-center space-x-1 py-4 px-2 xl:px-3 nav-button whitespace-nowrap">
                    
                      <span>Community</span>
                      <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'community' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === 'community' && renderDropdownMenu('community', menuItems.community)}
                  </div>

                  {/* Company Dropdown */}
                  <div
                  className="relative group"
                  onMouseEnter={() => openDropdown('company')}
                  onMouseLeave={scheduleCloseDropdown}
                  onFocus={() => openDropdown('company')}
                  onBlur={handleDesktopDropdownBlur}>
                  
                    <button
                    type="button"
                    aria-expanded={activeDropdown === 'company'}
                    aria-controls="desktop-menu-company"
                    onClick={() => toggleDropdown('company')}
                    onKeyDown={(event) => handleDesktopDropdownKeyDown(event, 'company')}
                    className="text-gray-800 text-xs lg:text-sm xl:text-sm font-medium hover:text-[#171b29] transition-colors duration-200 flex items-center space-x-1 py-4 px-2 xl:px-3 nav-button whitespace-nowrap">
                    
                      <span>Company</span>
                      <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'company' ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === 'company' && renderDropdownMenu('company', menuItems.company)}
                  </div>

                 

                </nav>

                {/* Right side - Auth & CTA */}
                <div className="flex h-full items-center space-x-2 lg:space-x-3 xl:space-x-4 ml-4">
                  {/* Search Icon */}
                  <button
                  onClick={(e) => {e.preventDefault();e.stopPropagation();onSearchOpen();}}
                  className="group relative self-center flex h-10 w-10 items-center justify-center p-0 leading-none rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  style={{ marginBottom: 0 }}
                  aria-label="Search (⌘K)"
                  type="button"
                  title="Search (⌘K)">
                  
                    <SearchIcon className="w-5 h-5 text-gray-600 hover:text-gray-800 transition-colors duration-200" />
                    
                    {/* Tooltip */}
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      Search ⌘K
                    </div>
                  </button>

                  {/* Desktop Auth */}
                  <div className="desktop-auth hidden lg:flex items-center space-x-2 xl:space-x-3">
                    {loading ?
                  <div className="w-6 h-6 animate-pulse bg-gray-300 rounded-full"></div> :
                  isAuthenticated ?
                  <UserAvatar /> :

                  <Button
                    onClick={() => router.push('/login')}
                    bg="transparent"
                    color="gray.800"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="8px"
                    px={{ base: 3, xl: 5 }}
                    py={2}
                    fontSize={{ base: "xs", xl: "sm" }}
                    fontWeight={500}
                    height="40px"
                    _hover={{
                      bg: "gray.50",
                      borderColor: "gray.400"
                    }}
                    _active={{
                      transform: "scale(0.98)"
                    }}
                    transition="all 0.2s">
                    
                        Sign In
                      </Button>
                  }
                  </div>

                  {/* Mobile menu button */}
                  <button
                  ref={hamburgerRef}
                  onClick={handleMenuIconToggle}
                  className="mobile-menu-trigger lg:hidden relative self-center flex h-10 w-10 items-center justify-center p-0 leading-none bg-transparent border-0 shadow-none rounded-none transition-transform duration-200 hover:shadow-none active:scale-95"
                  style={{ marginBottom: 0 }}
                  type="button"
                  aria-label="Toggle mobile menu">
                  
                    {isMenuOpen ?
                  <CloseIcon className="w-6 h-6 text-gray-700" /> :

                  <HamburgerIcon className="w-6 h-6 text-gray-700" />
                  }
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Mobile Menu Overlay */}
          {isMenuOpen &&
        <div
          className="lg:hidden fixed"
          style={{
            position: "fixed",
            top: mobileMenuOffset,
            left: "0",
            right: "0",
            bottom: "0",
            width: "100vw",
            height: `calc(100vh - ${mobileMenuOffset})`,
            zIndex: 9999,
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px) saturate(180%)",
            animation: "slideInUp 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            overflow: "auto"
          }}
          ref={menuRef}>
          
              <div className="h-full overflow-y-auto custom-scrollbar">
                {/* Mobile Menu Content */}
                <div className="px-6 py-6">
                    {/* Close button for mobile menu */}
                    {/* <div className="flex justify-end mb-4 lg:hidden">
                 <button
                   onClick={() => setIsMenuOpen(false)}
                   className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                   aria-label="Close menu"
                 >
                   <CloseIcon className="w-5 h-5 text-gray-600" />
                 </button>
                </div> */}
                  {/* Authentication Section */}
                  {!loading &&
              <div className="mb-6 pb-4 border-b border-gray-200">
                      {isAuthenticated && user ?
                <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <UserAvatar
                      user={user}
                      size="sm"
                      className="w-10 h-10" />
                    
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {user.user_metadata?.name || user.email || 'User'}
                              </p>
                              {/* <p className="text-xs text-gray-500">
                         {user.email}
                        </p> */}
                  </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigateToProfile();
                    }}
                    className="text-sm text-black-600 hover:text-black-700 font-medium">
                    
                            View Profile
                          </button>
                          <button
                    onClick={handleSignOut}
                    className="text-sm text-red-600 hover:text-red-700 font-medium">
                    
                            Sign Out
                          </button>
                          
                        </div> :

                <div className="flex space-x-3">
                          {/* <button
                     onClick={() => {
                       setIsMenuOpen(false);
                       navigateToRegistration();
                     }}
                     className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                     Sign Up
                    </button> */}
                          <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigateToProfile();
                    }}
                    className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    
                            Sign In
                          </button>
                        </div>
                }
                    </div>
              }

                  {/* Navigation Menu */}
                  <div className="space-y-6">
                    {/* Products Section */}
                    <div className="mobile-menu-section">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
                    className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 py-2">
                    
                        <span>Products</span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === 'products' &&
                  renderMobileMenuItems("products", menuItems.products.items)
                  }
                    </div>

                    {/* Solutions Section */}
                    <div className="mobile-menu-section">
                      <button
                    onClick={() => setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')}
                    className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 py-2">
                    
                        <span>Solutions</span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === 'solutions' &&
                  renderMobileMenuItems("solutions", menuItems.solutions.items)
                  }
                    </div>

                    {/* Hushh Labs Section */}
                    <div className="mobile-menu-section">
                      <Link
                    href="/labs"
                    onClick={() => {
                      setIsMenuOpen(false);
                      closeDropdowns();
                    }}
                    className="block py-2">
                    
                        <div className="text-lg font-semibold text-gray-900 hover:text-[#171b29] transition-colors">
                          Hushh Labs
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Advanced AI research and development
                        </div>
                      </Link>
                    </div>

                    {/* Developers Section */}
                    <div className="mobile-menu-section">
                      <button
                    onClick={() => setActiveDropdown(activeDropdown === 'developers' ? null : 'developers')}
                    className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 py-2">
                    
                        <span>API Reference</span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${activeDropdown === 'developers' ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === 'developers' &&
                  renderMobileMenuItems("developers", menuItems.developers.items)
                  }
                    </div>

                    {/* Why Hushh Section */}
                    <div className="mobile-menu-section">
                      <button
                    onClick={() => setActiveDropdown(activeDropdown === 'whyHushh' ? null : 'whyHushh')}
                    className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 py-2">
                    
                        <span>Why Hushh?</span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${activeDropdown === 'whyHushh' ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === 'whyHushh' &&
                  renderMobileMenuItems("whyHushh", menuItems.whyHushh.items)
                  }
                    </div>

                    {/* Community Section */}
                    <div className="mobile-menu-section">
                      <button
                    onClick={() => setActiveDropdown(activeDropdown === 'community' ? null : 'community')}
                    className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 py-2">
                    
                        <span>Community</span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${activeDropdown === 'community' ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === 'community' &&
                  renderMobileMenuItems("community", menuItems.community.items)
                  }
                    </div>

                    {/* Company Section */}
                    <div className="mobile-menu-section">
                      <button
                    onClick={() => setActiveDropdown(activeDropdown === 'company' ? null : 'company')}
                    className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 py-2">
                    
                        <span>Company</span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${activeDropdown === 'company' ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === 'company' &&
                  renderMobileMenuItems("company", menuItems.company.items)
                  }
                    </div>

                    
                  </div>

                                    {/* Bottom Action Buttons */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <div className="mb-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
                        <Link
                      href="/privacy"
                      onClick={() => {
                        setIsMenuOpen(false);
                        closeDropdowns();
                      }}
                      className="hover:text-[#171b29] transition-colors">
                      
                          Privacy Manifesto
                        </Link>
                        <span aria-hidden="true" className="text-gray-300">|</span>
                        <Link
                      href="/terms"
                      onClick={() => {
                        setIsMenuOpen(false);
                        closeDropdowns();
                      }}
                      className="hover:text-[#171b29] transition-colors">
                      
                          Terms of Use
                        </Link>
                      </div>
                      <p className="text-xs text-gray-500">
                        © 2024 Hushh. All rights reserved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }

          {/* No header spacer needed with sticky positioning */}
        </div>
      }

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-12px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .dropdown-item:hover {
          transform: translateX(2px);
        }
        
        .animate-item {
          opacity: 0;
          animation-fill-mode: both;
        }
        
        /* Enhanced mobile menu animations */
        .mobile-menu-item {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .mobile-menu-item:hover {
          transform: translateY(-2px) scale(1.02);
        }
        
        .mobile-menu-item:active {
          transform: translateY(0) scale(0.98);
        }
        
        .mobile-menu-section {
          border-bottom: 1px solid rgba(229, 231, 235, 0.5);
          padding-bottom: 1rem;
        }
        
        .mobile-menu-section:last-child {
          border-bottom: none;
        }
        
        /* Custom smooth scrollbar for mobile menu */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #171b29, #8f8570);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #0f1422, #7b7260);
        }
        
                 /* Enhanced button hover effects */
         .nav-button {
           position: relative;
           overflow: hidden;
         }
         .nav-button::before {
           content: '';
           position: absolute;
           top: 0;
           left: -100%;
           width: 100%;
           height: 100%;
           background: linear-gradient(90deg, transparent, rgba(143, 133, 112, 0.14), transparent);
           transition: left 0.5s ease;
         }
         .nav-button:hover::before {
           left: 100%;
         }
         
         /* Responsive navigation optimizations */
         @media (max-width: 1280px) {
           .nav-button {
             font-size: 0.875rem;
           }
         }
         
         @media (min-width: 1440px) {
           .nav-button {
             padding-left: 1rem;
             padding-right: 1rem;
           }
         }
         
         /* Header layout optimizations */
          @media (min-width: 1024px) and (max-width: 1279px) {
            nav {
              max-width: 60rem;
            }
          }

          /* Fallback visibility rules if utility classes fail to load in local dev */
          .desktop-nav,
          .desktop-auth,
          .desktop-only {
            display: none;
          }

          .mobile-menu-trigger {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          @media (min-width: 1024px) {
            .desktop-nav {
              display: flex !important;
            }

            .desktop-auth {
              display: flex !important;
            }

            .desktop-only {
              display: inline-flex !important;
            }

            .mobile-menu-trigger {
              display: none !important;
            }
          }
         
         /* Mobile touch feedback */
         @media (max-width: 1024px) {
          .touch-feedback {
            transition: all 0.2s ease;
          }
          .touch-feedback:active {
            transform: scale(0.95);
            opacity: 0.8;
          }
        }
        

      `}</style>
      
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={onSearchClose} />
    </>);

}
