import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '400px',
  width: '800px'
};

const center = {
  lat: -3.745, // substitua pela latitude desejada
  lng: -38.523 // substitua pela longitude desejada
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      />
    </LoadScript>
  );
};

export default Map;
