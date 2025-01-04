"use client";

import BlogCarousel from "@/components/Blog/section1/section1";
import Header from "@/components/Blog/header/header";
import Section1 from "@/components/Blog/section1/section1";
import WhyParents from "@/components/Subjects/WhyParents/WhyParents";
import Categories from "@/components/Blog/Categories/Categories";
import MostReadBlogs from "@/components/Blog/MostReadBlogs/MostReadBlogs";
import LatestBlogs from "@/components/Blog/LatestBlogs/LatestBlogs";
import BlogSection from "@/components/Blog/BlogTiles/BlogTiles";

const Blog = () => {
  return (
    <div>
      {/* header */}
      <BlogSection/>
      {/* section 1 */}

     <BlogCarousel/>
     <Categories />
     <MostReadBlogs/>
     <LatestBlogs/>
      <WhyParents/>
    </div>
  );
};

export default Blog;
