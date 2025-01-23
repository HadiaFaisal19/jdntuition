import CategoryPageClient from "./CategoryPageClient";

interface Props {
  params: { category: string };
}

// Server Component (Passing category to client component)
const CategoryPage = ({ params }: Props) => {
  const { category } = params;

  // Format category string for display
  const formattedCategory = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return <CategoryPageClient category={formattedCategory} />;
};

export default CategoryPage;
