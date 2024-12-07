"use client"
import React from "react";

const SignupPage = () => {
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic for signup, e.g., send data to the API
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="w-1/3 bg-white p-8 rounded shadow" onSubmit={handleSignup}>
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-3 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
