import React from "react";
import "./App.css";
import 'leaflet/dist/leaflet.css';
import { Map as LeafletMap, TileLayer, GeoJSON } from "react-leaflet";
import thaiBorder from "./thaiBorder.json";
const borderStyle = {
  color: "grey",
  weight: 3,
  opacity: 2,
  fillOpacity: 0.5,
  interactive: false
};

function App() {
  return (
    <div className="App">
      <LeafletMap
        className="mapStyle"
        center={[13.1563, 101.5018]}
        zoom={6}
        minZoom={6}
        maxZoom={19}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
      <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
      <GeoJSON data={thaiBorder} style={borderStyle} />
      </LeafletMap>
    </div>
  );
}

export default App;
