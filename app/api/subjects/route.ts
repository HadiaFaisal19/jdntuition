import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://api.teachworks.com/v1/subjects", {
      headers: {
        'Authorization': `Token token=${process.env.TEACHWORKS_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`TeachWorks API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    // If your API returns an object with a subjects property, for example:
    // { subjects: ["Maths", "English", ...] }
    // you can return that property directly if needed:
    // const subjects = Array.isArray(data) ? data : data.subjects;
    // return NextResponse.json(subjects);
    
    // Otherwise, if data is already an array:
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return NextResponse.json(
      { error: "Failed to fetch subjects" },
      { status: 500 }
    );
  }
}
