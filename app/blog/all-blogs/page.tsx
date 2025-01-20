"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsFilterLeft } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

interface Blog {
  title: string;
  category: string;
  date: string;
  image: string;
  mostRead: boolean;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [direction, setDirection] = useState<string>("");

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      const sortedBlogs = response.data.blogs.sort(
        (a: Blog, b: Blog) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setBlogs(sortedBlogs);
      setFilteredBlogs(sortedBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleFilterChange = (filter: string) => {
    const currentDate = new Date();
    const filtered = blogs.filter((blog) => {
      const blogDate = new Date(blog.date);
      switch (filter) {
        case "today":
          return (
            blogDate.getDate() === currentDate.getDate() &&
            blogDate.getMonth() === currentDate.getMonth() &&
            blogDate.getFullYear() === currentDate.getFullYear()
          );
        case "thisMonth":
          return blogDate.getMonth() === currentDate.getMonth() &&
            blogDate.getFullYear() === currentDate.getFullYear();
        case "thisYear":
          return blogDate.getFullYear() === currentDate.getFullYear();
        case "previousYear":
          return blogDate.getFullYear() === currentDate.getFullYear() - 1;
        default:
          return true;
      }
    });
    setFilteredBlogs(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const searchedBlogs = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBlogs(searchedBlogs);
  };

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, right, top, bottom } = e.currentTarget.getBoundingClientRect();

    if (clientX < left + 50) setDirection("left");
    else if (clientX > right - 50) setDirection("right");
    else if (clientY < top + 50) setDirection("top");
    else if (clientY > bottom - 50) setDirection("bottom");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCategory = (category) => {
    return category
      .split("-") // Split by hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "); // Join words with spaces
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#17A4A5] via-[#106F70] to-gray-600 text-white">
      <div className="container mx-auto py-10">
        <h2 className="text-5xl font-bold text-center mt-16 mb-8">All Blogs</h2>

        {/* Filter and Search Section */}
        <div className="flex justify-between items-center mb-8">
          {/* Filter and Search Buttons */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="px-4 py-2 bg-gray-200 text-[#17A4A5] rounded"
              >
                <BsFilterLeft className="font-bold" />
              </button>
              {showDropdown && (
                <div className="absolute left-0 top-full mt-2 flex space-x-4 bg-white text-black rounded shadow-md z-10">
                  <button
                    onClick={() => {
                      setFilter("all");
                      handleFilterChange("all");
                    }}
                    className={`px-4 py-2 ${filter === "all" ? "text-[#17A4A5]" : ""}`}
                  >
                    All Blogs
                  </button>
                  <button
                    onClick={() => {
                      setFilter("thisMonth");
                      handleFilterChange("thisMonth");
                    }}
                    className={`px-4 py-2 ${filter === "thisMonth" ? "text-[#17A4A5]" : ""}`}
                  >
                    This Month
                  </button>
                  <button
                    onClick={() => {
                      setFilter("thisYear");
                      handleFilterChange("thisYear");
                    }}
                    className={`px-4 py-2 ${filter === "thisYear" ? "text-[#17A4A5]" : ""}`}
                  >
                    This Year
                  </button>
                  <button
                    onClick={() => {
                      setFilter("previousYear");
                      handleFilterChange("previousYear");
                    }}
                    className={`px-4 py-2 ${filter === "previousYear" ? "text-[#17A4A5]" : ""}`}
                  >
                    Previous Year
                  </button>
                </div>
              )}
            </div>

            {/* Search Button */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="px-4 py-2 bg-gray-200 text-[#17A4A5] rounded"
              >
                <FiSearch className="font-bold" />
              </button>
              {isSearchOpen && (
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="absolute left-full ml-2 px-4 py-2 w-64 bg-white text-black rounded shadow-md transition-all duration-300"
                />
              )}
            </div>
          </div>

          {/* Sort Buttons */}
          <div className="space-x-4">
            <button
              onClick={() => {
                setFilteredBlogs(
                  [...filteredBlogs].sort(
                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                );
              }}
              className="px-4 py-2 bg-gray-200 text-[#17A4A5] font-bold rounded"
            >
              Sort by Latest
            </button>
            <button
              onClick={() => {
                setFilteredBlogs([...filteredBlogs].filter((blog) => blog.mostRead));
              }}
              className="px-4 py-2 bg-[#17A4A5] text-white font-bold rounded"
            >
              Sort by Most Read
            </button>
          </div>
        </div>

        {/* Blog Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, index) => (
            <div
              key={index}
              className="relative group overflow-hidden cursor-pointer"
              onMouseEnter={handleHover}
              onMouseLeave={() => setDirection("")}
            >
              {/* Blog Image with Dark Overlay */}
              <div className="relative w-full h-60">
                <img
                  src={blog.Image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-45"></div>
              </div>

              {/* Display Title, Category, Date */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-lg font-semibold text-center">{blog.title}</h3>
                <p className="text-sm text-center">{formatCategory(blog.category)}</p>
                <span className="text-xs mt-1 text-center">{formatDate(blog.date)}</span>
              </div>

              {/* Hover Content (Read More Button) */}
              <div
                className={`absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 transform ${
                  direction === "top"
                    ? "translate-y-[-100%]"
                    : direction === "bottom"
                    ? "translate-y-[100%]"
                    : direction === "left"
                    ? "translate-x-[-100%]"
                    : direction === "right"
                    ? "translate-x-[100%]"
                    : ""
                } group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0`}
              >
                <button className="px-4 py-2 bg-[#17A4A5] text-white font-semibold rounded">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
