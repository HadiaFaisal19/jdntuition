"use client";
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface Availability {
  id: number;
  employee_id: number;
  day: string; // Could be numeric string (e.g., "1") or a day name (e.g., "Monday")
  start_time: string; // Format: "HH:MM:SS"
  end_time: string;
}

interface Tutor {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  mobile_phone: string;
  address: string;
  city: string | null;
  state: string;
  zip: string;
  country: string;
  subjects: string | null;
  bio: string;
  status: string; //for filtering active tutors
  custom_fields: Array<{ name: string; value: string | null }>;
  availabilities: Availability[] | null; // May be null or an array
}

// New interface for Subject objects
interface Subject {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: -33.8688,
  lng: 151.2093
};

const ManageTutors = () => {
  // Tutors state
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [openedTutorId, setOpenedTutorId] = useState<number | null>(null);
  const [isSubjectsOpen, setIsSubjectsOpen] = useState(false);
  // Filter states
  const [searchTerm, setSearchTerm] = useState<string>(""); // Name search
  const [selectedDay, setSelectedDay] = useState<string>(""); // e.g. "Monday"
  const [selectedTime, setSelectedTime] = useState<string>(""); // e.g. "16:00"
  const [locationFilter, setLocationFilter] = useState<string>(""); // e.g. City search

  // Subjects filtering:
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  // We'll store selected subject names for filtering purposes.
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const [refreshingAvailabilities, setRefreshingAvailabilities] = useState<number[]>([]);

  const [autoCheckedTutors, setAutoCheckedTutors] = useState<number[]>([]);

  const [coordinates, setCoordinates] = useState<{ [key: number]: google.maps.LatLngLiteral }>({});
  const [geocodedTutors, setGeocodedTutors] = useState<Set<number>>(new Set());

  const [_, setGoogleMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  useEffect(() => {
    if (isLoaded && tutors.length > 0) {
      const geocoder = new window.google.maps.Geocoder();
      
      tutors.forEach((tutor) => {
        if (geocodedTutors.has(tutor.id)) return;
  
        // Build address components with validation
        const addressComponents = [
          tutor.address,
          tutor.city,
          tutor.state,
          tutor.zip,
          tutor.country
        ].filter(component => 
          component !== null && component.trim() !== ''
        );
  
        // Skip tutors with no address information
        if (addressComponents.length === 0) {
          console.warn(`Skipping tutor ${tutor.id} - No address information`);
          setGeocodedTutors(prev => new Set([...prev, tutor.id]));
          return;
        }
  
        const fullAddress = addressComponents.join(', ');
  
        // Validate address format before geocoding
        if (!fullAddress || fullAddress.trim().length < 5) {
          console.warn(`Invalid address for tutor ${tutor.id}: ${fullAddress}`);
          setGeocodedTutors(prev => new Set([...prev, tutor.id]));
          return;
        }
  
        geocoder.geocode({ address: fullAddress }, (results, status) => {
          if (status === 'OK' && results?.[0]?.geometry?.location) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            setCoordinates(prev => ({ 
              ...prev, 
              [tutor.id]: { lat, lng } 
            }));
            setGeocodedTutors(prev => new Set([...prev, tutor.id]));
          } else {
            console.error(`Geocode failed for tutor ${tutor.id}:`, {
              status,
              fullAddress,
              components: {
                address: tutor.address,
                city: tutor.city,
                state: tutor.state,
                zip: tutor.zip,
                country: tutor.country
              }
            });
            // Mark as geocoded to prevent retries
            setGeocodedTutors(prev => new Set([...prev, tutor.id]));
          }
        });
      });
    }
  }, [tutors, isLoaded, geocodedTutors]);

//function to handle availability refresh
  const refreshAvailabilities = async (tutorId: number) => {
    try {
      setRefreshingAvailabilities(prev => [...prev, tutorId]);
      
      const response = await fetch(`/api/availabilities?employee_id=${tutorId}`);
      if (!response.ok) throw new Error("Failed to fetch availabilities");
      
      const data = await response.json();
      const newAvailabilities = Array.isArray(data) ? data : [];

      setTutors(prevTutors => prevTutors.map(tutor => 
        tutor.id === tutorId ? { ...tutor, availabilities: newAvailabilities } : tutor
      ));
    } catch (error) {
      console.error(`Error refreshing availabilities for tutor ${tutorId}:`, error);
    } finally {
      setRefreshingAvailabilities(prev => prev.filter(id => id !== tutorId));
    }
  };

  useEffect(() => {
    // Check tutors with empty availabilities that haven't been auto-checked yet
    tutors.forEach(tutor => {
      if (
        (tutor.availabilities === null || tutor.availabilities.length === 0) &&
        !autoCheckedTutors.includes(tutor.id)
      ) {
        refreshAvailabilities(tutor.id);
        setAutoCheckedTutors(prev => [...prev, tutor.id]);
      }
    });
  }, [tutors, autoCheckedTutors]);


  // Fetch tutors on mount
  useEffect(() => {
    const fetchTutorsWithAvailabilities = async () => {
      try {

        setAutoCheckedTutors([]);

        const tutorsResponse = await fetch("/api/tutors");
        if (!tutorsResponse.ok) throw new Error("Failed to fetch tutors");
        const tutorsData = await tutorsResponse.json();

        const activeTutors = tutorsData.filter(
          (tutor: Tutor) => tutor.status === "Active"
        );

        const tutorsWithAvailabilities = await Promise.all(
          activeTutors.map(async (tutor: Tutor) => {
            try {
              const availabilitiesResponse = await fetch(
                `/api/availabilities?employee_id=${tutor.id}`
              );
              if (!availabilitiesResponse.ok) {
                console.error(`Failed to fetch availabilities for tutor ${tutor.id}`);
                return { ...tutor, availabilities: [] };
              }
              const availabilitiesData = await availabilitiesResponse.json();
              return {
                ...tutor,
                availabilities: Array.isArray(availabilitiesData) ? availabilitiesData : [],
              };
            } catch (err) {
              console.error(`Error fetching availabilities for tutor ${tutor.id}:`, err);
              return { ...tutor, availabilities: [] };
            }
          })
        );

        setTutors(tutorsWithAvailabilities);
      } catch {
        console.log("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchTutorsWithAvailabilities();
  }, []);

  // Fetch subjects from our own API route on mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("/api/subjects");
        if (!response.ok) throw new Error("Failed to fetch subjects");
        const data = await response.json();
        console.log("Subjects data:", data);
        // If the API returns an object like { subjects: [...] } adjust accordingly:
        const subjectsArray: Subject[] = Array.isArray(data)
          ? data
          : data.subjects;
        setAllSubjects(subjectsArray);
      } catch {
        console.error("Error fetching subjects:");
      }
    };

    fetchSubjects();
  }, []);

  // Helper: Get a custom field value from the tutor object
  const getCustomField = (tutor: Tutor, fieldName: string) => {
    const field = tutor.custom_fields.find((f) => f.name === fieldName);
    return field?.value || "";
  };

  // Normalize day value to a day name.
  const formatDay = (dayValue: string) => {
    const parsed = parseInt(dayValue);
    if (isNaN(parsed)) {
      return dayValue.trim();
    }
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[parsed] || "Unknown";
  };

  // Format time to HH:MM
  const formatTime = (time: string) => time.slice(0, 5);

  const toggleDetails = (tutorId: number) => {
    setOpenedTutorId(openedTutorId === tutorId ? null : tutorId);
  };

  // Toggle subject selection
  const toggleSubject = (subjectName: string) => {
    if (selectedSubjects.includes(subjectName)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subjectName));
    } else {
      setSelectedSubjects([...selectedSubjects, subjectName]);
    }
  };

