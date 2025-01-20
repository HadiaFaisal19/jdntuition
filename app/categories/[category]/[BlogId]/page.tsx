"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import axios from "axios";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn, FaEnvelope } from "react-icons/fa";


type Params = { category: string; BlogId: string };

const BlogDetailPage = ({ params }: { params: Promise<Params> }) => {
  const router = useRouter();
  const { BlogId } = use(params);

  const [blog, setBlog] = useState<any | null>(null);
  const [latestBlogs, setLatestBlogs] = useState<any[]>([]);
  const [mostReadBlogs, setMostReadBlogs] = useState<any[]>([]);

  const categories = [
    "Academic Success",
    "Exam Preparation",
    "Student Wellbeing",
    "Parent Support",
    "Success Stories",
    "Learning Resources",
  ];

  const handleTileClick = (title: string) => {
    switch (title) {
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
        break;
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog/${BlogId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    if (BlogId) {
      fetchBlog();
    }
  }, [BlogId]);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const response = await axios.get("/api/blog");
        const blogs = response.data.blogs;

        const filteredBlogs = blogs
          .filter((blog) => blog.isLatest)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        setLatestBlogs(filteredBlogs);
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      }
    };

    fetchLatestBlogs();
  }, []);

  useEffect(() => {
    const fetchMostReadBlogs = async () => {
      try {
        const response = await axios.get("/api/blog");
        const blogs = response.data.blogs;

        const filteredBlogs = blogs
          .filter((blog) => blog.isMostRead)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 5);

        setMostReadBlogs(filteredBlogs);
      } catch (error) {
        console.error("Error fetching most-read blogs:", error);
      }
    };

    fetchMostReadBlogs();
  }, []);

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-800 to-black">
        <p className="text-lg font-semibold text-gray-300">Loading blog...</p>
      </div>
    );
  }
  const formatCategory = (category) => {
    return category
      .split("-") // Split by hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "); // Join words with spaces
  };
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-[85%] mx-auto px-4">
        {/* Title Section */}
        <div className="text-center ">
          <div className="flex items-center justify-center space-x-4">
            <span className="mt-32 mb-4 p-2 bg-[#17A4A5]/80 text-sm font-medium text-gray-100 uppercase rounded">
            {formatCategory(blog.category)}
            </span>
            <span className="mt-32 mb-4 text-sm font-semibold text-gray-700">
              {new Date(blog.date).toDateString()}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-black leading-tight mb-8">
            {blog.title}
          </h1>
          <p className="text-lg text-gray-800 mb-6">{blog.description}</p>
          <p className="text-gray-600 text-base italic mb-8">
            Written By: <span className="text-[#17A4A5] font-bold">{blog.author}</span>
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full">
          <img
            src={blog.Image}
            alt={blog.title}
            className="w-full max-w-7xl mx-auto h-auto md:h-[75vh] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="max-w-[85%] mx-auto mt-16 flex flex-col lg:flex-row gap-8">
  {/* Main Content */}
  <div className="lg:flex-1 mb-16">
    <div
      className="prose text-black max-w-none"
      dangerouslySetInnerHTML={{ __html: blog.content }}
    />
  </div>

  {/* Sidebar */}
  <div className="lg:w-1/4 space-y-12">
    {/* Categories */}
    <div className="bg-[#17A4A5]/80 p-3 rounded-lg shadow">
      <h2 className="text-lg font-bold text-white mb-3">Categories</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleTileClick(category)}
            className="relative inline-block w-full text-left px-3 py-1.5 text-sm font-medium text-[#17A4A5] bg-white rounded shadow-lg overflow-hidden group transition"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white transition-all duration-300 ease-out group-hover:bg-opacity-0"></span>
            <span className="relative flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
  <MdKeyboardArrowRight />
  {category}
</span>

          </button>
        ))}
      </div>
    </div>

    {/* Blogs You May Like */}
    <div>
      <h2 className="text-xl font-bold text-white bg-gradient-to-r from-gray-700 to-[#17A4A5] px-4 py-2 rounded">
        Blogs You May Like
      </h2>
      <div className="mt-4 space-y-4">
        {mostReadBlogs.map((mostReadBlog) => (
          <div
            key={mostReadBlog._id}
            className="flex items-start space-x-4 bg-gray-700 p-4 rounded-lg shadow"
          >
            <img
              src={mostReadBlog.Image}
              alt={mostReadBlog.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h3 className="text-sm font-semibold text-gray-200">
                {mostReadBlog.title}
              </h3>
              {/* <p className="text-xs text-gray-400">
                {new Date(mostReadBlog.date).toDateString()}
              </p> */}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Latest Blogs */}
    <div>
      <h2 className="text-xl font-bold text-gray-800 border-b-4 border-[#17A4A5] pb-2">
        Latest Blogs
      </h2>
      <div className="mt-4 mb-8 space-y-4">
        {latestBlogs.map((recentBlog) => (
          <div
            key={recentBlog._id}
            className="flex items-start space-x-4 bg-gray-700 p-4 rounded-lg shadow"
          >
            <img
              src={recentBlog.Image}
              alt={recentBlog.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h3 className="text-sm font-semibold text-gray-200">
                {recentBlog.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* Share Section */}
{/* Share Section */}
<div className="mt-8 mb-16">
  <h2 className="text-lg font-bold text-gray-800 mb-4">Share This Blog</h2>
  <div className="flex space-x-4">
    {/* Facebook */}
    <a
      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      title="Share on Facebook"
    >
      <FaFacebookF className="w-6 h-6" />
    </a>

    {/* Instagram */}
    <a
      href={`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-full hover:opacity-80 transition"
      title="Share on Instagram"
    >
      <FaInstagram className="w-6 h-6" />
    </a>

    {/* WhatsApp */}
    <a
      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
      title="Share on WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6" />
    </a>

    {/* LinkedIn */}
    <a
      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
      title="Share on LinkedIn"
    >
      <FaLinkedinIn className="w-6 h-6" />
    </a>

    {/* Gmail */}
    <a
      href={`mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(`Check out this blog: ${window.location.href}`)}`}
      className="mb-8 flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
      title="Share via Email"
    >
      <FaEnvelope className="w-6 h-6"/>
    </a>
  </div>
</div>


  </div>
</div>

    </div>
  );
};

export default BlogDetailPage;
