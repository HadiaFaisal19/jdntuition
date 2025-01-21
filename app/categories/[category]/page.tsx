import CategoryPageClient from "./CategoryPageClient";

interface Props {
  params: Promise<{ category: string }>;
}

// Server Component
const CategoryPage = async ({ params }: Props) => {
  const { category } = await params; // Await the params to destructure the category

  // Fetch blogs on the server side, passing the category parameter
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog?category=${category}`);
  const data = await response.json();

  // Map category format to display-friendly format
  const formattedCategory = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Filter blogs based on category
  const filteredBlogs = data.blogs.filter(
    (blog: { category: string }) => blog.category.toLowerCase() === category.toLowerCase()
  );

  return <CategoryPageClient category={formattedCategory} blogs={filteredBlogs} />;
};

export default CategoryPage;
