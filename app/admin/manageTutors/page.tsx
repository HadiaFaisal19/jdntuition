"use client";
import React, { useEffect, useState } from "react";

interface Availability {
  id: number;
  employee_id: number;
  day: string;
  start_time: string;
  end_time: string;
}

interface Tutor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  subjects: string;
  bio: string;
  status: string; // Used for filtering active tutors
  custom_fields: Array<{ name: string; value: string | null }>;
  availabilities: Availability[];
}

const ManageTutors = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openedTutorId, setOpenedTutorId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchTutorsWithAvailabilities = async () => {
      try {
        // Fetch tutors from the API
        const tutorsResponse = await fetch("/api/tutors");
        if (!tutorsResponse.ok) throw new Error("Failed to fetch tutors");
        const tutorsData = await tutorsResponse.json();

        // Filter tutors to include only those with an active status
        const activeTutors = tutorsData.filter(
          (tutor: Tutor) => tutor.status === "Active"
        );

        // For each active tutor, fetch their availabilities
        const tutorsWithAvailabilities = await Promise.all(
          activeTutors.map(async (tutor: Tutor) => {
            const availabilitiesResponse = await fetch(
              `/api/availabilities?employee_id=${tutor.id}`
            );
            const availabilitiesData = await availabilitiesResponse.json();
            return {
              ...tutor,
              availabilities: availabilitiesData,
            };
          })
        );

        setTutors(tutorsWithAvailabilities);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchTutorsWithAvailabilities();
  }, []);

  const getCustomField = (tutor: Tutor, fieldName: string) => {
    const field = tutor.custom_fields.find((f) => f.name === fieldName);
    return field?.value || "N/A";
  };

  const formatDay = (dayNumber: string) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[parseInt(dayNumber)] || "Unknown";
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5); // Converts "17:00:00" to "17:00"
  };

  const toggleDetails = (tutorId: number) => {
    setOpenedTutorId(openedTutorId === tutorId ? null : tutorId);
  };

  // Filter tutors based on the search term (checks both first and last names)
  const filteredTutors = tutors.filter((tutor) => {
    const fullName = `${tutor.first_name} ${tutor.last_name}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  if (loading) return <div>Loading tutors...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">JDN Tuition Tutors</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search tutor by name..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredTutors.map((tutor) => (
          <div
            key={tutor.id}
            className="bg-white rounded-lg shadow-sm border p-4 cursor-pointer transition-colors hover:bg-gray-50"
            onClick={() => toggleDetails(tutor.id)}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Basic Info */}
              <div>
                <p className="font-semibold">
                  {tutor.first_name} {tutor.last_name}
                </p>
                <p className="text-sm text-gray-600">{tutor.email}</p>
              </div>

              {/* Contact & Address */}
              <div>
                <p className="font-medium">Contact</p>
                <p>{tutor.mobile_phone}</p>
                <p className="mt-1 text-sm">
                  <strong>Address:</strong> {tutor.address}, {tutor.city}
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
                {tutor.availabilities?.length > 0 ? (
                  <ul className="list-disc pl-4 mt-2">
                    {tutor.availabilities.map((availability) => (
                      <li key={availability.id} className="text-sm">
                        {formatDay(availability.day)}:{" "}
                        {formatTime(availability.start_time)} -{" "}
                        {formatTime(availability.end_time)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">No availability set</p>
                )}
              </div>
            </div>

            {/* Collapsible Tutor Details */}
            {openedTutorId === tutor.id && (
              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Bio Section */}
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
                      <p className="text-sm">{tutor.subjects}</p>
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

        {filteredTutors.length === 0 && (
          <div className="text-gray-500">No tutors found matching your search.</div>
        )}
      </div>
    </div>
  );
};

export default ManageTutors;
