import { notFound } from "next/navigation"
import CategoryPageClient from "./CategoryPageClient"

interface Props {
  params: { category: string }
}

async function getBlogs(category: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://jdntuition-596yvk2hw-hadia-faisals-projects.vercel.app"
  const res = await fetch(`${apiUrl}/api/blog?category=${category}`, { next: { revalidate: 3600 } })

  if (!res.ok) {
    throw new Error("Failed to fetch blogs")
  }

  return res.json()
}

export default async function CategoryPage({ params }: Props) {
  const { category } = params

  try {
    const data = await getBlogs(category)

    const formattedCategory = category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    // Assuming the API now returns filtered results
    const filteredBlogs = data.blogs

    if (filteredBlogs.length === 0) {
      notFound()
    }

    return <CategoryPageClient category={formattedCategory} blogs={filteredBlogs} />
  } catch (error) {
    console.error("Error fetching blogs:", error)
    throw new Error("Failed to load blogs")
  }
}

