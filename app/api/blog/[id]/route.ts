import { NextResponse } from "next/server";
import Blog from "@/models/blogModel";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Directly access the id from params

    if (!id) {
      return NextResponse.json({ error: "Blog ID not provided" }, { status: 400 });
    }

    const blog = await Blog.findById(id); // Fetch blog by ID
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
