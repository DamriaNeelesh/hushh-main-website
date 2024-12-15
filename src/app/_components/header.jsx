"use client";
import React, { useRef, useState, useEffect } from "react";
import HushhHeaderLogo from "./svg/hushhHeaderLogo";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { Box, Button, Container, Flex, Text, Badge, Divider } from "@chakra-ui/react";
import { useResponsiveSizes } from "../context/responsive";
import { Bars3Icon } from "./svg/icons/hamburgerMenuIcon";
import { CloseMenuIcon } from "./svg/icons/closeMenuIcon";
import SearchBar from "./features/searchBar";
import { ChevronArrowIcon } from "./svg/icons/chevronArrowIcon";
import HushhWalletIcon from "./svg/hushhWalletIcon";
import HushhButtonIcon from "./svg/hushhButton";
import VibeSearchIcon from "./svg/vibeSearch";
import ChromeExtentionLogo from "./svg/ChromeExtensionLogo";
import ConciergeApp from "./svg/conciergeApp";
import { usePathname, useRouter } from 'next/navigation'
import ValetChat from "./svg/valetChat";
import VibeSearchApi from "./svg/vibeSearchApi";
import { headerAssets } from "./svg/icons/HeaderIcons/headerAssets";
import { animateScroll as scroll } from "react-scroll";
import { FiUser, FiYoutube } from 'react-icons/fi';
import { useMediaQuery } from "react-responsive";
import SmallVibeSearch from "./svg/smallVibeSearch.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import { ChevronRightIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import UnicodeQR from "./svg/onelinkQrdownload.svg"
import { isMobile, isAndroid, isIOS } from 'react-device-detect';


