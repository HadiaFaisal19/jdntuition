import { NextResponse } from "next/server";
import Blog from "@/models/blogModel";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

export async function GET(
  req: Request,
  context: { params: { id: string } } // Context includes params
) {
  try {
    const { params } = context;
    const { id } = await params; // Await params for proper handling

    if (!id) {
      return NextResponse.json({ error: "Blog ID not provided" }, { status: 400 });
    }

    const blog = await Blog.findById(id); // Fetch blog by ID
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
