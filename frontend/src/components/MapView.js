import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MapView.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = () => {
  const { id } = useParams();
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    const fetchMapData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return alert("User not logged in");

      try {
        const { data } = await axios.get("http://localhost:5000/api/map", {
          headers: { Authorization: token },
        });
        setMapData(data);
      } catch {
        alert("User not logged in");
      }
    };
    fetchMapData();
  }, []);

  if (!mapData) return <h2 className="loading">Loading Map...</h2>;

  return (
    <div className="map-container">
      <MapContainer center={[mapData.lat, mapData.lng]} zoom={mapData.zoom} className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[mapData.lat, mapData.lng]}>
          <Popup>India - Card ID: {id}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;