"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserPlus, FaTrash } from "react-icons/fa";
import SignupForm from "@/components/SignupForm";

interface User {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

const RegisterUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showSignup, setShowSignup] = useState(false);

  

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/users");
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSuccess = () => {
    setShowSignup(false);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`/api/users?id=${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 min-h-screen">
      {showSignup ? (
        <SignupForm
          onSuccess={handleSuccess} 
          onCancel={() => setShowSignup(false)}
        />
      ) : (
        <>
          <button 
            onClick={() => setShowSignup(true)}
            className="bg-[#17A4A5] text-white p-2 rounded-full flex items-center gap-2 mb-4"
          >
            <FaUserPlus />
            Add User
          </button>

          <div className="flex flex-wrap gap-4">
            {users.map((user) => (
              <div key={user._id} className="bg-white shadow-md p-4 rounded-lg flex items-center justify-between w-64">
                <div>
                  <h3 className="font-bold text-lg">{user.username}</h3>
                  <p className="text-gray-600">{user.isAdmin ? "Admin" : "User"}</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <button onClick={() => deleteUser(user._id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterUser;