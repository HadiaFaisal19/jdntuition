"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/constant/constant";
import { HiBars3BottomRight } from "react-icons/hi2";
import { usePathname } from "next/navigation";

// Define Props Type
type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const [navBg, setNavBg] = useState(false);
  const pathname = usePathname(); // Get the current route

  // Debugging current pathname
  console.log("Current Pathname:", pathname);

  // Check if the current route matches the target routes
  const isTargetRoute = ["/contactUs", "/categories", "/reviews", "/jobs"].includes(pathname);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 610) {
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
        navBg || isTargetRoute
          ? "bg-transparent text-white border-b-2 border-white"
          : "bg-transparent border-b-2 border-[#17A4A520]"
      } w-full transition-all duration-700 h-[12vh] z-[1000]`}
    >
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        {/* Logo */}
        <Image
          src={navBg || isTargetRoute ? "/images/LOGO.png" : "/images/LOGO13.png"}
          alt="logo"
          width={120}
          height={120}
          className="transition-all duration-500"
        />

        {/* Nav Links */}
        <div className="hidden lg:flex items-center space-x-10">
  {navLinks.map((link) => (
    <Link key={link.id} href={link.url}>
      <p
        className={`nav__link ${
          navBg || isTargetRoute
            ? "after:bg-white text-black" // White underline on target routes
            : "after:bg-[#17A4A5] text-white" // Default underline color
        } transition-all duration-500`}
      >
        {link.label}
      </p>
    </Link>
  ))}
</div>



        {/* Button */}
        <div className="flex items-center space-x-4">
          <button
            className={`md:px-10 md:py-2 px-8 py-1.5 font-semibold text-base transition-all duration-200 rounded-lg ${
              navBg || isTargetRoute
                ? "bg-white text-[#17A4A5] border-b-2 border-transparent hover:bg-gray-100"
                : "bg-[#17A4A5] text-white hover:bg-[#138F8F]"
            }`}
          >
            <Link href="/book-now">Book Now</Link>
          </button>

          {/* Mobile Menu Icon */}
          <HiBars3BottomRight
            onClick={openNav}
            className={`w-8 h-8 cursor-pointer ${
              navBg || isTargetRoute ? "text-black" : "text-white"
            } lg:hidden transition-all duration-200`}
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
