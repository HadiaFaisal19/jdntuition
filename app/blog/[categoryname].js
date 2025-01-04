import { useRouter } from "next/router";

const BlogCategoryPage = () => {
  const router = useRouter();
  const { categoryname } = router.query;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Blogs for: {categoryname}</h1>
      <p>Display the blogs for the category here...</p>
    </div>
  );
};

export default BlogCategoryPage;
