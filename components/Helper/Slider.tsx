"use client";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SliderCard from "./SliderCard";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1324 },
    items: 2,
    slidesToSide: 1,
  },
  tablet: {
    breakpoint: { max: 1324, min: 764 },
    items: 1,
    slidesToSide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSide: 1,
  }
};

const Slider = () => {
  return (
    <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={5000} arrows itemClass="item">
      <SliderCard review="JDN Tuition has been a game-changer for me. With their personalized approach and expert tutors, I see a significant improvement in my grades and confidence. I highly recommend them to anyone seeking academic support." name="Emily" role ="High School Student" />
      <SliderCard review="I can’t thank JDN Tuition enough for their dedicated support. Their tutors go above and beyond to ensure that I understand the material and feel confident in my abilities. Thanks to them, I’ve been able to excel in subjects I once struggled with." name="Michael" role ="University Student" />
      <SliderCard review="Choosing JDN Tuition was one of the best decisions I’ve made for my education. Their tutors are not only knowledgeable but also incredibly supportive. They’ve helped me overcome my fear of exams and achieve results beyond my expectations." name="Sarah" role ="High School Student" />
      <SliderCard review="I’ve had a fantastic experience with JDN Tuition. Their tutors are passionate, patient, and always willing to go the extra mile to help me succeed. Thanks to their guidance, I’ve not only improved academically but also developed valuable study skills that will benefit me for years to come." name="Jack" role ="High School Student" />
    </Carousel>
  );
};

export default Slider;
