import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = { lat: 37.7749, lng: -122.4194 }; // Default location (San Francisco)

const TutorMap = ({ tutors }) => {
  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
        {tutors
          .filter(tutor => tutor.lat && tutor.lng)
          .map(tutor => (
            <Marker
              key={tutor.id}
              position={{ lat: tutor.lat, lng: tutor.lng }}
              title={`${tutor.first_name} ${tutor.last_name}`}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default TutorMap;
