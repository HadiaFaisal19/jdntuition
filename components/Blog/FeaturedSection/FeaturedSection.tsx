import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { FaArrowLeft, FaArrowRight, FaTag, FaCalendarAlt } from "react-icons/fa";

export default function WhyChooseUs() {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const response = await axios.get("/api/blog");
        const blogs = response.data.blogs;
        const filteredBlogs = blogs.filter((blog) => blog.isFeatured);
        setFeaturedBlogs(filteredBlogs);
      } catch (error) {
        console.error("Error fetching featured blogs:", error);
      }
    };

    fetchFeaturedBlogs();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        featuredBlogs.length > 0 ? (prevIndex + 1) % featuredBlogs.length : 0
      );
    }, 20000);

    return () => clearInterval(interval);
  }, [featuredBlogs]);

  if (featuredBlogs.length === 0) {
    return null;
  }

  const currentBlog = featuredBlogs[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredBlogs.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % featuredBlogs.length
    );
  };

  return (
    <section
      className="relative bg-gradient-to-r from-[#138F8F] via-[#17A4A5] to-[#19B5B5] text-white py-16"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-12 gap-8">
        {/* Left Section */}
        <div
          key={currentBlog._id}
          className="flex-1 transition-opacity duration-500 ease-in-out"
        >
          <div className="flex justify-start gap-4 mb-4">
            <button
              onClick={handlePrev}
              className="text-white bg-gray-400 opacity-90 p-2 rounded-full hover:bg-[#15A0A0] transition-colors duration-300"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={handleNext}
              className="text-white bg-gray-400 opacity-90 p-2 rounded-full hover:bg-[#15A0A0] transition-colors duration-300"
            >
              <FaArrowRight />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <FaTag className="text-xl text-gray-200" />
            <h3 className="text-gray-800 text-xl font-bold">
              {currentBlog.category}
            </h3>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-snug">
  {currentBlog.title}
</h1>
<p className="text-lg text-gray-200 mb-6">
  {currentBlog.description}
</p>

          <div className="flex items-center gap-2 mb-6">
            <FaCalendarAlt className="text-xl text-gray-200" />
            <p className="text-gray-300">
              {new Date(currentBlog.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <button className="px-6 py-3 bg-white text-[#17A4A5] text-lg font-bold uppercase rounded shadow-lg transition-transform duration-300 hover:-translate-x-4">
            Read More
          </button>
        </div>

        <div className="relative flex-1">
          <div className="relative overflow-hidden">
            <Image
              src={currentBlog.Image}
              alt="Blog Image"
              width={600}
              height={600}
              className="rounded-lg"
            />
          </div>

          <div className="absolute bottom-8 right-8 bg-[#17A4A5]/80 text-white rounded-lg shadow-lg p-4 flex flex-col items-center animate-bounce-slow">
            <h2 className="text-4xl font-bold">Featured</h2>
            <p className="text-center text-lg font-medium">Blogs</p>
          </div>
        </div>
      </div>
    </section>
  );
}
