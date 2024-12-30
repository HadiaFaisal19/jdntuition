"use client";

import BlogCarousel from "@/components/Blog/section1/section1";
import Header from "@/components/Blog/header/header";
import Section1 from "@/components/Blog/section1/section1";
import WhyParents from "@/components/Subjects/WhyParents/WhyParents";
import Categories from "@/components/Blog/Categories/Categories";
import MostReadBlogs from "@/components/Blog/MostReadBlogs/MostReadBlogs";
import LatestBlogs from "@/components/Blog/LatestBlogs/LatestBlogs";
import CategoryTiles from "@/components/Blog/CategoryTiles/CategoryTiles";

const Blog = () => {
  return (
    <div>
      <CategoryTiles/>
      {/* header */}
      <Header backgroundImage="/images/blog.png"/>
      
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
