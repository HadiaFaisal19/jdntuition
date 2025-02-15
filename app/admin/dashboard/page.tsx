"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Blogs from "@/components/Admin/Blogs/Blogs";
import RegisterUser from "../registerUser/page";
import ManageTutors from "../manageTutors/page";
import MapPage from "../map/page";

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Manage Blogs");
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setemail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    const storedemail = localStorage.getItem("email") || "";
    
    if (!token) {
      router.push("/admin/login");
    } else {
      setIsAdmin(adminStatus);
      setemail(storedemail);
    }
  }, [router]);

  const renderContent = () => {
    switch (activeMenu) {
      case "Manage Blogs":
        return <Blogs />;
      case "Register Users":
        if (!isAdmin) {
          return <div className="text-center mt-8 text-red-500 font-bold">Only admin can access this page.</div>;
        }
        return <RegisterUser />;
      case "Manage Tutors":
        return <ManageTutors />;
      case "Manage Maps":
        return <MapPage />;
      
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
            {isAdmin && (
              <li
                className={`cursor-pointer font-bold ${
                  activeMenu === "Register Users" ? "text-black" : ""
                }`}
                onClick={() => setActiveMenu("Register Users")}
              >
                Register User
              </li>
            )}
            <li
              className={`cursor-pointer font-bold ${
                activeMenu === "Manage Blogs" ? "text-black" : ""
              }`}
              onClick={() => setActiveMenu("Manage Blogs")}
            >
              Manage Blogs
            </li>
            <li
               className={`cursor-pointer font-bold ${
                activeMenu === "Manage Tutors" ? "text-black" : ""
              }`}
              onClick={() => setActiveMenu("Manage Tutors")}>
              Manage Tutors
            </li>
            <li
               className={`cursor-pointer font-bold ${
                activeMenu === "Manage Maps" ? "text-black" : ""
              }`}
              onClick={() => setActiveMenu("Manage Maps")}>
              Manage Maps

            </li>
            <li
              className="cursor-pointer font-bold text-white"
              onClick={() => {
                router.push("/"); 
              }}
            >
              View Website
            </li>
            <li
              className="cursor-pointer font-bold text-yellow-500"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("isAdmin");
                localStorage.removeItem("email");
                router.push("/admin/login"); 
              }}
            >
              Logout
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 relative">
        <div className="absolute top-6 right-6 text-right flex flex-col items-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-600 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <p className="text-sm text-gray-600">
            {isAdmin ? "Admin" : "User"}
          </p>
          <p className="font-semibold">{email}</p>
        </div>
        <h1 className="text-3xl font-bold text-center mb-8">ADMIN DASHBOARD</h1>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;