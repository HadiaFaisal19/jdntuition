"use client";

import BlogSection from "@/components/Blog/BlogTiles/BlogTiles";
import CategoryTiles from "@/components/categories/Tiles/Tiles";

const Blog = () => {
  return (
    <div>
      {/* header */}
      <BlogSection/>
      {/* section 1 */}

     <CategoryTiles/>
    </div>
  );
};

export default Blog;