// Filtering logic:
const filteredTutors = tutors.filter((tutor) => {
  // Name filter
  const fullName = `${tutor.first_name || ""} ${tutor.last_name || ""}`;
  const nameMatch = fullName.toLowerCase().includes(searchTerm.toLowerCase());

  // Subject filter: Check if any selected subject is in tutor.subjects or Top 3 Subjects.
  const tutorSubjects = (tutor.subjects || "").split(',').map(s => s.trim().toLowerCase());
  const topSubjects = getCustomField(tutor, "Top 3 Subjects").split(',').map(s => s.trim().toLowerCase());

  // Check if ALL selected subjects are present
  const subjectMatch = selectedSubjects.length > 0
    ? selectedSubjects.every(subj => 
        tutorSubjects.includes(subj.toLowerCase()) ||
        topSubjects.includes(subj.toLowerCase())
      )
    : true;

  // Availability filter
  const availabilityMatch =
    selectedDay && selectedTime
      ? (Array.isArray(tutor.availabilities) ? tutor.availabilities : []).some(
          (avail) => {
            const availDay = formatDay(avail.day).toLowerCase();
            if (availDay !== selectedDay.toLowerCase()) return false;
            const start = formatTime(avail.start_time);
            const end = formatTime(avail.end_time);
            return selectedTime >= start && selectedTime <= end;
          }
        )
      : true;

  // Location filter (Updated to match full address)
  const fullAddress = [
    tutor.address, 
    tutor.city, 
    tutor.state, 
    tutor.zip, 
    tutor.country
  ]
  .filter(component => component) // Remove empty values
  .join(', ') 
  .toLowerCase(); 

  const locationMatch = locationFilter
    ? fullAddress.includes(locationFilter.toLowerCase())
    : true;

  return nameMatch && subjectMatch && availabilityMatch && locationMatch;
});


  // Sorting logic remains as before
  const sortedTutors = filteredTutors.sort((a, b) => {
    if (selectedDay && selectedTime) {
      const availA = Array.isArray(a.availabilities) ? a.availabilities : [];
      const availB = Array.isArray(b.availabilities) ? b.availabilities : [];
      const matchA = availA.find((avail) => {
        const availDay = formatDay(avail.day).toLowerCase();
        if (availDay !== selectedDay.toLowerCase()) return false;
        const start = formatTime(avail.start_time);
        const end = formatTime(avail.end_time);
        return selectedTime >= start && selectedTime <= end;
      });
      const matchB = availB.find((avail) => {
        const availDay = formatDay(avail.day).toLowerCase();
        if (availDay !== selectedDay.toLowerCase()) return false;
        const start = formatTime(avail.start_time);
        const end = formatTime(avail.end_time);
        return selectedTime >= start && selectedTime <= end;
      });
      if (matchA && matchB) {
        const startA = formatTime(matchA.start_time);
        const startB = formatTime(matchB.start_time);
        if (startA < startB) return -1;
        if (startA > startB) return 1;
      } else if (matchA) {
        return -1;
      } else if (matchB) {
        return 1;
      }
    }
    const nameA = `${a.first_name || ""} ${a.last_name || ""}`.toLowerCase();
    const nameB = `${b.first_name || ""} ${b.last_name || ""}`.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  if (loading) return <div>Loading tutors...</div>;
  //if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">JDN Tuition Tutors</h1>
      <h5 className="text-xl font-bold mb-6">Tutors Count: {tutors.length}</h5>

      
      <div className="w-full flex flex-col items-center mb-6 px-4">
  {/* Selected Subjects */}
  <div className="flex flex-wrap gap-2 mb-2 justify-center">
    {selectedSubjects.map(subject => (
      <button
        key={subject}
        onClick={() => toggleSubject(subject)}
        className="px-3 py-1 rounded-full bg-[#17A4A5] text-white flex items-center text-sm"
      >
        {subject}
        <span className="ml-2 text-xs">×</span>
      </button>
    ))}
  </div>
  
  {/* Subject Selector */}
  <div className="relative w-full max-w-2xl">
    <button
      onClick={() => setIsSubjectsOpen(!isSubjectsOpen)}
      className="w-full p-3 text-center border border-gray-300 rounded-md bg-white hover:bg-gray-50 flex items-center justify-between"
    >
      <span className="w-full text-center">Select Subjects</span>
      
      <svg 
        className={`w-5 h-5 transform transition-transform ${isSubjectsOpen ? 'rotate-180' : ''}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
      <button
      onClick={() => setSelectedSubjects([])}
      className=" ml-2 px-2 text-center border border-gray-300 rounded-md bg-white hover:bg-gray-50 flex items-center justify-between"
    >X</button>
    </button>
    
    
    {isSubjectsOpen && (
      <div className="absolute z-10 left-1/2 transform -translate-x-1/2 w-full mt-1 p-2 bg-white border border-gray-200 rounded-lg shadow-lg grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
        {allSubjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => {
              toggleSubject(subject.name);
              setIsSubjectsOpen(false);
            }}
            className={`p-2 rounded-full text-base ${
              selectedSubjects.includes(subject.name)
                ? "bg-[#17A4A5] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition-colors`}
          >
            {subject.name}
          </button>
        ))}
      </div>
    )}
  </div>
