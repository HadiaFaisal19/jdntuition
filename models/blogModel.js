import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    Image: {
      type: String,
      required: [true, "Image is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    description: {
      type: String,
    },
    isLatest: {
      type: Boolean,
    },
    isMostRead: {
      type: Boolean,
    },
    isFeatured: {
      type: Boolean,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
    },
  });
  
  const Blog = mongoose.models.blogs || mongoose.model("blogs", blogSchema);
  
  export default Blog;
  
