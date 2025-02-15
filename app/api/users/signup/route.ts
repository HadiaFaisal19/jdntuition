import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { username, email, password, isAdmin } = reqBody;
        console.log(reqBody);

        if (!username || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            isAdmin
        });
        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        // Fallback for unknown error type
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
