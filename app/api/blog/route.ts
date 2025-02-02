import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/blogModel";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, Image, category, description, isLatest, isMostRead, isFeatured, date, content } = reqBody;

    if (!title || !Image || !category) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newBlog = new Blog({
      title,
      Image,
      category,
      description,
      isLatest,
      isMostRead: isMostRead ||0,
      isFeatured,
      date: date || new Date(),
      content,
    });

    const savedBlog = await newBlog.save();

    return NextResponse.json({ message: "Blog added successfully", blog: savedBlog }, { status: 201 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Handle GET (Fetch Blogs)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let filter = {};
    if (category) {
      filter = { category };
    }

    const blogs = await Blog.find(filter);
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Handle PUT (Update Blog)
export async function PUT(request: NextRequest) {
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
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message });
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
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id } = reqBody;

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { isMostRead: 1 } }, // Increment isMostRead by 1
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.log(error)
    
  }
}
