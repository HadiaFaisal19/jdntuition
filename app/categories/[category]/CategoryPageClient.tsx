"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  _id: string;
  Image: string;
  title: string;
  category: string;
  date: string;
}

interface Props {
  category: string;
}

const CategoryPageClient = ({ category }: Props) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`/api/blog?category=${category.toLowerCase().replace(/\s+/g, "-")}`);
        setBlogs(response.data.blogs);
      } catch (err) {
        setError("Failed to load blogs");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [category]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });

    const getOrdinalSuffix = (day: number) => {
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
    return (
      <>
        <div className="text-lg font-bold">
          {day}
          {ordinalSuffix}
        </div>
        <div className="text-sm uppercase">{month}</div>
      </>
    );
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-[#17A4A5]">
      <section id="second-section">
        <div className="container pt-20 mx-auto">
          <h2 className="text-4xl font-bold text-white mb-2 text-center">
            {category}
          </h2>
          <div className="mx-auto border-b-4 mb-4 w-40"></div>

          {/* Category Tiles Section */}
          <section className="bg-[#17A4A5] flex justify-center">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <div key={blog._id} className="bg-white border rounded-lg shadow-lg w-96">
                    <div className="relative">
                      <Image
                        src={blog.Image}
                        alt={blog.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-white text-gray-800 font-bold px-2 py-1 text-center">
                        {formatDate(blog.date)}
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="lg:text-xl font-semibold text-gray-900 my-2">{blog.title}</h3>
                      <div className="mt-4">
                        <Link
                          href={`/categories/${category}/${blog._id}`}
                          className="text-[#17A4A5] text-sm font-semibold hover:underline"
                        >
                          CONTINUE READING
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white">No blogs found for this category.</p>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default CategoryPageClient;
