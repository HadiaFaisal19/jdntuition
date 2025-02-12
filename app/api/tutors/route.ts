import { NextResponse } from 'next/server';

export async function GET() {
  try {
    let page = 1;
    const perPage = 100; // Adjust as needed
    let allTutors: any[] = [];
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(`https://api.teachworks.com/v1/employees?page=${page}&per_page=${perPage}`, {
        headers: {
          'Authorization': `Token token=${process.env.TEACHWORKS_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`TeachWorks API error: ${response.statusText}`);
      }

      // Assuming the API returns an array of tutors
      const data = await response.json();

      // If the returned data array is empty, we've reached the end.
      if (data.length === 0) {
        hasMore = false;
      } else {
        allTutors = allTutors.concat(data);
        page++;
      }
    }

    return NextResponse.json(allTutors);
    
  } catch (error) {
    console.error('Error fetching tutors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tutors' },
      { status: 500 }
    );
  }
}
