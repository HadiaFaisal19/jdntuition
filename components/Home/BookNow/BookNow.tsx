import Link from "next/link";
import React from "react";
import { FaPhone, FaSms, FaEnvelope, FaClock, FaCheckCircle } from "react-icons/fa";

const BookNow = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-4"> {/* Increased max-width */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16">
          
          {/* Left Section */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
                Secure Your Spot Today
              </h1>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4">
                  <FaCheckCircle className="h-10 w-10 text-[#17A4A5]" />
                  <span className="text-xl lg:text-2xl font-semibold text-gray-700">Expert Tutors</span>
                </div>
                <div className="flex items-center gap-4">
                  <FaCheckCircle className="h-10 w-10 text-[#17A4A5]" />
                  <span className="text-xl lg:text-2xl font-semibold text-gray-700">Personalised Learning</span>
                </div>
                <div className="flex items-center gap-4">
                  <FaCheckCircle className="h-10 w-10 text-[#17A4A5]" />
                  <span className="text-xl lg:text-2xl font-semibold text-gray-700">Proven Success</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#17A4A5] hover:bg-[#138F8F] text-white py-6 px-8 rounded-xl text-xl font-semibold transition-all duration-200 transform hover:scale-105">
            <Link href="/book-now">Book Now</Link>
            </button>
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <FaPhone className="h-10 w-10 text-[#17A4A5]" />
                <div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">Call Us</h3>
                  <p className="text-gray-600 text-lg lg:text-xl">02 7257 0299</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaSms className="h-10 w-10 text-[#17A4A5]" />
                <div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">Text Us</h3>
                  <p className="text-gray-600 text-lg lg:text-xl">0485 952 515</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaEnvelope className="h-10 w-10 text-[#17A4A5]" />
                <div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">Email Us</h3>
                  <p className="text-gray-600 text-lg lg:text-xl">contact@jdntuition.com.au</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <FaClock className="h-8 w-8 text-[#17A4A5]" />
                <h4 className="font-semibold text-gray-900 text-xl lg:text-2xl">Office Hours</h4>
              </div>
              <p className="text-gray-600 text-lg lg:text-xl">
                Monday-Saturday: 9AM - 10PM AEST<br />
                Sunday: 4PM - 10PM AEST
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookNow;