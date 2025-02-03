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
  const [isLoading, setIsLoading] = useState(false); // For button loading state
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

  const routesWithOutline = ["/contactUs", "/reviews", "/jobs"];
  const isCategoriesPage =
    pathname.startsWith("/categories/") && pathname.split("/").length === 3;
  const isCategoriesBlogPage =
    pathname.startsWith("/categories/") && pathname.split("/").length === 4;
  const isWhiteOutline = routesWithOutline.includes(pathname) || isCategoriesPage;
  const isBlogPage =
    pathname.startsWith("/categories/") && pathname.split("/").length === 4;

  // Function to handle button click and loading state
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate an action before redirecting
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/book-now"; // Redirect after loading
    }, 2000);
  };

  return (
    <div
      className={`fixed pt-2 ${
        navBg ? "bg-white border-b border-[#17A4A5]" : "bg-transparent border-b border-[#17A4A520]"
      } w-full transition-all duration-700 z-[1000]`}
      style={{ paddingBottom: navBg ? "1rem" : "0.5rem" }}
    >
      <div className="flex items-center justify-between gap-8 w-full max-w-screen-xl mx-auto px-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src={isBlogPage ? "/images/LOGOC.png" : navBg ? "/images/LOGOC.png" : "/images/LOGOW.png"}
            alt="logo"
            width={120}
            height={120}
            className="transition-all duration-500 cursor-pointer"
          />
        </Link>

        {/* Navigation Links - Centered */}
        <div className="hidden lg:flex items-center justify-center flex-1 gap-6">
          {navLinks.map((link) => (
            <Link key={link.id} href={link.url}>
              <p
                className={`nav__link whitespace-nowrap ${
                  navBg || isCategoriesBlogPage ? "text-black" : "text-white"
                } transition-all duration-500`}
              >
                {link.label}
              </p>
            </Link>
          ))}
        </div>

        {/* Button and Mobile Menu */}
        <div className="flex items-center gap-6">
          <button
            onClick={handleClick}
            disabled={isLoading} // Button disabled while loading
            className={`px-8 py-2 text-white font-semibold text-base bg-[#17A4A5] hover:bg-[#138F8F] transition-all duration-200 rounded-lg flex items-center justify-center ${
              isWhiteOutline ? "outline outline-2 outline-white" : ""
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 108 8h-4l3 3 3-3h-4a8 8 0 01-8 8z"
                  ></path>
                </svg>
              </span>
            ) : (
              "Book Now"
            )}
          </button>

          {/* Mobile Menu Icon */}
          <HiBars3BottomRight
            onClick={openNav}
            className={`w-8 h-8 cursor-pointer ${
              navBg || isCategoriesBlogPage ? "text-black" : "text-white"
            } lg:hidden transition-all duration-200`}
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
