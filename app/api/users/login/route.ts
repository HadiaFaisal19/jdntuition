import { type NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import User from "@/models/userModel"
import { connectDB } from "@/dbConfig/dbConfig"
import jwt from "jsonwebtoken"

connectDB()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody

    if (!email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 })
    }

    const isMatch = await bcryptjs.compare(password, user.password)

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
    }

    const jwtSecretKey = process.env.JWT_SECRET_KEY
    if (!jwtSecretKey) {
      console.error("JWT_SECRET_KEY is not set in the environment variables")
      return NextResponse.json({ error: "Internal server error: JWT_SECRET_KEY is not set" }, { status: 500 })
    }

    console.log(
      "JWT_SECRET_KEY:",
      jwtSecretKey.substring(0, 3) + "..." + jwtSecretKey.substring(jwtSecretKey.length - 3),
    ) // Log a masked version of the key

    const token = jwt.sign({ userId: user._id }, jwtSecretKey, { expiresIn: "1h" })

    // Include admin status in the response
    return NextResponse.json({ message: "Login successful", token, isAdmin: user.isAdmin || false }, { status: 200 })
  } catch (error) {
    console.error("Login error:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    // Fallback for unknown error type
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

