"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const API_URL = "/api/blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    Image: "",
    category: "Academic Success",
    isLatest: false,
    isMostRead: false,
    isFeatured: false,
  });

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(API_URL);
      setBlogs(response.data.blogs);
      setFilteredBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlogForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlogId) {
        await axios.put(API_URL, { id: editingBlogId, ...blogForm });
        alert("Blog updated successfully!");
      } else {
        await axios.post(API_URL, blogForm);
        alert("Blog added successfully!");
      }
      resetForm();
      fetchBlogs();
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  // Delete Blog
// Delete Blog
const handleDeleteBlog = async (id) => {
    try {
      // Change URL to /api/blog instead of /api/blogs
      await axios.delete(`/api/blog?id=${id}`);
      alert("Blog deleted successfully!");
      fetchBlogs();  // Refresh the list after deleting
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  

  const handleUpdateBlog = (blog) => {
    setBlogForm(blog);
    setEditingBlogId(blog._id);
    setIsFormVisible(true);
  };

  const resetForm = () => {
    setBlogForm({
      title: "",
      Image: "",
      category: "Academic Success",
      isLatest: false,
      isMostRead: false,
      isFeatured: false,
    });
    setEditingBlogId(null);
  };

  const handleFilter = (filterType) => {
    setFilter(filterType);
    if (filterType === "all") {
      setFilteredBlogs(blogs);
    } else if (filterType === "mostRead") {
      setFilteredBlogs(blogs.filter((blog) => blog.isMostRead));
    } else if (filterType === "featured") {
      setFilteredBlogs(blogs.filter((blog) => blog.isFeatured));
    } else if (filterType === "latest") {
      setFilteredBlogs(blogs.filter((blog) => blog.isLatest));
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <button
          className="p-2 bg-[#17A4A5] text-white rounded hover:bg-[#138F8F] flex items-center gap-2"
          onClick={() => {
            resetForm();
            setIsFormVisible(true);
          }}
        >
          <FaPlus />
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        {["all", "mostRead", "featured", "latest"].map((filterType) => (
          <button
            key={filterType}
            className={`p-2 rounded ${
              filter === filterType
                ? "bg-[#17A4A5] text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleFilter(filterType)}
          >
            {filterType === "all" ? "All Blogs" : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>

      {/* Add/Update Form */}
      {isFormVisible && (
        <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded shadow mb-6 relative">
          {/* Close Button */}
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg p-2"
            onClick={() => {
              resetForm();
              setIsFormVisible(false);
            }}
          >
            &times;
          </button>

          <div className="mb-4">
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={blogForm.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Image URL</label>
            <input
              type="text"
              name="Image"
              value={blogForm.Image}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Category</label>
            <select
              name="category"
              value={blogForm.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="Academic Success">Academic Success</option>
              <option value="Exam Preparation">Exam Preparation</option>
              <option value="Student Wellbeing">Student Wellbeing</option>
              <option value="Parent Support">Parent Support</option>
              <option value="Success Stories">Success Stories</option>
              <option value="Learning Resources">Learning Resources</option>
            </select>
          </div>
          <div className="mb-4 flex gap-4">
            {["isLatest", "isMostRead", "isFeatured"].map((field) => (
              <label key={field} className="flex items-center">
                <input
                  type="checkbox"
                  name={field}
                  checked={blogForm[field]}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                {field.replace("is", "")}
              </label>
            ))}
          </div>
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            {editingBlogId ? "Update Blog" : "Add Blog"}
          </button>
        </form>
      )}

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-md rounded p-4 flex flex-col h-full"
          >
            <img
              src={blog.Image}
              alt={blog.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
            <div className="mt-auto flex justify-between items-center">
              <button
                className="p-2 bg-[#17A4A5] text-white rounded hover:bg-[#138F8F]"
                onClick={() => handleUpdateBlog(blog)}
              >
                <FaEdit />
              </button>
              <button
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDeleteBlog(blog._id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
