import Image from "next/image"; 
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTag } from "react-icons/fa";
import Link from "next/link";

export default function MostRecentArticles() {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    const ordinalSuffix = getOrdinalSuffix(day);
    return `${day}${ordinalSuffix} ${month} ${year}`;
  };

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        setIsLoading(true); // Start loading
        const response = await axios.get("/api/blog");
        const blogs = response.data.blogs;
        const filteredBlogs = blogs.filter((blog) => blog.isMostRead);
        setLatestBlogs(filteredBlogs);
        setIsLoading(false); // End loading
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
        setIsLoading(false); // End loading even on error
      }
    };
    fetchLatestBlogs();
  }, []);

  const formatCategory = (category) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "); 
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            <span className="text-[#17A4A5]">Top</span> Reads
          </h2>
          <div className="mx-auto border-b-4 border-[#17A4A5] w-32"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {isLoading
            ? // Render skeletons if loading
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="relative w-full h-72 md:h-96 bg-gray-200 animate-pulse shadow-lg"
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-300"></div>
                  <div className="absolute top-2 left-2 w-1/3 h-8 bg-gray-400 rounded"></div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] h-20 bg-gray-400 rounded-lg shadow-md"></div>
                </div>
              ))
            : // Render blogs if not loading
              latestBlogs.map((post, index) => (
                <div
                  key={index}
                  className="relative w-full h-72 md:h-96 shadow-lg group transition-transform duration-300 ease-in-out"
                >
                  <Link href={`/categories/${post.category}/${post._id}`} passHref>
                    
                      <div className="absolute top-0 left-0 w-full h-full">
                        <Image
                          src={post.Image}
                          alt={post.title}
                          layout="fill"
                          objectFit="cover"
                          className="absolute w-full h-full transition-transform duration-300 ease-in-out"
                        />
                      </div>
                      <div className="absolute top-0 left-0 w-full h-full bg-[#0F7A7A] scale-x-0 origin-center opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-50 group-hover:scale-x-100"></div>
                      <div className="absolute top-2 left-2 bg-[#17A4A5] text-white text-sm font-medium px-3 py-1 rounded shadow-md">
                        {formatDate(post.date)}
                      </div>
                      <div
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] bg-white px-6 py-4 shadow-lg border-t-4 border-[#17A4A5] 
                        z-20 transition-all duration-300 ease-in-out group-hover:translate-y-[-20px] group-hover:border-l-4 group-hover:border-r-4 group-hover:border-b-4"
                      >
                        <h3 className="text-lg font-bold text-gray-800 mt-2 mb-2">
                          {post.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 font-medium mb-4">
                          <FaTag className="fas fa-tag text-[#17A4A5] mr-2" />
                          {formatCategory(post.category)}
                        </div>
                      </div>
                  </Link>
                </div>
              ))}
        </div>

        {/* See All Blogs Button */}
        <div className="text-center mt-8">
          <Link
            href="/blog/all-blogs"
            className="mt-6 relative inline-block px-8 py-4 text-xl font-semibold text-white bg-[#17A4A5] rounded shadow-lg overflow-hidden group w-fit"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#145D5E] via-[#17A4A5] to-[#1BB6B7] transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0"></span>
            <span className="absolute inset-0 w-full h-full bg-[#17A4A5] transition-all duration-300 ease-out group-hover:bg-opacity-0"></span>
            <span className="relative group-hover:translate-x-2 transition-transform duration-300">
              See All Blogs
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
