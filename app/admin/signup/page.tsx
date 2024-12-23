"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Initialize password state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const router = useRouter(); // Initialize the router

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message

    const signupData = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success modal after successful signup
        setShowModal(true);
      } else {
        setError(data.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    router.push("/login"); // Redirect to the login page when the modal is closed
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        className="w-80 bg-white p-6 rounded shadow-lg"
        onSubmit={handleSignup}
      >
        <h1 className="text-xl font-bold mb-4 text-center">Sign Up</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-3">
          <label htmlFor="username" className="block mb-1 text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Correctly updates state
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Correctly updates state
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Correctly updates password state
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {/* Modal for success */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Success!</h2>
            <p className="text-md mb-4">You have successfully signed up.</p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleModalClose}
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
