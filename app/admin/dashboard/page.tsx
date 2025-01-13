"use client";

import React, { useState } from "react";
import SignupPage from "../signup/page";  // Assuming you have this component
import Blogs from "@/components/Admin/Blogs/Blogs";

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Register Users");

  const renderContent = () => {
    switch (activeMenu) {
      case "Register Users":
        return <SignupPage />;
      case "Manage Blogs":
        return <Blogs />;
      default:
        return <div>Select an option from the sidebar.</div>;
    }
  };

  return (
    
    <div className="flex h-full">
      {/* Sidebar */}
      
      <aside className="w-1/4 bg-[#17A4A5] text-white p-4">
        <h2 className="text-2xl font-bold mb-6">JDN Tuition</h2>
        <nav>
          <ul className="space-y-4">
            <li
              className={`cursor-pointer font-bold ${
                activeMenu === "Register Users" ? "text-black" : ""
              }`}
              onClick={() => setActiveMenu("Register Users")}
            >
              Register Users
            </li>
            <li
              className={`cursor-pointer font-bold ${
                activeMenu === "Manage Blogs" ? "text-black" : ""
              }`}
              onClick={() => setActiveMenu("Manage Blogs")}
            >
              Manage Blogs
            </li>
            <li
              className="cursor-pointer font-bold text-yellow-500"
              onClick={() => console.log("Logout")}
            >
              Logout
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
      <h1 className="text-3xl font-bold  text-center ">ADMIN DASHBOARD</h1>
        {renderContent()}</main>
    </div>
  );
};

export default AdminDashboard;
