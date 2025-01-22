"use client"
import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import dynamic from "next/dynamic"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import Image from "next/image"

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })
import "react-quill-new/dist/quill.snow.css"

const API_URL = "/api/blog"

const categoryMap = {
  "academic-success": "Academic Success",
  "exam-preparation": "Exam Preparation",
  "student-wellbeing": "Student Wellbeing",
  "parent-support": "Parent Support",
  "success-stories": "Success Stories",
  "learning-resources": "Learning Resources",
}

// Blog interface
interface Blog {
  _id: string
  title: string
  Image: string
  category: string
  description: string
  isLatest: boolean
  isMostRead: boolean
  isFeatured: boolean
  content: string
}

// BlogForm interface (similar to Blog but without `_id`)
interface BlogForm {
  title: string
  Image: string
  category: string
  description: string
  isLatest: boolean
  isMostRead: boolean
  isFeatured: boolean
  content: string
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([])
  const [filter, setFilter] = useState<string>("all")
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null)
  const [blogForm, setBlogForm] = useState<BlogForm>({
    title: "",
    Image: "",
    category: "academic-success",
    description: "",
    isLatest: false,
    isMostRead: false,
    isFeatured: false,
    content: "",
  })

  const fetchBlogs = async () => {
    try {
      const response = await axios.get<{ blogs: Blog[] }>(API_URL)
      setBlogs(response.data.blogs)
      setFilteredBlogs(response.data.blogs)
    } catch (error) {
      console.error("Error fetching blogs:", error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement
      setBlogForm((prev) => ({
        ...prev,
        [name]: target.checked,
      }))
    } else {
      setBlogForm((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleContentChange = (value: string) => {
    setBlogForm((prev) => ({ ...prev, content: value }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingBlogId) {
        await axios.put(API_URL, { id: editingBlogId, ...blogForm })
        alert("Blog updated successfully!")
      } else {
        await axios.post(API_URL, blogForm)
        alert("Blog added successfully!")
      }
      resetForm()
      fetchBlogs()
      setIsFormVisible(false)
    } catch (error) {
      console.error("Error submitting blog:", error)
    }
  }

  const handleDeleteBlog = async (id: string) => {
    try {
      await axios.delete(`/api/blog?id=${id}`)
      alert("Blog deleted successfully!")
      fetchBlogs()
    } catch (error) {
      console.error("Error deleting blog:", error)
    }
  }

  const handleUpdateBlog = (blog: Blog) => {
    setBlogForm(blog)
    setEditingBlogId(blog._id)
    setIsFormVisible(true)
  }

  const resetForm = () => {
    setBlogForm({
      title: "",
      Image: "",
      category: "academic-success",
      description: "",
      isLatest: false,
      isMostRead: false,
      isFeatured: false,
      content: "",
    })
    setEditingBlogId(null)
  }

  const handleFilter = (filterType: string) => {
    setFilter(filterType)
    if (filterType === "all") {
      setFilteredBlogs(blogs)
    } else if (filterType === "mostRead") {
      setFilteredBlogs(blogs.filter((blog) => blog.isMostRead))
    } else if (filterType === "featured") {
      setFilteredBlogs(blogs.filter((blog) => blog.isFeatured))
    } else if (filterType === "latest") {
      setFilteredBlogs(blogs.filter((blog) => blog.isLatest))
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <button
          className="p-2 bg-[#17A4A5] text-white rounded hover:bg-[#138F8F] flex items-center gap-2"
          onClick={() => {
            resetForm()
            setIsFormVisible(true)
          }}
        >
          <FaPlus />
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        {["all", "mostRead", "featured", "latest"].map((filterType) => (
          <button
            key={filterType}
            className={`p-2 rounded ${
              filter === filterType ? "bg-[#17A4A5] text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleFilter(filterType)}
          >
            {filterType === "all" ? "All Blogs" : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>

      {isFormVisible && (
        <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded shadow mb-6 relative">
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg p-2"
            onClick={() => {
              resetForm()
              setIsFormVisible(false)
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
              {Object.entries(categoryMap).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 flex gap-4">
            {["isLatest", "isMostRead", "isFeatured"].map((field) => (
              <label key={field} className="flex items-center">
                <input
                  type="checkbox"
                  name={field}
                  checked={Boolean(blogForm[field as keyof BlogForm])}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                {field.replace("is", "")}
              </label>
            ))}
          </div>
          <div className="mb-4">
            <label className="block font-medium">Content</label>
            <ReactQuill value={blogForm.content} onChange={handleContentChange} className="h-64" />
          </div>
          <button type="submit" className="mt-8 p-2 bg-blue-500 text-white rounded">
            {editingBlogId ? "Update Blog" : "Add Blog"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div key={blog._id} className="bg-white shadow-md rounded p-4 flex flex-col h-full">
            <Image
              src={blog.Image || "/placeholder.svg"}
              alt={blog.title}
              width={768}
              height={192}
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
  )
}

export default Blogs

