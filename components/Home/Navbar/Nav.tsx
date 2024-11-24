"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/constant/constant";
import { HiBars3BottomRight } from "react-icons/hi2";

//DEFINE PROPS TYPE
type Props={
  openNav: ()=> void;
}

const Nav = ({openNav}:Props) => {
  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) {
        setNavBg(true);
      } else {
        setNavBg(false);
      }
    };

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`fixed ${
        navBg ? "bg-indigo-800" : "fixed"
      } w-full transition-all duration-200 h-[12vh] z-[1000]`}
    >
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        <Image src="/images/LOGO.png" alt="logo" width={120} height={120} />
        {/* Nav Links for larger screens */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link key={link.id} href={link.url}>
              <p className="nav__link">{link.label}</p>
            </Link>
          ))}
        </div>
        {/* Register Button and Mobile Menu Icon */}
        <div className="flex items-center space-x-4">
          {/* "Register Now" button is now always visible */}
          <button className="md:px-10 md:py-2 px-8 py-1.5 text-white font-semibold text-base bg-pink-700 hover:bg-pink-900 transition-all duration-200 rounded-lg">
            Register Now
          </button>
          {/* Show menu icon only on small screens */}
          <HiBars3BottomRight onClick={openNav} 
          className="w-8 h-8 cursor-pointer text-white lg:hidden" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
