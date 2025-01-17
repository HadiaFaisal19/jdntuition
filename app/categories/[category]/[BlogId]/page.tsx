"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import axios from "axios";

type Params = { category: string; BlogId: string };

const BlogDetailPage = ({ params }: { params: Promise<Params> }) => {
  const { BlogId } = use(params);

  const [blog, setBlog] = useState<any | null>(null);
  const [latestBlogs, setLatestBlogs] = useState<any[]>([]);
  const [mostReadBlogs, setMostReadBlogs] = useState<any[]>([]);

  // Fetch blog details
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

  // Fetch latest blogs in descending order
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

  // Fetch most read blogs in ascending order
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#17A4A5] via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title Section */}
        <div className=" ">
          {/* Category and Date */}
          <div className="flex items-center space-x-4 ">
            <span className="mt-32 mb-4 p-2 bg-black/60 text-sm font-medium text-gray-300 uppercase rounded">
              {blog.category}
            </span>
            <span className="mt-32 mb-4 text-sm font-semibold text-gray-300">
              {new Date(blog.date).toDateString()}
            </span>
          </div>
          {/* Blog Title */}
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-10">
            {blog.title}
          </h1>
        </div>

        {/* Image Section */}
        <div className="w-full">
  <img
    src={blog.Image}
    alt={blog.title}
    className="w-full max-w-7xl mx-auto h-auto md:h-[75vh] object-cover rounded-lg shadow-lg"
    style={{ padding: "0 16px" }}
  />
</div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:flex-1 mb-16">
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 space-y-12">
          {/* Latest Blogs */}
          <div>
            <h2 className="text-xl font-bold text-white bg-gradient-to-r from-gray-700 to-[#17A4A5] px-4 py-2 rounded">
              Blogs You May Like
            </h2>
            <div className="mt-4 space-y-4">
              {latestBlogs.map((recentBlog) => (
                <div key={recentBlog.id} className="flex items-start space-x-4 bg-gray-800 p-4 rounded-lg shadow">
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

          {/* Most Read Blogs */}
          <div>
            <h2 className="text-xl font-bold text-white border-b-4 border-[#17A4A5] pb-2">
              Most Read Blogs
            </h2>
            <div className="mt-4 space-y-4">
              {mostReadBlogs.map((mostReadBlog) => (
                <div key={mostReadBlog.id} className="flex items-start space-x-4 bg-gray-800 p-4 rounded-lg shadow">
                  <img
                    src={mostReadBlog.Image}
                    alt={mostReadBlog.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-200">
                      {mostReadBlog.title}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {new Date(mostReadBlog.date).toDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
