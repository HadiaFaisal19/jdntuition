import CategoryPageClient from "./CategoryPageClient";

interface Props { params: Promise<{ category: string }> }

// Server Component (Passing category to client component)
const CategoryPage = async ({ params }: Props) => { const { category } = await params // Await the params to destructure the category

  // Format category string for display
  const formattedCategory = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return <CategoryPageClient category={formattedCategory} />;
};

export default CategoryPage;
