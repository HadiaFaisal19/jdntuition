import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function TopPostsSection() {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to format the date
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

  // Function to format the category
  const formatCategory = (category) => {
    return category
      .split("-") // Split by hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "); // Join words with spaces
  };

  // Fetch latest blogs
  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        setIsLoading(true); // Start loading
        const response = await axios.get("/api/blog"); // Replace with your API endpoint
        const blogs = response.data.blogs;
        // Filter blogs that have isLatest set to true
        const filteredBlogs = blogs.filter((blog) => blog.isLatest);
        setLatestBlogs(filteredBlogs);
        setIsLoading(false); // End loading
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
        setIsLoading(false); // End loading even on error
      }
    };

    fetchLatestBlogs();
  }, []);

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Centered Heading */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            <span className="text-[#17A4A5]">Latest</span> Posts
          </h2>
          <div className="mx-auto border-b-4 border-[#17A4A5] w-20"></div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {isLoading
            ? // Render skeletons if loading
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="relative w-full h-72 md:h-96 overflow-hidden shadow-lg bg-gray-200 animate-pulse"
                >
                  {/* Skeleton content */}
                  <div className="absolute inset-0 bg-gray-300"></div>
                  <div className="absolute bottom-4 left-0 w-[95%] bg-gray-400 h-16 rounded"></div>
                </div>
              ))
            : // Render blogs if not loading
              latestBlogs.map((post, index) => (
                <Link
                  key={index}
                  href={`/categories/${post.category}/${post._id}`} // Dynamic URL for each blog
                  passHref
                >
                  <div
                    className="relative w-full h-72 md:h-96 overflow-hidden shadow-lg group cursor-pointer"
                  >
                    {/* Background Image with Hover Effect */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                      <Image
                        src={post.Image}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="absolute w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
                      />
                    </div>

                    {/* Content Card */}
                    <div className="border-r-4 border-[#17A4A5] absolute bottom-4 left-0 w-[95%] bg-white px-4 py-2 shadow-md">
                      <span className="text-[#17A4A5] text-sm font-semibold">
                        {formatCategory(post.category)}
                      </span>
                      <h3 className="text-lg font-bold text-gray-800 mt-2 mb-4">
                        {post.title}
                      </h3>
                      <div className="flex items-center text-sm">
                        {/* Date */}
                        <div className="flex items-center text-[#17A4A5]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5 mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 4h10M5 21h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-gray-500">
                            {formatDate(post.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        {/* View All Blogs Button */}
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
