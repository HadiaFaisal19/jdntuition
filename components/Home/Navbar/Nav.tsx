"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { navLinks } from "@/constant/constant";
import { HiBars3BottomRight } from "react-icons/hi2";

type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const [navBg, setNavBg] = useState(false);
  const pathname = usePathname(); 

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

  // Define routes with white outline
  const routesWithOutline = ["/contactUs", "/reviews", "/jobs"];
  const isCategoriesPage =
    pathname.startsWith("/categories/") && pathname.split("/").length === 3;

  const isCategoriesBlogPage = pathname.startsWith("/categories/") && pathname.split("/").length === 4; // To match the BlogId path

  const isWhiteOutline = routesWithOutline.includes(pathname) || isCategoriesPage;

  // Check if the current page is the blog page
  const isBlogPage = pathname.startsWith("/categories/") && pathname.split("/").length === 4;

  return (
    <div
      className={`fixed ${
        navBg
          ? "bg-white border-b-2 border-[#17A4A5]"
          : "bg-transparent border-b-2 border-[#17A4A520]"
      } w-full transition-all duration-700 h-[12vh] z-[1000]`}
    >
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        <Image
          src={isBlogPage ? "/images/LOGO.png" : navBg ? "/images/LOGO.png" : "/images/LOGOW.png"}
          alt="logo"
          width={120}
          height={120}
          className="transition-all duration-500"
        />

        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link key={link.id} href={link.url}>
              <p
                className={`nav__link ${
                  (navBg || isCategoriesBlogPage) ? "text-black" : "text-white"
                } transition-all duration-500`}
              >
                {link.label}
              </p>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button
            className={`md:px-10 md:py-2 px-8 py-1.5 text-white font-semibold text-base bg-[#17A4A5] hover:bg-[#138F8F] transition-all duration-200 rounded-lg ${
              isWhiteOutline ? "outline outline-2 outline-white" : ""
            }`}
          >
            <Link href="/book-now">Book Now</Link>
          </button>

          <HiBars3BottomRight
            onClick={openNav}
            className={`w-8 h-8 cursor-pointer ${navBg || isCategoriesBlogPage ? "text-black" : "text-white"} lg:hidden transition-all duration-200`}
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
