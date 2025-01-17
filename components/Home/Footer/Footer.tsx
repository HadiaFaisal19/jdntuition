import Image from "next/image";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" relative pt-24 pb-12 bg-gray-200">
      {/* Subscribe Now Section */}
      {/* <div className=" absolute -top-24 w-[50%] h-[40%] left-1/2 transform -translate-x-1/2 bg-[#17A4A5] rounded-lg shadow-lg py-12 px-8 flex flex-col sm:flex-row items-center justify-between text-white space-y-6 sm:space-y-0 sm:space-x-4">
        <div>
          <h2 className="text-2xl font-bold text-center sm:text-left">
            Confused to make a Decision? Give Us a Chance
          </h2>
          <p className="text-sm opacity-90 text-center sm:text-left mt-2">
          Book Your First Lesson Now to gwt a 10% discount.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          
          <button className="px-6 py-3 mr-8 bg-white text-[#17A4A5] font-bold text-xl rounded-lg hover:bg-gray-700 transition duration-300">
           Avail Offer Now
          </button>
        </div>
      </div> */}

      {/* Main Footer */}
      <div className="mt-6 w-[80%] mx-auto grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-8 border-b-[1.5px] border-white border-opacity-20">
        <div>
          <Image src={"/images/logo.png"} alt="logo" height={100} width={100} />
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
        <div>
          <h1 className="footer__heading">Popular Subjects</h1>
          <p className="footer__link"> Maths</p>
          <p className="footer__link"> English </p>
          <p className="footer__link"> Science</p>
          <p className="footer__link"> NAPLAN Preparation</p>
          <p className="footer__link"> Commerce</p>
          <p className="footer__link"> Geography</p>
        </div>
        <div>
          <h1 className="footer__heading">Quick Links</h1>
          <p className="footer__link"> Home</p>
          <p className="footer__link"> About</p>
          <p className="footer__link"> Subjects</p>
          <p className="footer__link"> Jobs</p>
          <p className="footer__link"> Contact Us</p>
          <p className="footer__link"> Privacy Policy</p>
        </div>
        <div>
          <h1 className="footer__heading">Subscribe to our NewsLetter</h1>
          <input
            type="text"
            placeholder="Enter your Email"
            className="px-6 py-2 rounded-lg outline-none bg-gray-700 w-full text-white rounded-md"
          />
          <button className="mt-5 px-4 py-2 sm:px-6 sm:py-3 bg-yellow-500 text-white font-semibold w-full rounded-md transform transition-transform duration-300 hover:scale-105 hover:bg-yellow-600">
            Subscribe
          </button>
        </div>
      </div>
      <p className="text-center mt-4 text-base text-black opacity-70">
        JDN Tuition © Copyright 2024
      </p>
    </div>
  );
};

export default Footer;
