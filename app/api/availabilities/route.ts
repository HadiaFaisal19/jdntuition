import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const employeeId = searchParams.get('employee_id');

  try {
    const response = await fetch(
      `https://api.teachworks.com/v1/availabilities?employee_id=${employeeId}`,
      {
        headers: {
          'Authorization': `Token token=${process.env.TEACHWORKS_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
  console.error(`TeachWorks API Error: ${response.status} - ${errorBody}`);
  throw new Error(`TeachWorks API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching availabilities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availabilities' },
      { status: 500 }
    );
  }
}