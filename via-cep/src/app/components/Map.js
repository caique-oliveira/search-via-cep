/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { createContext } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '500px',
  width: '900px'
};

const Map = ({ selectedLocation }) => {
  const center = selectedLocation || { lat: -3.745, lng: -38.523 }; // Ponto central padrão

  return (
    <LoadScript googleMapsApiKey='AIzaSyA_onFn83DaTLlun1WRR8w-h3PGbyxyndc'>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      >
        {selectedLocation && (
          <Marker position={selectedLocation} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
