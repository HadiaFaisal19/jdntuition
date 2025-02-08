import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    console.log("Received form data for family:", formData);

    // Extract parent email
    const parentEmail = formData.parentDetails.email;

    // Search for existing customers by email
    const searchUrl = new URL("https://api.teachworks.com/v1/customers");
    searchUrl.searchParams.append("email", parentEmail);

    const searchResponse = await fetch(searchUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token token=${process.env.TEACHWORKS_API_KEY}`,
      },
    });

    // Handle search errors
    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error("Teachworks search error:", errorText);
      return NextResponse.json(
        { error: `Family search failed: ${errorText}` },
        { status: searchResponse.status }
      );
    }

    const searchData = await searchResponse.json();
    console.log("Search response:", JSON.stringify(searchData, null, 2));

    // Handle different response formats
    const customers = (
      Array.isArray(searchData?.customers) ? searchData.customers :
      Array.isArray(searchData) ? searchData :
      []
    ).filter((c: any) => c?.email); // Ensure we have valid customer objects

    // Find case-insensitive email match
    const existingCustomer = customers.find((c: any) => 
      c.email.toLowerCase().trim() === parentEmail.toLowerCase().trim()
    );

    if (existingCustomer) {
      console.log("Existing family found:", existingCustomer.id);
      return NextResponse.json({
        message: "Existing family found",
        customer_id: existingCustomer.id
      });
    }

    // Create new family if no match found
    const familyResponse = await fetch("https://api.teachworks.com/v1/customers/family", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token token=${process.env.TEACHWORKS_API_KEY}`,
      },
      body: JSON.stringify({
        customer: {
          first_name: formData.parentDetails.fname,
          last_name: formData.parentDetails.lname,
          email: parentEmail,
          mobile_phone: formData.parentDetails.phone,
          additional_notes: formData.parentDetails.addDetails,
          status: "Prospective",
        },
      }),
    });

    if (!familyResponse.ok) {
      const errorText = await familyResponse.text();
      console.error("Family creation error:", errorText);
      return NextResponse.json({ error: errorText }, { status: familyResponse.status });
    }

    const familyData = await familyResponse.json();
    return NextResponse.json({
      message: "New family created",
      customer_id: familyData.id
    });

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}