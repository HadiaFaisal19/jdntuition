"use client"
import React from "react";

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><a href="/admin/dashboard">Dashboard</a></li>
        <li><a href="/admin/blogs">Manage Blogs</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
