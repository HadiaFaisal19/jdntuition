"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Initialize password state
  const [isAdmin, setIsAdmin] = useState(false); // Checkbox state
  const [error, setError] = useState<string>(""); // Explicitly set the type for error as string
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const router = useRouter(); // Initialize the router

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message
    setSuccessMessage(""); // Reset success message

    const signupData = {
      username,
      email,
      password,
      isAdmin, // Include isAdmin in signup request
    };

    try {
      const response = await fetch(`${API_URL}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Signup successful!");
        setTimeout(() => {
          router.push("/admin/dashboard"); // Redirect after success
        }, 2000);
      } else {
        setError(data.error || "An error occurred. Please try again.");
      }
    } catch (error: unknown) {
      setError("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        className="w-80 bg-white p-6 rounded shadow-lg"
        onSubmit={handleSignup}
      >
        <h1 className="text-xl font-bold mb-4 text-center">Sign Up</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4">{successMessage}</p>
        )}

        <div className="mb-3">
          <label htmlFor="username" className="block mb-1 text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
            value={password} // Ensure this is correctly linked to state
            onChange={(e) => setPassword(e.target.value)} // Correctly updates state
            required
          />
        </div>

        {/* Admin Checkbox */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="isAdmin"
            className="mr-2"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <label htmlFor="isAdmin" className="text-sm font-medium">
            Register as Admin
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
