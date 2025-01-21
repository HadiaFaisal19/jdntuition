import { type NextRequest, NextResponse } from "next/server"
import Blog from "@/models/blogModel"
import { connectDB } from "@/dbConfig/dbConfig"
import mongoose from "mongoose"

connectDB()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({ error: "Blog ID not provided" }, { status: 400 })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Blog ID" }, { status: 400 })
    }

    const blog = await Blog.findById(id)
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error("Error in GET /api/blog/:id:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