export default function Header() {

  const { isTablet, isDesktop } = useResponsiveSizes();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [productsSubmenu, setProductsSubmenu] = useState(false);
  const [productsSubmenuMobile, setProductsSubmenuMobile] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [headerBackground, setHeaderBackground] = useState("transparent");
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For the dropdown
  const [userEmail, setUserEmail] = useState('');
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQRLink, setCurrentQRLink] = useState("");
  const noHeaderPaths = ['/vivaConnect', '/viva-connect', '/viva-connect/qrPage', '/qrCodePage'];

  const shouldShowHeader = !noHeaderPaths.includes(pathname);
  const notify = () => toast("This Product is Coming Soon!");

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     const { data } = await supabase.auth.getSession(); // Get the session data

  //     console.log('data:',data);
  //     console.log('user email: ',data?.session?.user?.email);

  //     if (data.session) {
  //       setIsLoggedIn(true); 
  //       const { data: userIdentities } = await supabase.auth.getUserIdentities();
  //       if (userIdentities) {
  //         const userIdentity = userIdentities.identities[0]; 
  //         const email = userIdentity.email; 
  //         setUserEmail(email); 
  //       }
  //     } else {
  //       setIsLoggedIn(false); 
  //     }
  //    console.log('Is LoggedIn: ',isLoggedIn)
  //   };
  //   checkLoginStatus(); 
  // }, [supabase]);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen); 
  };
  const handleOpenModal = (link) => {
    setCurrentQRLink(link);
    setIsModalOpen(true);
  };
  const scrollToContactForm = () => {
    window.scrollTo({
      top: document.getElementById("contact-form").offsetTop,
      behavior: "smooth",
    });
  };

  const handleDownloadClick = () => {
    console.log('Download clicked')
    if (isAndroid) {
      window.location.href = "https://bit.ly/hushh-wallet-play-store";
    } else if (isIOS) {
      window.location.href = "https://bit.ly/hushh-app-ios";
    } else {
      handleOpenModal();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      if (position > 0) {
        setHeaderBackground("black");
      } else {
        setHeaderBackground("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = () => {
    scroll.scrollTo(7500);
  };

  const scrollInMobile = () => {
    scroll.scrollTo(3350);
  };

  const handleMenuIconToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    // document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';  // Disable scroll
    } else {
      document.body.style.overflow = '';  // Reset scroll
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = '';  // Reset scroll when the component is unmounted
    };
  }, [isMenuOpen]);

  const handleMenuClick = (url) => {
    router.push(url);
    setIsOpen(false);
    setProductsSubmenu(false);
  };

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const handleSubmenuClick = () => {
    setProductsSubmenuMobile(false);
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    window.open("https://hushh-button.vercel.app/user/login", "_blank");
  };

  const handleLinkClick = () => {
    // Close menu when any link is clicked
    setIsMenuOpen(false);
  };

  return (
    <>
  {shouldShowHeader &&
    <div className={`w-full z-1000`}>
      <div className=" flex items-center justify-between w-full px-3 py-2 z-1000 md:px-16 md:py-5">
        <div className="flex-1">
          <Link href="/">
            <HushhHeaderLogo />
          </Link>
        </div>
        {isMobile ? (
         <div className="flex items-center justify-end w-full mobile-header py-2">
         <Container display={"flex"} gap={"1rem"}>
           <div className="text-white" onClick={handleMenuIconToggle}>
             {isMenuOpen ? <CloseMenuIcon /> : <Bars3Icon />}
           </div>
         </Container>
       </div>
        ) : (
          // This is for desktop screens
          <div className={`w-full px-0 desktop-header ${isMobile ? 'hidden' : ''}`}>
            <div className="text-white ml-12 flex gap-12 px-7 md:gap-10 text-md">
              {/* <Link
                href="/"
                className={`link ${pathname === '/' ? 'gradient-text' : ''}`}
                style={{ zIndex: "1000" }}
                onMouseEnter={() => setProductsSubmenu(false)}
              >
                HOME
              </Link> */}
              <Link
                href="/about"
                // style={{ zIndex: "1000" }}
                className={`link ${pathname === '/about' ? 'gradient-text' : ''}`}
                onMouseEnter={() => setProductsSubmenu(false)}
              >
                ABOUT US
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 group"
                onMouseEnter={() => setProductsSubmenu(true)}
              >
                PRODUCTS
                <ChevronArrowIcon className="group-hover:rotate-0 rotate-180 transition-all duration-300" />
              </Link>
              <Link
                href="/hushhBlogs"
                onMouseEnter={() => setProductsSubmenu(false)}
              >
                BLOGS
              </Link>
              {/* <Link
                href="/pricingPlans"
                onMouseEnter={() => setProductsSubmenu(false)}
                className={`link ${pathname === '/pricingPlans' ? 'gradient-text' : ''}`}
              >
                PRICING
              </Link> */}
              {/* <Link
                href="/outbound-services"
                onMouseEnter={() => setProductsSubmenu(false)}
                className={`link ${pathname === '/outbound-services' ? 'gradient-text' : ''}`}
              >
                ADVISORY SERVICES
              </Link> */}
              {/* <Link
                href="/UserGuide"
                onMouseEnter={() => setProductsSubmenu(false)}
                className={`link ${pathname === '/UserGuide' ? 'gradient-text' : ''}`}
              >
                GUIDE
              </Link> */}
              <Link
                href="/contact-us"
                onMouseEnter={() => setProductsSubmenu(false)}
                className={`link ${pathname === '/contact-us' ? 'gradient-text' : ''}`}
              >
                CONTACT US
              </Link>
            </div>
            {productsSubmenu && (
              <div
                className="bg-white z-100 flex flex-col gap-4 absolute pl-8 pr-8 mt-4 pt-5 pb-7 rounded-2xl shadow-lg shadow-[#A7AEBA1F]"
                onMouseEnter={() => setProductsSubmenu(true)}
                onMouseLeave={() => setProductsSubmenu(false)}
              >
                <p className="text-xs text-fontColor2 font-semibold">
                  HUSHH PRODUCTS
                </p>
                <div className="flex gap-2 z-1000">
                  <div className="flex-1 flex flex-col gap-2">
                  <Link
                      href={"/products/hushhWalletApp"}
                      onClick={() => setProductsSubmenu(false)}
                      className="flex gap-4 items-start hover:text-white hover:bg-black px-5 py-2.5 rounded-xl"
                    >
                      <div className="">
                        <HushhWalletIcon className="w-6 h-6" />
                      </div>
                      <div className="">
                        <h1 className="font-semibold">Hushh Wallet App</h1>
                        <p className="text-sm font-medium text-fontColor3">
                        Your personal data vault. Organize, control,<br/> and monetize your information
                        </p>
                      </div>
                    </Link>
                    <Link
                      href={"/products/hushhButton"}
                      onClick={() => setProductsSubmenu(false)}
                      className="flex gap-4 items-start hover:text-white hover:bg-black px-5 py-2.5 rounded-xl"
                    >
                      <div className="">
                        <HushhButtonIcon size={24} />
                      </div>
                      <div className="">
                        <h1 className="font-semibold">Hushh Button</h1>
                        <p className="text-sm font-medium text-fontColor3">
                        Seamlessly share your preferences with  <br /> brands for personalized experiences
                        </p>
                      </div>
                    </Link>
                    <Link
                      href={"/products/browserCompanion"}
                      onClick={() => setProductsSubmenu(false)}
                      className="flex gap-4 hover:text-white hover:bg-black px-5 py-2.5 rounded-xl"
                    >
                      <div className="">
                        <ChromeExtentionLogo className="w-6 h-6" />
                      </div>
                      <div className="">
                        <h1 className="font-semibold">
                          Hushh Browser Companion
                        </h1>
                        <p className="text-sm font-medium text-fontColor3">
                        Track and manage your online browsing data <br/>, building a complete digital profile
                        </p>
                      </div>
                    </Link>
                  </div>

                  <div className="flex-1 flex flex-col gap-2 w-full">
                  <Link
                      href={"/products/vibeSearch"}
                      onClick={() => setProductsSubmenu(false)}
                      className="flex gap-4 hover:text-white hover:bg-black px-0 py-2.5 rounded-xl"
                    >
                      <div className="">
                        <VibeSearchIcon className="w-6 h-6" />
                      </div>
                      <div className="">
                        <h1 className="font-semibold">VIBE Search App</h1>
                        <p className="text-sm font-medium text-fontColor3">
                        Discover products you love with image-based search and AI recommendations
                        </p>
                      </div>
                    </Link>
                    <Link
                      href={"/developerApi"}
                      onClick={() => setProductsSubmenu(false)}
                      className="flex gap-4 hover:text-white hover:bg-black px-0 py-2.5 rounded-xl"
                    >
                      <div className="">
                        <VibeSearchApi className="w-6 h-6" />
                      </div>
                      <div className="">
                        <h1 className="font-semibold">Developer API</h1>
                        <p className="text-sm font-medium text-fontColor3">
                        Tools for businesses to integrate <br/> Hushh data into their applications
                        </p>
                      </div>
                    </Link>
                
                    <Link
                      href={"/products/hushhForStudents"}
                      onClick={() => setProductsSubmenu(false)}
                      className="flex gap-4 hover:text-white hover:bg-black px-0 py-2.5 rounded-xl"
                    >
                      <div className="">
                        <ValetChat className="w-6 h-6" />
                      </div>
                      <div className="">
                        <h1 className="font-semibold">Hushh For Students</h1>
                        <p className="text-sm font-medium text-fontColor3">
                        Rewards & empowers students with data  <br /> control (safe & secure) 
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="">
          { isDesktop && (
            <div className="login">
              {/* <SearchBar /> */}
              {/* <Button
                border={"1px solid #606060"}
                borderRadius={"5px"}
                w={"10.75rem"}
                h={"3.125rem"}
                // color={theme.colors._white}
                className="bg-gradient-to-r from-red-600 to-purple-600 text-transparent bg-clip-text"
                lineHeight={"50px"}
                letterSpacing={"0.5rem"}
                _hover={{
                  background:
                    "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
                  color: "white",
                  border: "none",
                }}
                onClick={handleLoginClick}
              >
                LOGIN
              </Button> */}
            </div>
          )}
        </div> 
      </div>

{/* This below is for mobile screens */}

          {isMenuOpen && (isTablet || isMobile) ? (
            <div style={{zIndex:'1000 !important', position:'absolute', width:'100%'}} className="top-0 bg-black overflow-hidden flex flex-col justify-between min-h-screen min-w-screen" ref={menuRef}>
              {/* Header */}
              <div className="px-6 mt-4 flex justify-between items-center">
                {/* Logo */}
                {/* <Image src={HushhHeaderLogo} alt="Hushh.ai" /> */}
                <HushhHeaderLogo/>
                <button onClick={() => setIsMenuOpen(false)} className="text-gray-600">
                  <CloseIcon />
                </button>
              </div>
        
              {/* Menu Items */}
              <div className="flex-1 bg-black mt-4 overflow-y-auto">
                <ul style={{listStyle:'none'}} className="flex mt-6 flex-col px-6 space-y-4 bg-black">
                <li>
                    <Link href="/about" onClick={() => setIsMenuOpen(false)} style={{fontWeight:'700'}} className="text-lg text-white">
                      About Us
                    </Link>
                  </li>
                <Divider borderStyle={'solid'} borderWidth={"1px"} borderColor={"#5A5A5A"} />  
                  <li>
                    <Link
                      style={{fontWeight:'700'}}
                      href="#"
                      className="flex justify-between items-center text-lg text-white"
                      onClick={() => setProductsSubmenuMobile(!productsSubmenuMobile)}
                    >
                      Products
                      <ChevronArrowIcon
                        className={`${productsSubmenuMobile ? "rotate-180" : ""} transition-all`}
                      />
                    </Link>
        
                    {productsSubmenuMobile && (
                      <ul style={{listStyle:'none'}} className="mt-2 space-y-3 bg-black pl-6 text-base text-white">
                        <li>
                          <Link style={{fontWeight:'500'}} onClick={() => setIsMenuOpen(false)} href="/products/hushhWalletApp" className="block">
                          <span style={{display:'flex',flexDirection:'row', gap:'1rem'}}>
                          <HushhWalletIcon className="w-6 h-6" />
                            Hushh Wallet App
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link style={{fontWeight:'500'}}  onClick={() => setIsMenuOpen(false)} href="/products/browserCompanion" className="block text-white ">
                          <span style={{display:'flex',flexDirection:'row', gap:'1rem'}}>
                          <ChromeExtentionLogo className="w-6 h-6"/>
                            Browser Companion
                          </span>
                          </Link>
                        </li>
                        <li>
                          <Link style={{fontWeight:'500'}}  onClick={() => setIsMenuOpen(false)} href="/products/vibeSearch" className="block text-white">
                          <span style={{display:'flex',flexDirection:'row', gap:'1rem'}}>
                          <VibeSearchIcon className="w-6 h-6"/>
                          Vibe Search
                          </span>
                          </Link>
                        </li>
                        <li>
                          <Link style={{fontWeight:'500'}}  onClick={() => setIsMenuOpen(false)} href="/products/hushhButton" className="block text-white">
                          <span style={{display:'flex',flexDirection:'row', gap:'1rem'}}>
                         <HushhButtonIcon size={24} />
                         Hushh Button
                          </span> 
                          </Link>
                        </li>
                        <li>
                          <Link style={{fontWeight:'500'}}  onClick={() => setIsMenuOpen(false)} href="/products/developerApi" className="block text-white">
                          <span style={{display:'flex',flexDirection:'row', gap:'1rem'}}>
                          <VibeSearchApi className="w-6 h-6" />
                          Developer API
                          </span>
                          </Link>
                        </li>
                        <li>
                          <Link style={{fontWeight:'500'}}  onClick={() => setIsMenuOpen(false)} href="/products/hushhForStudents" className="block text-white">
                          <span style={{display:'flex',flexDirection:'row', gap:'1rem'}}>
                          <headerAssets.VibeSearchMarketplace className="w-6 h-6" />
                          Hushh For Students
                          </span>
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <Divider borderStyle={'solid'} borderWidth={"1px"} borderColor={"#5A5A5A"} />  

                  <li>
                    <Link style={{fontWeight:'700'}}  onClick={() => setIsMenuOpen(false)} href="/contact-us" className="text-lg text-white">
                      Contact Us
                    </Link>
                  </li>
                  <Divider borderStyle={'solid'} borderWidth={"1px"} borderColor={"#5A5A5A"} />  

                  <li>
                    <Link style={{fontWeight:'700'}} onClick={() => setIsMenuOpen(false)} href="/hushhBlogs" className="text-lg text-white">
                      Blogs
                    </Link>
                  </li>
                </ul>
              </div>
        
              {/* Sign In Button */}
              <div className="px-6 pb-6">
                <button onClick={handleDownloadClick} style={{background:'linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)'}} className="w-full text-white py-2 rounded-full text-lg">
                  Download Our App
                </button>
              </div>
            </div>
          ) : (
            <div className=""></div>
          )}
        </div>
  }  
    </>
  );
};

