"use client"
import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = { lat: 30.3753, lng: 69.3451 }; // Default center (Pakistan)

const ManageTutors = () => {
  const [tutors, setTutors] = useState([
    { id: 1, name: "Tutor A", lat: 31.5497, lng: 74.3436 },
    { id: 2, name: "Tutor B", lat: 33.6844, lng: 73.0479 },
    { id: 3, name: "Tutor C", lat: 24.8607, lng: 67.0011 },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTutors, setFilteredTutors] = useState(tutors);
  const [selectedTutor, setSelectedTutor] = useState(null);

  useEffect(() => {
    setFilteredTutors(
      tutors.filter((tutor) =>
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, tutors]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search tutors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
      />

      <LoadScript googleMapsApiKey="AIzaSyBBeBpH4QYmOQJ11Ew1rzt5Q1dE6u9ui5Y">
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={5} center={center}>
          {filteredTutors.map((tutor) => (
            <Marker
              key={tutor.id}
              position={{ lat: tutor.lat, lng: tutor.lng }}
              onMouseOver={() => setSelectedTutor(tutor)}
              onMouseOut={() => setSelectedTutor(null)}
            />
          ))}

          {selectedTutor && (
            <InfoWindow
              position={{ lat: selectedTutor.lat, lng: selectedTutor.lng }}
              onCloseClick={() => setSelectedTutor(null)}
            >
              <div>{selectedTutor.name}</div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      <div>
        <h2>Available Tutors</h2>
        <ul>
          {filteredTutors.map((tutor) => (
            <li key={tutor.id}>{tutor.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageTutors;
