import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    console.log("Received form data for student:", formData);

    // Validate customer_id
    const customerId = formData.customer_id;
    if (!customerId) {
      return NextResponse.json(
        { error: "customer_id not provided" }, 
        { status: 400 }
      );
    }

    // Destructure with fallbacks
    const studentInfo = formData.studentInfo;
    const lessonDetails = formData.lessonDetails;
    const grade = formData.grade ;
    const selectedSubjects= formData.selectedSubjects;

    const subjectsString = selectedSubjects.join(', ');
    // Student payload with validation
    const studentPayload = {
      customer_id: customerId,
      first_name: studentInfo.firstName,
      last_name: studentInfo.lastName,
      grade: grade,
      subjects: subjectsString,
      additional_notes: subjectsString,
      status: "Prospective",

    };

    // 1. Create the student first
    const createResponse = await fetch("https://api.teachworks.com/v1/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token token=${process.env.TEACHWORKS_API_KEY}`,
      },
      body: JSON.stringify({ student: studentPayload }),
    });

    if (!createResponse.ok) {
      const error = await createResponse.text();
      return NextResponse.json(
        { error: `Student creation failed: ${error}` },
        { status: createResponse.status }
      );
    }

    const studentData = await createResponse.json();
    console.log("Student created:", studentData.id);

    // 2. Prepare custom fields with safe access
    const customFieldsPayload = {
      custom_fields: [
        // Student info custom field (20930)
        {
          field_id: 20930,
          value: [
            `Performance: ${studentInfo.performance}`,
            `Reason: ${studentInfo.reason}`,
            `Learning_Needs: ${studentInfo.learningNeeds}`
          ].join("\n")
        },
        // Lesson details custom field (20929)
        {
          field_id: 20929,
          value: [
            `Type: ${lessonDetails.type}`,
            `Duration: ${lessonDetails.duration}`,
            `Frequency: ${lessonDetails.frequency}`
          ].join("\n")
        }
      ]
    };

    const updateResponse = await fetch(
      `https://api.teachworks.com/v1/students/${studentData.id}/custom_fields`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token token=${process.env.TEACHWORKS_API_KEY}`,
        },
        body: JSON.stringify(customFieldsPayload),
      }
    );

    if (!updateResponse.ok) {
      const error = await updateResponse.text();
      console.error("Custom fields update failed:", error);
      return NextResponse.json(
        { 
          error: `Student created but custom fields failed: ${error}`,
          student_id: studentData.id 
        },
        { status: updateResponse.status }
      );
    }

    const updatedData = await updateResponse.json();
    return NextResponse.json({
      message: "Student and custom fields created successfully",
      data: {
        student: studentData,
        custom_fields: updatedData
      }
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}