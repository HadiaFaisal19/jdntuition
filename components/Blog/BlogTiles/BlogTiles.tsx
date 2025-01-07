"use client";

import React from "react";
import Image from "next/image";

const BlogSection = () => {
  const tiles = [
    { src: "/images/2.png", title: "Academic Success "},
    { src: "/images/online.jpg", title: "Exam Preparation" },
    { src: "/images/college.jpg", title: "Student Wellbeing" },
    { src: "/images/maths.jpg", title: "LATEST BLOGS" },
    { src: "/images/blog.png", title: "BLOGS" },
    { src: "/images/yess.jpg", title: "MOST READ BLOGS" },
    { src: "/images/kg.jpg", title: "Parent Support" }, 
    { src: "/images/maths.jpg", title: "Success Stories" },
    { src: "/images/seniors.png", title: "Learning Resources" },
  ];

  return (
    <section className="w-full h-screen grid grid-rows-3 grid-cols-3 gap-0">
      {tiles.map((tile, index) => (
        <div
          key={index}
          className="cursor-pointer relative flex items-center justify-center text-white p-4 overflow-hidden group"
        >
          {/* Next.js Image */}
          <Image
            src={tile.src}
            alt={tile.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-110"
            priority={index === 0} // Prioritize the first image for faster load
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black opacity-55"></div>
          {/* Title */}
          <h3
            className={`z-10 ${
              tile.title === "BLOGS"
                ? "sm:text-3xl md:text-5xl lg:text-7xl font-bold"
                : "text-xl font-bold"
            }`}
          >
            {tile.title}
          </h3>
        </div>
      ))}
    </section>
  );
};

export default BlogSection;
