import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTag } from "react-icons/fa";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  category: string;
  date: string;
  Image: string;
  isMostRead: number;
}

export default function MostRecentArticles() {
  const [mostReadBlogs, setMostReadBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMostReadBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/blog");
        const blogs: Blog[] = response.data.blogs;

        // Sort blogs by `isMostRead` count in descending order
        const sortedBlogs = blogs.sort((a, b) => b.isMostRead - a.isMostRead);
        setMostReadBlogs(sortedBlogs.slice(0, 6)); // Display top 6 most-read blogs
      } catch (error) {
        console.error("Error fetching most read blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMostReadBlogs();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  };

  const getOrdinalSuffix = (day: number): string => {
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

  const handleBlogClick = async (id: string) => {
    try {
      await axios.patch("/api/blog", { id });
    } catch (error) {
      console.error("Error updating blog clicks:", error);
    }
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
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="relative w-full h-72 md:h-96 bg-gray-200 animate-pulse shadow-lg"
                ></div>
              ))
            : mostReadBlogs.map((post) => (
                <div
                  key={post._id}
                  className="relative mt-4 w-full h-72 md:h-96 shadow-lg group transition-transform duration-300 ease-in-out"
                >
                  <Link href={`/categories/${post.category}/${post._id}`} passHref
                  onClick={() => handleBlogClick(post._id)}>
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
                      <h3 className="text-lg font-bold text-gray-800 mt-2 mb-2">{post.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 font-medium mb-4">
                        <FaTag className="text-[#17A4A5] mr-2" />
                        {post.category}
                      </div>
                      {/* <div className="flex items-center text-sm text-gray-500 font-medium">
                        <FaEye className="text-[#17A4A5] mr-2" />
                        {post.isMostRead} Views
                      </div> */}
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
