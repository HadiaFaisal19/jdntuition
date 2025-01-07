import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/blogModel";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

// Handle POST (Add Blog)
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, topic, Image, category, isLatest, isMostRead, isFeatured, date } = reqBody;

    if (!title || !topic || !Image || !category) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newBlog = new Blog({
      title,
      topic,
      Image,
      category,
      isLatest,
      isMostRead,
      isFeatured,
      date: date || new Date(),
    });

    const savedBlog = await newBlog.save();

    return NextResponse.json({ message: "Blog added successfully", blog: savedBlog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle GET (Fetch Blogs)
export async function GET() {
  try {
    const blogs = await Blog.find();
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle PUT (Update Blog)
export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id, title, topic, Image, category, isLatest, isMostRead } = reqBody;

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, topic, Image, category, isLatest, isMostRead },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog updated successfully", blog: updatedBlog }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
