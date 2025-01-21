"use client";

import React from "react";
import Image from "next/image";

const CategoryTiles = () => {

  return (
    <section className="p-6 bg-gray-100 flex justify-center">
      <div className="grid grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white border rounded-lg shadow-lg overflow-hidden w-96"
          >
            {/* Blog Image */}
            <div className="relative">
              {/* Image */}
              <Image
                src={blog.image}
                alt={blog.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />

              {/* Date */}
              <div className="absolute top-2 left-2 bg-white text-gray-800 font-bold px-2 py-1 text-center">
                <div className="text-lg">{blog.date.split(" ")[0]}</div>
                <div className="text-xs uppercase">{blog.date.split(" ")[1]}</div>
              </div>

              {/* Categories */}
              <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 bg-[#17A4A5] text-white text-xs uppercase px-6 py-1 rounded">
                {blog.categories}
              </div>
            </div>

            {/* Blog Content */}
            <div className="p-4 text-center">
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 my-2">
                {blog.title}
              </h3>

              {/* Continue Reading */}
              <div className="mt-4">
                <a
                  href="#"
                  className="text-[#17A4A5] text-sm font-semibold hover:underline"
                >
                  CONTINUE READING
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryTiles;
