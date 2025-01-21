import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/blogModel";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

// Handle POST (Add Blog)
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, Image, category, description, isLatest, isMostRead, isFeatured, date, content } = reqBody;

    if (!title || !Image || !category ) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newBlog = new Blog({
      title,
      Image,
      category,
      description,
      isLatest,
      isMostRead,
      isFeatured,
      date: date || new Date(),
      content,
    });

    const savedBlog = await newBlog.save();

    return NextResponse.json({ message: "Blog added successfully", blog: savedBlog }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



// Handle GET (Fetch Blogs)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let filter = {};
    if (category) {
      filter = { category }; // Filter blogs by category if provided
    }

    const blogs = await Blog.find(filter); // Fetch blogs matching the filter
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



// Handle PUT (Update Blog)
export async function PUT(request) {
  try {
      const reqBody = await request.json();
      const { id, title, Image, category, description, isLatest, isMostRead, isFeatured, date, content } = reqBody;

      const updatedBlog = await Blog.findByIdAndUpdate(
          id,
          { title, Image, category, description, isLatest, isMostRead, isFeatured, date, content },
          { new: true }
      );

      return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error) {
      return NextResponse.json({ success: false, error: error.message });
  }
}

// Handle DELETE (Delete Blog)
export async function DELETE(request: NextRequest) {
  try {
    const id = new URL(request.url).searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
