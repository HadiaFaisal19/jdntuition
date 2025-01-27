"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navLinks } from "@/constant/constant"
import { HiBars3BottomRight } from "react-icons/hi2"

type Props = {
  openNav: () => void
}

const Nav = ({ openNav }: Props) => {
  const [navBg, setNavBg] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 610) {
        setNavBg(true)
      } else {
        setNavBg(false)
      }
    }

    window.addEventListener("scroll", handler)

    return () => window.removeEventListener("scroll", handler)
  }, [])

  const routesWithOutline = ["/contactUs", "/reviews", "/jobs"]
  const isCategoriesPage = pathname.startsWith("/categories/") && pathname.split("/").length === 3

  const isCategoriesBlogPage = pathname.startsWith("/categories/") && pathname.split("/").length === 4

  const isWhiteOutline = routesWithOutline.includes(pathname) || isCategoriesPage
  const isBlogPage = pathname.startsWith("/categories/") && pathname.split("/").length === 4

  return (
    <div
      className={`fixed ${
        navBg ? "bg-white border-b border-[#17A4A5]" : "bg-transparent border-b border-[#17A4A520]"
      } w-full transition-all duration-700 h-[10vh] z-[1000]`}
    >
      <div className="flex items-center h-full justify-between w-full px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        <Link href="/" className="flex-shrink-0">
          <Image
            src={isBlogPage ? "/images/LOGOC.png" : navBg ? "/images/LOGOC.png" : "/images/LOGOW.png"}
            alt="logo"
            width={120}
            height={120}
            className="transition-all duration-500 cursor-pointer"
          />
        </Link>

        <div className="hidden lg:flex items-center justify-center flex-grow">
          {navLinks.map((link) => (
            <Link key={link.id} href={link.url} className="mx-3 xl:mx-4">
              <p
                className={`nav__link ${
                  navBg || isCategoriesBlogPage ? "text-black" : "text-white"
                } transition-all duration-500`}
              >
                {link.label}
              </p>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4 flex-shrink-0">
          <button
            className={`md:px-6 lg:px-8 xl:px-10 md:py-2 px-4 py-1.5 text-white font-semibold text-base bg-[#17A4A5] hover:bg-[#138F8F] transition-all duration-200 rounded-lg ${
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
  )
}

export default Nav

