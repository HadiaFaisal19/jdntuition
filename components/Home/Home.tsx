import React from "react";
import Hero from "./Hero/Hero";
import About from "./About/About";
import Courses from "./Courses/Courses";
import Feature from "@/components/Home/Feature/Feature";
import Review from "./Review/Review";
import Team from "./Team/Team";
import Pricing from "./Pricing/Pricing";
import OurProcess from "./OurProcess/OurProcess";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <About />
      <Courses />
      <OurProcess />
      <Team />
      <Pricing />
      <Review />
      <Feature />
    </div>
  );
};

export default Home;
