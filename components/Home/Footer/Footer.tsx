import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { navLinks } from "@/constant/constant";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";

declare global {
  interface Window {
    handleMailchimpCallback: (response: MailchimpResponse) => void;
  }
}

interface MailchimpResponse {
  result: "success" | "error";
  msg?: string;
}

const Footer = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const scriptUrl = form.action.replace("/post?", "/post-json?");
    
    // Add properly typed callback
    window.handleMailchimpCallback = (response: MailchimpResponse) => {
      if (response.result === "success") {
        setIsSubscribed(true);
        setEmail("");
        setTimeout(() => setIsSubscribed(false), 5000);
      }
    };

    const emailValue = form.EMAIL.value;
    const url = `${scriptUrl}&EMAIL=${encodeURIComponent(emailValue)}&c=handleMailchimpCallback`;
    
    // Create JSONP request
    const script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
    document.body.removeChild(script);
  };

  return (
    <div className="relative pb-12 bg-gray-200">
      {/* avail Now Section */}
      {/* <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl h-52 bg-[#17A4A5] rounded-lg shadow-xl z-50 flex flex-col sm:flex-row items-center justify-between text-white px-6 sm:px-12 py-8 gap-6 sm:gap-8">
  <div className="flex-1 text-center sm:text-left min-w-[300px]">
    <h2 className="text-xl sm:text-2xl font-bold mb-2 leading-tight">
      Demand is High! Secure Your Spot Today.
    </h2>
    <p className="text-sm sm:text-base opacity-90">
      Expert Tutors | Personalised Learning | Proven Success
    </p>
  </div>
  <div className="flex-shrink-0">
    <button className="mr-6 px-8 py-3 bg-white text-[#17A4A5] font-bold text-lg rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-md hover:shadow-lg whitespace-nowrap">
      <Link href="/book-now" className="block w-full h-full">
        Book Now
      </Link>
    </button>
  </div>
</div> */}

      {/* Main Footer */}
      <div className="pt-16 w-[80%] mx-auto grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-8 border-b-[1.5px] border-white border-opacity-20">
      <div>
        <Link href="/" className="flex-shrink-0">
          <Image src={"/images/LOGOC.png"} alt="logo" height={100} width={100} />
          </Link>
          <p className="text-black text-opacity-50">
            Journey Development Network: Building the Pillars of Success
          </p>
          <div className="flex items-center space-x-4 mt-6">
            <FaFacebookF className="w-6 h-6 text-blue-600" />
            {/* <Image
              src="https://static.vecteezy.com/system/resources/previews/031/737/215/non_2x/twitter-new-logo-twitter-icons-new-twitter-logo-x-2023-x-social-media-icon-free-png.png"
              alt="Twitter Logo"
              className="w-8 h-8"
            /> */}
             
             <Link href="https://au.linkedin.com/company/jdn-tuition" className="flex-shrink-0">
  <FaLinkedin className="w-6 h-6 text-blue-800" />
</Link>
<FaInstagram className="w-6 h-6 text-pink-600" />
          </div>
        </div>
        <div>
        <h1 className="footer__heading">Grades</h1>
          <p className="footer__link"> 
          <Link href="/k-6Subjects">Years K-6</Link> 
          </p>
          <p className="footer__link"> 
          <Link href="/7-10Subjects">Years 7-10</Link> 

          </p>
          <p className="footer__link"> 
          <Link href="/11-12Subjects">Years 11-12</Link> 

          </p>
          <h1 className="footer__link text-xl font-bold">
        <Link href="/reviews">All Reviews</Link>
        </h1>
          <h1 className="footer__link text-xl font-bold">
          <Link href="/blog/all-blogs">All Blogs</Link>
          </h1>
        </div>
        <div>
      <h1 className="footer__heading">Quick Links</h1>
      {navLinks.map((link) => (
        <p key={link.id} className="footer__link">
          <Link href={link.url}>{link.label}</Link>
        </p>
      ))}
      
      <p className="footer__link"> 
      <Link href="/#why-choose-us">Why Choose Us</Link>
      </p>

    </div>
    <div>
        <h1 className="footer__heading">Subscribe to our Newsletter</h1>
        <div id="mc_embed_signup">
          <form
            onSubmit={handleSubmit}
            action="https://jdntuition.us7.list-manage.com/subscribe/post?u=9fb88b92873aaab24234bbf07&amp;id=bd53c68292&amp;f_id=00ed7be1f0"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            noValidate
          >
            <div id="mc_embed_signup_scroll">
              <div className="mc-field-group">
                <label htmlFor="mce-EMAIL" className="sr-only">
                  Email Address
                </label>
                <input
                  type="email"
                  name="EMAIL"
                  className="required email px-6 py-2 rounded-lg outline-none bg-gray-700 w-full text-white"
                  id="mce-EMAIL"
                  placeholder="Enter your Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {isSubscribed && (
                <div className="mt-2 text-[#17A4A5] text-sm">
                  Newsletter Subscribed successfully!
                </div>
              )}
              <div
                style={{ position: "absolute", left: "-5000px" }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_d4c977bb39116ac14c2db4a0b_51f36f72a5"
                  tabIndex={-1}
                  defaultValue=""
                />
              </div>
              <div className="clear foot">
                <input
                  type="submit"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="mt-5 px-4 py-2 sm:px-6 sm:py-3 bg-yellow-500 text-white font-semibold w-full rounded-md transform transition-transform duration-300 hover:scale-105 hover:bg-yellow-600 cursor-pointer"
                  value="Subscribe"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
      <p className="text-center mt-4 text-base text-black opacity-70">
        JDN Tuition © Copyright 2024
      </p>
    </div>
  );
};

export default Footer;
