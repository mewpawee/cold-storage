import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
function TruckLocation(props) {
  const truckIcon = L.icon({
    iconUrl: require("../Icons/truckIcon.svg"),
    iconSize: [30, 30],
  });
  return <Marker icon={truckIcon} position={props.position}></Marker>;
}

export { TruckLocation };
