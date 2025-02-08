import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    console.log("Received form data for student:", formData);

    // Ensure customer_id is provided
    const customerId = formData.customer_id;
    if (!customerId) {
      return NextResponse.json({ error: "customer_id not provided" }, { status: 400 });
    }

    // Use student details from formData.studentInfo
    const studentInfo = formData.studentInfo;

    // Construct the payload for the Teachworks API
    const studentPayload = {
      customer_id: customerId, // Attach this student to the existing family
      first_name: studentInfo.firstName,
      last_name: studentInfo.lastName,
      grade: formData.grade,
      status: "Prospective",
      additional_notes: formData.studentInfo.learningNeeds
      // Add other required fields for the student as per Teachworks API documentation
    };

    const studentResponse = await fetch("https://api.teachworks.com/v1/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token token=${process.env.TEACHWORKS_API_KEY}`,
      },
      body: JSON.stringify({
        student: studentPayload, // Correct payload structure
      }),
    });

    console.log("Teachworks student response status:", studentResponse.status);

    if (!studentResponse.ok) {
      const errorResponse = await studentResponse.text();
      console.error("Teachworks API Error (Student):", errorResponse);
      return NextResponse.json({ error: errorResponse }, { status: studentResponse.status });
    }

    const studentData = await studentResponse.json();
    console.log("Student created successfully:", studentData);
    return NextResponse.json({ message: "Student added successfully", data: studentData });
  } catch (error) {
    console.error("API Error (Student):", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}