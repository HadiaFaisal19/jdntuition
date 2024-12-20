import Image from "next/image";
import { Input } from "postcss";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="pt-20 pb-12 bg-gray-200">
      <div className="w-[80%] mx-auto grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-8 border-b-[1.5px] border-white border-opacity-20">
        <div>
            <Image 
            src={"/images/logo.png"}
            alt="logo"
            height={100}
            width={100}
            />
            <p className="text-black text-opacity-50">
            Journey Development Network: Building the Pillars of Success
            </p>
            <div className="flex items-center space-x-4 mt-6">
  <FaFacebookF className="w-6 h-6 text-blue-600" />
  <img
    src="https://static.vecteezy.com/system/resources/previews/031/737/215/non_2x/twitter-new-logo-twitter-icons-new-twitter-logo-x-2023-x-social-media-icon-free-png.png"
    alt="Twitter Logo"
    className="w-8 h-8"
  />
  <FaLinkedin className="w-6 h-6 text-blue-800" />
  <FaInstagram className="w-6 h-6 text-pink-600" />
</div>
        </div>
        <div >
            <h1 className="footer__heading">Popular Subjects</h1>
            <p className="footer__link"> Maths</p>
            <p className="footer__link"> English </p>
            <p className="footer__link"> Science</p>
            <p className="footer__link"> NAPLAN Preparation</p>
            <p className="footer__link"> Commerce</p>
            <p className="footer__link"> Geography</p>
        </div>
        <div >
            <h1 className="footer__heading">Quick Links</h1>
            <p className="footer__link"> Home</p>
            <p className="footer__link"> About</p>
            <p className="footer__link"> Subjects</p>
            <p className="footer__link"> Jobs</p>
            <p className="footer__link"> Contact Us</p>
            <p className="footer__link"> Privacy Policy</p>
        </div>
        <div >
          <h1 className="footer__heading"> Subscribe to our NewsLetter</h1>
          <input type="text" placeholder="Enter your Email" className="px-6 py-2 rounded-lg outline-none bg-gray-700 w-full text-white rounded-md "/>
          
            <button className=" mt-5 px-4 py-2 sm:px-6 sm:py-3 bg-yellow-500 text-white font-semibold w-full rounded-md transform transition-transform duration-300 hover:scale-105 hover:bg-yellow-600">
            Subscribe
            </button>
            {/* <button className=" mt-5 px-4 py-2 sm:px-6 sm:py-3 bg-[#17A4A5] text-white font-semibold w-full rounded-md transform transition-transform duration-300 hover:scale-105 hover:bg-[#138F8F]">
            Subscribe
            </button>
            <button className=" mt-5 px-4 py-2 sm:px-6 sm:py-3 bg-rose-600 text-white font-semibold w-full rounded-md transform transition-transform duration-300 hover:scale-105 hover:bg-rose-800 ">
            Subscribe
            </button> */}
        </div>
      </div>
      <p className="text-center mt-4 text-base text-black opacity-70 "> JDN Tuition © Copyright 2024</p>
    </div>
  );
};

export default Footer;