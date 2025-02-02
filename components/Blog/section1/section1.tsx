import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MdOutlineDateRange } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

// Define Type for Blog
interface Blog {
  _id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  Image: string;
  isFeatured: boolean;
}

// Skeleton Loader for Blogs
const SkeletonLoader = () => {
  return (
    <div className="flex flex-col md:flex-row items-center min-h-[80vh] w-full rounded-lg overflow-hidden bg-gray-200 animate-pulse">
      <div className="w-full md:w-1/2 min-h-[50vh] bg-gray-300"></div>
      <div className="w-full md:w-1/2 px-4 flex flex-col justify-center min-h-[50vh] bg-gray-200">
        <div className="h-6 w-24 bg-gray-400 rounded mb-4"></div>
        <div className="h-8 w-3/4 bg-gray-400 rounded mb-4"></div>
        <div className="h-20 w-full bg-gray-400 rounded mb-4"></div>
        <div className="h-6 w-32 bg-gray-400 rounded mb-4"></div>
        <div className="h-10 w-40 bg-gray-500 rounded"></div>
      </div>
    </div>
  );
};

const BlogCarousel = () => {
  // Define types for state variables
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Define type for the carousel responsive layout
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blog");
        const blogs: Blog[] = response.data.blogs;
        const featured = blogs.filter((blog) => blog.isFeatured);
        setFeaturedBlogs(featured);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <section className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 overflow-hidden">
        <div className="text-center my-6 mt-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            <span className="text-[#17A4A5]">Loading</span> Featured Posts
          </h2>
          <div className="mx-auto border-b-4 border-[#17A4A5] w-32 mb-2"></div>
        </div>
        <SkeletonLoader />
      </section>
    );
  }

  if (featuredBlogs.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No featured blogs available.
      </p>
    );
  }

  const handleBlogClick = async (id: string) => {
    try {
      await axios.patch("/api/blog", { id });
    } catch (error) {
      console.error("Error updating blog clicks:", error);
    }
  };

  return (
    <section
  className="relative min-h-screen w-full flex flex-col items-center justify-center bg-fixed bg-center bg-cover bg-no-repeat overflow-hidden"
  
>
  <div className="text-center my-6 mt-8 bg-opacity-70 rounded">
    <h2 className="text-4xl font-bold text-gray-800 mb-4">
      <span className="text-[#17A4A5]">Featured</span> Posts
    </h2>
    <div className="mx-auto border-b-4 border-[#17A4A5] w-32 mb-2"></div>
  </div>

  <div className="w-full z-10   p-6 rounded overflow-hidden"
  style={{
    backgroundImage:
      "url('https://images.pexels.com/photos/29509451/pexels-photo-29509451/free-photo-of-2025-agenda-planner-with-pen-on-desk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover", // Adjust to "contain" if needed
    backgroundPosition: "center", // Ensures the image stays centered
  }}>
    <Carousel
      responsive={responsive}
      autoPlay={true}
      autoPlaySpeed={3000}
      infinite={true}
      showDots={true}
      containerClass="carousel-container h-full w-full"
      itemClass="carousel-item flex items-center justify-center h-full w-full"
    >
      {featuredBlogs.map((blog: Blog) => (
        <div
          key={blog._id}
          className="flex flex-col md:flex-row items-center min-h-[80vh] w-full rounded-lg overflow-hidden"
        >
          <div className="w-full md:w-1/2 relative min-h-[50vh] bg-white bg-opacity-70">
            <Image
              src={blog.Image}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>

          <div className="w-full md:w-1/2 px-4 flex flex-col justify-center min-h-[50vh] bg-white bg-opacity-70">
            <span className="inline bg-[#17A4A5] text-white text-sm font-semibold px-3 py-1 rounded mb-4 max-w-fit">
              {blog.category}
            </span>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4 bg-[#F9F9F9] p-2 rounded-lg shadow-sm border border-gray-200">
              {blog.description}
            </p>
            <p className="flex items-center text-gray-500 text-sm mb-4">
              <MdOutlineDateRange className="mr-2 text-lg text-[#17A4A5]" />
              {new Date(blog.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <Link href={`/categories/${blog.category}/${blog._id}`} passHref
            onClick={() => handleBlogClick(blog._id)}>
              <button className="relative inline-block px-6 py-2 text-sm font-semibold text-white bg-[#17A4A5] rounded shadow-lg overflow-hidden group w-fit">
                
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#145D5E] via-[#17A4A5] to-[#1BB6B7] transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0"></span>
                <span className="absolute inset-0 w-full h-full bg-[#17A4A5] transition-all duration-300 ease-out group-hover:bg-opacity-0"></span>
                <span className="relative group-hover:translate-x-2 transition-transform duration-300">
                  Read More
                </span>
              </button>
            </Link>
          </div>
        </div>
      ))}
    </Carousel>
  </div>
</section>

  );
};
export default BlogCarousel;