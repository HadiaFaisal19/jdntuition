import React from "react";
import Image from "next/image";

const MostReadBlogs = () => {
  const blogs = [
    { id: 1, imageUrl: "/images/maths.jpg", title: "Blog 1", date: "24th December 2024", category: "Tutor", author: "By Admin" },
    { id: 2, imageUrl: "/images/kg.jpg", title: "Blog 2", date: "24th December 2024", category: "Academics", author: "John Doe" },
    { id: 3, imageUrl: "/images/online.jpg", title: "Blog 3", date: "24th December 2024", category: "Homework", author: "By Admin" },
    { id: 4, imageUrl: "/images/maths.jpg", title: "Blog 1", date: "24th December 2024", category: "Tutor", author: "By Admin" },
    { id: 5, imageUrl: "/images/kg.jpg", title: "Blog 2", date: "24th December 2024", category: "Academics", author: "John Doe" },
    { id: 6, imageUrl: "/images/online.jpg", title: "Blog 3", date: "24th December 2024", category: "Homework", author: "By Admin" },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white-100 py-12">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            <span className="text-[#17A4A5]">Most Read</span> Blogs
          </h2>
          <div className="mx-auto px-16 border-b-4 border-[#17A4A5] w-20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              {/* Blog Image */}
              <div className="relative w-full h-64">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  layout="fill"
                  objectFit="cover"
                  className="transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Blog Details */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-sm">{` • ${blog.date} • ${blog.category}`}</p>
              </div>
              {/* Expanding Line Effect */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-[#17A4A5] transition-all duration-500 group-hover:w-full group-hover:h-0.5">
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-2 bg-[#17A4A5] transition-transform duration-500 group-hover:translate-y-full"></div>
                  <div className="w-full h-2 bg-[#17A4A5] transition-transform duration-500 group-hover:-translate-y-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostReadBlogs;