</div>

      {/* Other Filters Below Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Name Search */}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />

        {/* Day Filter */}
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">All Days</option>
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>

        {/* Time Filter */}
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />

        {/* Location Filter */}
        <input
          type="text"
          placeholder="Location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

{/* Google Map Section */}
<div className="mb-6">
  {isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={defaultCenter}
      onLoad={(map) => setGoogleMap(map)}
    >
      {sortedTutors  // Changed from tutors to sortedTutors
        .filter(tutor => coordinates[tutor.id])
        .map((tutor) => (
          <Marker
            key={tutor.id}
            position={coordinates[tutor.id]}
            title={`${tutor.first_name || ''} ${tutor.last_name || ''}`.trim()}
          />
        ))}
    </GoogleMap>
  ) : (
    <div>Loading map...</div>
  )}
  <div className="mt-2 text-sm text-gray-500">
    Showing {
      sortedTutors.filter(tutor => coordinates[tutor.id]).length  // Changed to use sortedTutors
    } tutors with valid locations matching filters
  </div>
</div>

      {/* Tutors List */}
      <div className="space-y-4">
        {sortedTutors.map((tutor) => (
          <div
            key={tutor.id}
            className="bg-white rounded-lg shadow-sm border p-4 cursor-pointer transition-colors hover:bg-gray-50"
            onClick={() => toggleDetails(tutor.id)}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Basic Info */}
              <div>
                <p className="font-semibold">
                  {tutor.first_name || ""} {tutor.last_name || ""}
                </p>
                <p className="text-sm text-gray-600">{tutor.email}</p>
              </div>

              {/* Contact & Address */}
              <div>
                <p className="font-medium">Contact</p>
                <p>{tutor.mobile_phone}</p>
                <p className="mt-1 text-sm">
                  <strong>Address:</strong> {tutor.address}, {tutor.city || ""}
                  <br />
                  {tutor.state} {tutor.zip}, {tutor.country}
                </p>
              </div>

              {/* Top Subjects */}
              <div>
                <p className="font-medium">Top Subjects</p>
                <p className="text-sm">{getCustomField(tutor, "Top 3 Subjects")}</p>
              </div>

              {/* Availabilities */}
              <div>
    <p className="font-medium">Availabilities</p>
    {Array.isArray(tutor.availabilities) && tutor.availabilities.length > 0 ? (
      <ul className="list-disc pl-4 mt-2">
        {tutor.availabilities.map((availability) => (
          <li key={availability.id} className="text-sm">
            {formatDay(availability.day)}: {formatTime(availability.start_time)} -{" "}
            {formatTime(availability.end_time)}
          </li>
        ))}
      </ul>
    ) : (
      <div className="mt-2">
        <p className="text-sm text-gray-500 mb-2">No availability set</p>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card toggle
            refreshAvailabilities(tutor.id);
          }}
          disabled={refreshingAvailabilities.includes(tutor.id)}
          className="text-sm text-[#17A4A5] hover:text-[#128587] disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {refreshingAvailabilities.includes(tutor.id) ? 
            'Checking Availability...' : 
            'Check Availability'}
        </button>
      </div>
    )}
  </div>
            </div>

            {/* Collapsible Details */}
            {openedTutorId === tutor.id && (
              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Bio */}
                  <div>
                    <p className="font-medium mb-2">Bio</p>
                    <p className="text-sm whitespace-pre-line">
                      {tutor.bio || "No bio available"}
                    </p>
                  </div>

                  {/* Additional Details */}
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium">All Subjects</p>
                      <p className="text-sm">{tutor.subjects || ""}</p>
                    </div>
                    <div>
                      <p className="font-medium">Teaching Experience</p>
                      <p className="text-sm">
                        {getCustomField(tutor, "Teaching Experience (Years)")} years
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Travel Distance</p>
                      <p className="text-sm">
                        {getCustomField(tutor, "Travel Distance (km)")} km
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {sortedTutors.length === 0 && (
          <div className="text-gray-500">
            No tutors found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTutors;
