/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { createContext } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

const libraries = ["places"]; // Adicione outras bibliotecas se necessário

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -23.55052, // Latitude de exemplo (São Paulo)
  lng: -46.633308, // Longitude de exemplo (São Paulo)
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:'AIzaSyA_onFn83DaTLlun1WRR8w-h3PGbyxyndc',
  });

  if (loadError) return <div>Erro ao carregar o mapa</div>;
  if (!isLoaded) return <div>Carregando...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default Map;