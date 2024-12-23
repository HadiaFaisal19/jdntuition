"use client";

import React from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const BlogCarousel = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const blogs = [
    {
      title: "Discover your Learning Style - How you can increase your learning capacity",
      date: "23rd December 2024",
      category: "Academic Success",
      author: "Rosalina D.",
      views: "5k",
      imageUrl: "/images/2.png",
    },
    {
      title: "Importance Of Homework - How Students need to manage their school",
      date: "23rd December 2024",
      category: "Academic Success",
      author: "Rosalina D.",
      views: "3k",
      imageUrl: "/images/kg.jpg",
    },
    {
      title: "Importance of Fun VS Studies - How to get along with everything",
      date: "23rd December 2024",
      category: "Student Wellbeing",
      author: "Rosalina D.",
      views: "4k",
      imageUrl: "/images/ex11-12.jpg",
    },
  ];

  return (
    <section className="min-h-screen w-screen flex flex-col items-center justify-center">
      {/* Trending Blogs Heading */}
      
      {/* Carousel */}
      <div className="w-full">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={3000}
          infinite={true}
          showDots={true}
          containerClass="carousel-container h-full w-full"
          itemClass="carousel-item flex items-center justify-center h-full w-full"
        >
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center min-h-[80vh] w-full bg-white shadow-lg rounded-lg overflow-hidden"
            >
              {/* Image */}
              <div className="w-full md:w-1/2 relative min-h-[50vh]">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                />
              </div>
  
              {/* Content */}
              <div className="w-full md:w-1/2 px-4 flex flex-col justify-center min-h-[50vh]">
                <span className="inline bg-[#17A4A5] text-white text-sm font-semibold px-3 py-1 rounded mb-4 max-w-fit">
                  {blog.category}
                </span>
  
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {blog.title}
                </h2>
                <p className="text-gray-500 text-sm mb-4">{blog.date}</p>
                <div className="flex items-center text-gray-500 text-sm space-x-4">
                  <span>👁 {blog.views}</span>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
  
};

export default BlogCarousel;
