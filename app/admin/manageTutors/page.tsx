"use client";
import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from '@react-google-maps/api';

interface Availability {
  id: number;
  employee_id: number;
  day: string;
  start_time: string;
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
  status: string;
  custom_fields: Array<{ name: string; value: string | null }>;
  availabilities: Availability[] | null;
}

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
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [openedTutorId, setOpenedTutorId] = useState<number | null>(null);
  const [isSubjectsOpen, setIsSubjectsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [refreshingAvailabilities, setRefreshingAvailabilities] = useState<number[]>([]);
  const [autoCheckedTutors, setAutoCheckedTutors] = useState<number[]>([]);
  const [coordinates, setCoordinates] = useState<{ [key: number]: google.maps.LatLngLiteral }>({});
  const [geocodedTutors, setGeocodedTutors] = useState<Set<number>>(new Set());
  const [searchLocation, setSearchLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [distances, setDistances] = useState<{ [key: number]: number }>({});
  const searchAutocomplete = useRef<google.maps.places.Autocomplete>();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places', 'maps','geometry']
  });

  useEffect(() => {
    if (isLoaded && tutors.length > 0) {
      const geocoder = new window.google.maps.Geocoder();
      
      tutors.forEach((tutor) => {
        if (geocodedTutors.has(tutor.id)) return;

        const addressComponents = [
          tutor.address,
          tutor.city,
          tutor.state,
          tutor.zip,
          tutor.country
        ].filter(component => component !== null && component.trim() !== '');

        if (addressComponents.length === 0) {
          setGeocodedTutors(prev => new Set([...prev, tutor.id]));
          return;
        }

        const fullAddress = addressComponents.join(', ');
        if (!fullAddress || fullAddress.trim().length < 5) {
          setGeocodedTutors(prev => new Set([...prev, tutor.id]));
          return;
        }

        geocoder.geocode({ address: fullAddress }, (results, status) => {
          if (status === 'OK' && results?.[0]?.geometry?.location) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            setCoordinates(prev => ({ ...prev, [tutor.id]: { lat, lng } }));
            setGeocodedTutors(prev => new Set([...prev, tutor.id]));
          } else {
            setGeocodedTutors(prev => new Set([...prev, tutor.id]));
          }
        });
      });
    }
  }, [tutors, isLoaded, geocodedTutors]);

  const handleSearchLocationChanged = () => {
    if (searchAutocomplete.current) {
      const place = searchAutocomplete.current.getPlace();
      if (place.geometry?.location) {
        setSearchLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        });
      }else {
        setSearchLocation(null);
      }
    }
  };

  useEffect(() => {
    if (!searchLocation || !isLoaded) return;

    const newDistances: { [key: number]: number } = {};
    tutors.forEach(tutor => {
      const tutorCoord = coordinates[tutor.id];
      if (tutorCoord) {
        newDistances[tutor.id] = window.google.maps.geometry.spherical.computeDistanceBetween(
          new window.google.maps.LatLng(tutorCoord.lat, tutorCoord.lng),
          new window.google.maps.LatLng(searchLocation.lat, searchLocation.lng)
        );
      }
    });
    setDistances(newDistances);
  }, [searchLocation, coordinates, tutors, isLoaded]);

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
    tutors.forEach(tutor => {
      if ((tutor.availabilities === null || tutor.availabilities.length === 0) &&
        !autoCheckedTutors.includes(tutor.id)) {
        refreshAvailabilities(tutor.id);
        setAutoCheckedTutors(prev => [...prev, tutor.id]);
      }
    });
  }, [tutors, autoCheckedTutors]);

  useEffect(() => {
    const fetchTutorsWithAvailabilities = async () => {
      try {
        setAutoCheckedTutors([]);
        const tutorsResponse = await fetch("/api/tutors");
        if (!tutorsResponse.ok) throw new Error("Failed to fetch tutors");
        const tutorsData = await tutorsResponse.json();
        const activeTutors = tutorsData.filter((tutor: Tutor) => tutor.status === "Active");
        const tutorsWithAvailabilities = await Promise.all(
          activeTutors.map(async (tutor: Tutor) => {
            try {
              const availabilitiesResponse = await fetch(`/api/availabilities?employee_id=${tutor.id}`);
              const availabilitiesData = availabilitiesResponse.ok ? await availabilitiesResponse.json() : [];
              return { ...tutor, availabilities: Array.isArray(availabilitiesData) ? availabilitiesData : [] };
            } catch {
              return { ...tutor, availabilities: [] };
            }
          })
        );
        setTutors(tutorsWithAvailabilities);
      } finally {
        setLoading(false);
      }
    };
    fetchTutorsWithAvailabilities();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("/api/subjects");
        if (!response.ok) throw new Error("Failed to fetch subjects");
        const data = await response.json();
        const subjectsArray: Subject[] = Array.isArray(data) ? data : data.subjects;
        setAllSubjects(subjectsArray);
      } catch {
        console.error("Error fetching subjects:");
      }
    };
    fetchSubjects();
  }, []);

  const getCustomField = (tutor: Tutor, fieldName: string) => {
    return tutor.custom_fields.find((f) => f.name === fieldName)?.value || "";
  };

  const formatDay = (dayValue: string) => {
    const parsed = parseInt(dayValue);
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return isNaN(parsed) ? dayValue.trim() : days[parsed] || "Unknown";
  };

  const formatTime = (time: string) => time.slice(0, 5);

  const toggleDetails = (tutorId: number) => {
    setOpenedTutorId(openedTutorId === tutorId ? null : tutorId);
  };

  const toggleSubject = (subjectName: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectName) 
        ? prev.filter(s => s !== subjectName) 
        : [...prev, subjectName]
    );
  };

  const filteredTutors = tutors.filter((tutor) => {
    const fullName = `${tutor.first_name || ""} ${tutor.last_name || ""}`.toLowerCase();
    const nameMatch = fullName.includes(searchTerm.toLowerCase());
    const tutorSubjects = (tutor.subjects || "").split(',').map(s => s.trim().toLowerCase());
    const topSubjects = getCustomField(tutor, "Top 3 Subjects").split(',').map(s => s.trim().toLowerCase());
    const subjectMatch = selectedSubjects.length === 0 || selectedSubjects.every(subj => 
      tutorSubjects.includes(subj.toLowerCase()) || topSubjects.includes(subj.toLowerCase())
    );
    const availabilityMatch = !(selectedDay && selectedTime) || 
      (tutor.availabilities || []).some(avail => {
        const availDay = formatDay(avail.day).toLowerCase();
        const start = formatTime(avail.start_time);
        const end = formatTime(avail.end_time);
        return availDay === selectedDay.toLowerCase() && selectedTime >= start && selectedTime <= end;
      });
    return nameMatch && subjectMatch && availabilityMatch;
  });

  const sortedTutors = filteredTutors.sort((a, b) => {
    if (searchLocation) {
      const distanceA = distances[a.id] || Infinity;
      const distanceB = distances[b.id] || Infinity;
      if (distanceA < distanceB) return -1;
      if (distanceA > distanceB) return 1;
    }
    if (selectedDay && selectedTime) {
      const [availA, availB] = [a, b].map(t => t.availabilities || []);
      const [matchA, matchB] = [availA, availB].map(avails => avails.find(avail => 
        formatDay(avail.day).toLowerCase() === selectedDay.toLowerCase() &&
        selectedTime >= formatTime(avail.start_time) &&
        selectedTime <= formatTime(avail.end_time)
      ));
      if (matchA && !matchB) return -1;
      if (matchB && !matchA) return 1;
    }
    const nameA = `${a.first_name || ""} ${a.last_name || ""}`.toLowerCase();
    const nameB = `${b.first_name || ""} ${b.last_name || ""}`.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  if (loading) return <div className="p-4 min-h-screen">Loading tutors...</div>;

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">JDN Tuition Tutors</h1>
      <h5 className="text-xl font-bold mb-6">Tutors Count: {tutors.length}</h5>

      <div className="w-full flex flex-col items-center mb-6 px-4">
        <div className="flex flex-wrap gap-2 mb-2 justify-center">
          {selectedSubjects.map(subject => (
            <button key={subject} onClick={() => toggleSubject(subject)}
              className="px-3 py-1 rounded-full bg-[#17A4A5] text-white flex items-center text-sm">
              {subject}<span className="ml-2 text-xs">×</span>
            </button>
          ))}
        </div>
        
        <div className="relative w-full max-w-2xl">
          <button onClick={() => setIsSubjectsOpen(!isSubjectsOpen)}
            className="w-full p-3 text-center border border-gray-300 rounded-md bg-white hover:bg-gray-50 flex items-center justify-between">
            <span className="w-full text-center">Select Subjects</span>
            <svg className={`w-5 h-5 transform transition-transform ${isSubjectsOpen ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <button onClick={() => setSelectedSubjects([])}
              className="ml-2 px-2 text-center border border-gray-300 rounded-md bg-white hover:bg-gray-50 flex items-center justify-between">
              X
            </button>
          </button>
          
          {isSubjectsOpen && (
            <div className="absolute z-10 left-1/2 transform -translate-x-1/2 w-full mt-1 p-2 bg-white border border-gray-200 rounded-lg shadow-lg grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
              {allSubjects.map((subject) => (
                <button key={subject.id} onClick={() => { toggleSubject(subject.name); setIsSubjectsOpen(false); }}
                  className={`p-2 rounded-full text-base ${
                    selectedSubjects.includes(subject.name)
                      ? "bg-[#17A4A5] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } transition-colors`}>
                  {subject.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input type="text" placeholder="Search by name..." value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" />

        <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
          <option value="">All Days</option>
          {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(day => 
            <option key={day} value={day}>{day}</option>
          )}
        </select>

        <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
        <div className="relative space-y-2">
  <Autocomplete onLoad={(autocomplete) => (searchAutocomplete.current = autocomplete)}
    onPlaceChanged={handleSearchLocationChanged}>
    <input placeholder="Search location..." 
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
  </Autocomplete>

  <button 
    onClick={() => setSearchLocation(null)}
    className="absolute right-2 top-1/3 transform -translate-y-1/2 bg-gray-200 p-1 rounded-md text-sm">
    X
  </button>
</div>

      </div>

      <div className="mb-6">
      <div className="mb-2 text-sm text-gray-500">
      Showing {sortedTutors.filter(tutor => coordinates[tutor.id]).length} tutors on map
        </div>
        {isLoaded ? (
          <GoogleMap mapContainerStyle={mapContainerStyle} zoom={searchLocation ? 12 : 10}
            center={searchLocation || defaultCenter}>
            {searchLocation && (
              <Marker position={searchLocation} title="Search Location"
                icon={{ url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  scaledSize: new window.google.maps.Size(40, 40) }} />
            )}
            {sortedTutors.filter(tutor => coordinates[tutor.id]).map((tutor) => (
              <Marker key={tutor.id} position={coordinates[tutor.id]}
                title={`${tutor.first_name || ''} ${tutor.last_name || ''}`.trim()} />
            ))}
          </GoogleMap>
        ) : <div>Loading map...</div>}
        <div className="mt-2 text-sm text-gray-500">
          {/* Showing {sortedTutors.filter(tutor => coordinates[tutor.id]).length} tutors matching filters */}
         
        </div>
      </div>

      <div className="space-y-4">
        {sortedTutors.map((tutor) => {
          const distance = searchLocation ? distances[tutor.id] : null;
          return (
            <div key={tutor.id} className="bg-white rounded-lg shadow-sm border p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleDetails(tutor.id)}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="font-semibold">
                    {tutor.first_name || ""} {tutor.last_name || ""}
                    {distance !== null && (
                      <span className="block text-sm text-gray-500 mt-1">
                        {Math.round(distance / 100) / 10} km away
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600">{tutor.email}</p>
                </div>

                <div>
                  <p className="font-medium">Contact</p>
                  <p>{tutor.mobile_phone}</p>
                  <p className="mt-1 text-sm">
                    <strong>Address:</strong> {tutor.address}, {tutor.city || ""}<br />
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
                      {searchLocation && distance !== null && (
  <span className="block text-sm text-gray-500 mt-1">
    {Math.round(distance / 100) / 10} km away
  </span>
)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          );
})}

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
