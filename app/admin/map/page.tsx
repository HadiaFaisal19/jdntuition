"use client";
import { useJsApiLoader, GoogleMap, Marker, Polyline, Autocomplete } from '@react-google-maps/api';
import { useState, useRef } from 'react';

interface Location {
  lat: number;
  lng: number;
}

const MapPage = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originLocation, setOriginLocation] = useState<Location | null>(null);
  const [destLocation, setDestLocation] = useState<Location | null>(null);
  const [distance, setDistance] = useState("");
  const [mapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const originAutocomplete = useRef<google.maps.places.Autocomplete>();
  const destAutocomplete = useRef<google.maps.places.Autocomplete>();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  const handleOriginPlaceChanged = () => {
    if (originAutocomplete.current) {
      const place = originAutocomplete.current.getPlace();
      if (place.geometry?.location) {
        setOriginLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        });
        setOrigin(place.formatted_address || "");
      }
    }
  };

  const handleDestPlaceChanged = () => {
    if (destAutocomplete.current) {
      const place = destAutocomplete.current.getPlace();
      if (place.geometry?.location) {
        setDestLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        });
        setDestination(place.formatted_address || "");
      }
    }
  };

  const calculateDistance = async () => {
    if (!originLocation || !destLocation) return;

    try {
      const response = await fetch('/api/maps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination }),
      });

      if (!response.ok) throw new Error('Failed to calculate distance');
      
      const data = await response.json();
      setDistance(data.distance);
    } catch (error) {
      console.error('Error:', error);
      setDistance('Error calculating distance');
    }
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Location Distance Calculator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Origin</label>
          <Autocomplete
            onLoad={(autocomplete) => originAutocomplete.current = autocomplete}
            onPlaceChanged={handleOriginPlaceChanged}
          >
            <input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Enter origin address"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Autocomplete>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Destination</label>
          <Autocomplete
            onLoad={(autocomplete) => destAutocomplete.current = autocomplete}
            onPlaceChanged={handleDestPlaceChanged}
          >
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination address"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Autocomplete>
        </div>
      </div>

      <button
        onClick={calculateDistance}
        className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
      >
        Calculate Distance
      </button>

      {distance && (
        <div className="mb-4 p-4 bg-blue-100 rounded-md">
          <h3 className="text-lg font-semibold text-blue-800">
            Distance: {distance}
          </h3>
        </div>
      )}

      <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
        <GoogleMap
          center={mapCenter}
          zoom={12}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {originLocation && (
            <Marker
              position={originLocation}
              label="A"
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
              }}
            />
          )}

          {destLocation && (
            <Marker
              position={destLocation}
              label="B"
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }}
            />
          )}

          {originLocation && destLocation && (
            <Polyline
              path={[originLocation, destLocation]}
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 4,
                geodesic: true,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapPage;