import React from "react";
import Hero from "./Hero/Hero";
import About from "./About/About";
import Courses from "./Courses/Courses";
import Feature from "@/components/Home/Feature/Feature";
import Review from "./Review/Review";
import Team from "./Team/Team";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <About />
      <Courses />
      <Team />
      <Review />
      <Feature />
    </div>
  );
};

export default Home;
