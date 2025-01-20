"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BlogSectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const router = useRouter();

  // Scroll to a specific section within the current page
  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle tile click logic for navigation and scrolling
  const handleTileClick = (title: string) => {
    switch (title) {
      case "LATEST POSTS":
        scrollToSection("LatestBlogs");
        break;
      case "TOP READS":
        scrollToSection("MostRecentBlogs");
        break;
      case "Academic Success":
        router.push(`/categories/academic-success`);
        break;
      case "Exam Preparation":
        router.push(`/categories/exam-preparation`);
        break;
      case "Student Wellbeing":
        router.push(`/categories/student-wellbeing`);
        break;
      case "Parent Support":
        router.push(`/categories/parent-support`);
        break;
      case "Success Stories":
        router.push(`/categories/success-stories`);
        break;
      case "Learning Resources":
        router.push(`/categories/learning-resources`);
        break;
      default:
        router.push("/blog/all-blogs");
    }
  };
  

  // Define tiles data
  const tiles = [
    { src: "/images/2.png", title: "Academic Success" },
    { src: "/images/online.jpg", title: "Exam Preparation" },
    { src: "/images/college.jpg", title: "Student Wellbeing" },
    { src: "/images/maths.jpg", title: "LATEST POSTS" },
    { src: "/images/blog.png", title: "BLOG" },
    { src: "/images/yess.jpg", title: "TOP READS" },
    { src: "/images/kg.jpg", title: "Parent Support" },
    { src: "/images/maths.jpg", title: "Success Stories" },
    { src: "/images/seniors.png", title: "Learning Resources" },
  ];

  return (
    <section className="w-full h-screen grid grid-rows-3 grid-cols-3 gap-1">
      {tiles.map((tile, index) => (
        <div
          key={index}
          className="relative flex items-center justify-center text-white p-4 overflow-hidden group cursor-pointer"
          onClick={() => handleTileClick(tile.title)}
        >
          <Image
            src={tile.src}
            alt={tile.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <h3
            className={`z-10 ${
              tile.title === selectedCategory ? "text-[#17A4A5] text-4xl underline" : ""
            } ${
              tile.title === "BLOG"
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
