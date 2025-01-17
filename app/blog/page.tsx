"use client";

import BlogCarousel from "@/components/Blog/section1/section1";
import Header from "@/components/Blog/header/header";
import Section1 from "@/components/Blog/section1/section1";
import WhyParents from "@/components/Subjects/WhyParents/WhyParents";
import LatestBlogs from "@/components/Blog/LatestBlogs/LatestBlogs";
import BlogSection from "@/components/Blog/BlogTiles/BlogTiles";
import MostRecentArticles from "@/components/Blog/MostRecentArticles/MostRecentArticles";
import TopPostsSection from "@/components/Blog/MostRecentArticles/MostRecentArticles";
import FeaturedSection from "@/components/Blog/FeaturedSection/FeaturedSection";

const Blog = () => {
  return (
    <div>
      {/* header */}
      <BlogSection/>
      <BlogCarousel/>
      {/* section 1 */}
      {/* <FeaturedSection/> */}
      <div id="MostRecentBlogs">
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
