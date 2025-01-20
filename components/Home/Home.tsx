"use client";
import React, { useEffect } from "react";
import Hero from "./Hero/Hero";
import About from "./About/About";
import Courses from "./Courses/Courses";
import Review from "./Review/Review";
import Team from "./Team/Team";
import Pricing from "./Pricing/Pricing";
import OurProcess from "./OurProcess/OurProcess";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";

import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
      anchorPlacement: "top-bottom",
    });
    AOS.refresh();
  }, []);

  return (
    <div>
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="courses">
        <Courses />
      </div>
      <div id="our-process">
        <OurProcess />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <div id="review">
        <Review />
      </div>
      <div id="why-choose-us">
        <WhyChooseUs />
      </div>
      <div id="team">
        <Team />
      </div>
    </div>
  );
};

export default Home;
