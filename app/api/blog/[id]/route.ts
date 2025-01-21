import { NextResponse } from "next/server";
import Blog from "@/models/blogModel";
import { connectDB } from "@/dbConfig/dbConfig";
import mongoose from "mongoose"; // Ensure mongoose is imported

connectDB();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
){
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Blog ID not provided" }, { status: 400 });
    }

    // Convert string ID to ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Blog ID" }, { status: 400 });
    }

    const blog = await Blog.findById(id); // Fetch the blog by ID
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/blog/:id:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
