"use client";

import BlogCarousel from "@/components/Blog/section1/section1";
import LatestBlogs from "@/components/Blog/LatestBlogs/LatestBlogs";
import BlogSection from "@/components/Blog/BlogTiles/BlogTiles";
import MostRecentArticles from "@/components/Blog/MostRecentArticles/MostRecentArticles";

const Blog = () => {
  return (
    <div className="bg-gray-100" >
      {/* header */}
      <BlogSection selectedCategory="all"/>
      <BlogCarousel/>
      {/* section 1 */}
      {/* <FeaturedSection/> */}
      <div id="MostRecentBlogs" className="border-b-4 border-white">
  <MostRecentArticles />
</div>
<br/>
<div id="LatestBlogs">
  <LatestBlogs />
</div>

      {/* <WhyParents/> */}
    </div>
  );
};

export default Blog;
