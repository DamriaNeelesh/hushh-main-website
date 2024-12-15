"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { images } from "../../../public/Images/images";
import { DownArrow } from "../_utilities/icons/DownArrow";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const [overviewSubmenu, setOverviewSubmenu] = useState(false);
  const [productsSubmenu, setProductsSubmenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 z-50">
      <div
        className={` bg-myBG w-screen transition ease-in duration-100 ${isScrolled ? "scrolled" : ""}`}
      >
        <div className="flex items-center justify-between py-6 ml-32 mr-32 text-white text-[1vw]">
          <div className="NavImage">
            <Link href={"#"}>
              <Image src={images.Logo} height={30} alt="Spring Media Logo" />
            </Link>
          </div>
          <div className="text-base font-semibold">
            <div className="items-center justify-center flex gap-8">
              <div
                className="group hover:text-myBorder"
                onMouseEnter={() => setOverviewSubmenu(true)}
              >
                <Link href="/about" className="flex gap-2 items-center group">
                  Overview
                  <DownArrow classprop="w-4 h-4 group-hover:rotate-180 transition-all duration-500 group-hover:stroke-2" />
                </Link>
              </div>
              <div
                className="group hover:text-myBorder"
                onMouseEnter={() => setProductsSubmenu(true)}
              >
                <Link
                  href="/products"
                  className="flex gap-2 items-center group"
                >
                  Products
                  <DownArrow classprop="w-4 h-4 group-hover:rotate-180 transition-all duration-500 group-hover:stroke-2" />
                </Link>
              </div>
              <div className="group hover:text-myBorder">
                <Link href="/pricing">Pricing</Link>
              </div>
              <div className="group hover:text-myBorder">
                <Link href="/contact">Contact</Link>
              </div>
              <div className="group hover:text-myBorder">
                <Link href="https://hushh_labs.gitlab.io/gitlab-profile/">
                  Hushh Labs
                </Link>
              </div>
              <div className="group hover:text-myBorder">
                <Link href="https://hush1one.com/support/">Support</Link>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-5 text-base font-semibold">
            <button className="border group hover:bg-myBorder hover:border-none hover:text-myBG border-myBorder rounded-lg px-5 py-1.5 text-myBorder flex gap-2 items-center">
              <svg
                fill="#a342ff"
                strokeWidth={1.5}
                className="w-5 h-5 stroke-myBorder group-hover:stroke-normBG group-hover:fill-normBG"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              Login
            </button>
            <button className="px-5 py-1.5 bg-myBorder  hover:border-none text-myBG rounded-lg">
              Try for free
            </button>
          </div>
        </div>
      </div>
      {overviewSubmenu ? (
        <div
          className=" bg-normBG mx-96 mt-2 flex px-10 py-10 border gap-10 rounded-lg shadow-lg"
          onMouseEnter={() => setOverviewSubmenu(true)}
          onMouseLeave={() => setOverviewSubmenu(false)}
        >
          <div className="flex-1 flex flex-col gap-5">
            <Link href={"/about"}>
              <div className=" hover:bg-myBG px-5 py-3 rounded-lg hover:shadow-md">
                <h1 className="font-semibold">About HUSHH</h1>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </Link>
            <Link href={"#"}>
              <div className=" hover:bg-myBG px-5 py-3 rounded-lg hover:shadow-md">
                <h1 className="font-semibold">Our Mission</h1>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </Link>
            <Link href={"#"}>
              <div className=" hover:bg-myBG px-5 py-3 rounded-lg hover:shadow-md">
                <h1 className="font-semibold">Our Vision</h1>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </Link>
          </div>
          <div className={`flex-1 flex flex-col gap-5`}>
            <Link href={"#"}>
              <div className=" hover:bg-myBG px-5 py-3 rounded-lg hover:shadow-md">
                <h1 className="font-semibold">Our Impact</h1>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </Link>
            <Link href={"#"}>
              <div className=" hover:bg-myBG px-5 py-3 rounded-lg hover:shadow-md">
                <h1 className="font-semibold">Meet HUSHHers</h1>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </Link>
            <Link href={"#"}>
              <div className=" hover:bg-myBG px-5 py-3 rounded-lg hover:shadow-md">
                <h1 className="font-semibold">Support</h1>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className=""></div>
      )}
      {productsSubmenu ? (
        <div
          className=" bg-normBG mx-96 mt-2 flex px-10 py-8 border gap-5 rounded-lg shadow-lg"
          onMouseEnter={() => setProductsSubmenu(true)}
          onMouseLeave={() => setProductsSubmenu(false)}
        >
          <div className="flex-1 flex flex-col gap-5">
            <Link href={"#"}>
              <div className=" hover:bg-myBG px-5 py-3 rounded-lg hover:shadow-md">
                <h1 className="font-semibold">Custom Experience</h1>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </Link>
          </div>
          <div className={`flex-1 flex flex-col gap-5`}>
            <Link href={"#"}>
              <div className=" hover:bg-myBG px-5 py-3 rounded-lg hover:shadow-md">
                <h1 className="font-semibold">Developer Insights</h1>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </Link>
          </div>
          <div className={`flex-1 flex flex-col gap-5`}>
            <Link href={"#"}>
              <div className=" hover:bg-myBG px-5 py-3 rounded-lg hover:shadow-md">
                <h1 className="font-semibold">Agent Stories</h1>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
};
