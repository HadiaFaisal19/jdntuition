import { NextResponse } from "next/server";
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

export async function POST(req: Request) {
  try {
    const { origin, destination } = await req.json();
    
    // Get coordinates for both locations
    const [originResult, destResult] = await Promise.all([
      client.geocode({
        params: { address: origin, key: process.env.GOOGLE_MAPS_API_KEY! }
      }),
      client.geocode({
        params: { address: destination, key: process.env.GOOGLE_MAPS_API_KEY! }
      })
    ]);

    // Calculate distance matrix
    const distanceResult = await client.distancematrix({
      params: {
        origins: [origin],
        destinations: [destination],
        key: process.env.GOOGLE_MAPS_API_KEY!,
        
      }
    });

    const element = distanceResult.data.rows[0].elements[0];
    if (element.status !== 'OK') throw new Error('Route not found');

    return NextResponse.json({
      distance: element.distance.text,
      duration: element.duration.text,
      origin: originResult.data.results[0].geometry.location,
      destination: destResult.data.results[0].geometry.location
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to calculate route" },
      { status: 500 }
    );
  }
}