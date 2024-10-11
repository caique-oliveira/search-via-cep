'use client'
import React, { useState, useEffect, useRef } from 'react';
// import './MapaBatalhas.css';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';

const locais = [
  {
    endereco: "Rua XV de Novembro, 500, Curitiba - PR",
    descricao: "Batalha de rimas especial no dia 05 de dezembro de 2024!",
    data: "05 de dezembro de 2024",
    cep: "80010-000",
  },
  {
    endereco: "Praça Sete de Setembro, Belo Horizonte - MG",
    descricao: "Conferência de rimas e talentos no dia 10 de dezembro de 2024.",
    data: "10 de dezembro de 2024",
    cep: "30130-100",
  },
  {
    endereco: "Av. Paulista, 1000, São Paulo - SP",
    descricao: "Lançamento de rimas e produtos no dia 15 de dezembro de 2024.",
    data: "15 de dezembro de 2024",
    cep: "01311-000",
  }
];

const MapaBatalhas = () => {
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any>([]);
  const [selected, setSelected] = useState<any>(null);
  const [eventList, setEventList] = useState<any>([]);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA_onFn83DaTLlun1WRR8w-h3PGbyxyndc', // Substitua pela sua chave da API
  });

  const geocoder:any = useRef(null);
  const bounds:any = useRef(null);

  useEffect(() => {
    if (isLoaded && map) {
      geocoder.current = new window.google.maps.Geocoder();
      bounds.current = new window.google.maps.LatLngBounds();
      locais.forEach(local => geocodeAddress(local));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, map]);

  const geocodeAddress = (local: { endereco: any; descricao?: string; data?: string; cep?: string; }) => {
    geocoder.current.geocode({ address: local.endereco }, (results: { geometry: { location: any; }; }[], status: string) => {
      if (status === "OK") {
        const position = results[0].geometry.location;
        bounds.current.extend(position);

        const marker = {
          position: { lat: position.lat(), lng: position.lng() },
          title: local.endereco,
          local,
        };

        setMarkers((current:any)  => [...current, marker] as any);

        // Atualizar os limites do mapa
        map.fitBounds(bounds.current);

      } else {
        console.error(
          "Geocode não foi bem-sucedido para o endereço " +
            local.endereco +
            " por causa de: " +
            status
        );
        alert(
          "Erro ao carregar o endereço: " +
            local.endereco +
            "\nStatus: " +
            status
        );
      }
    });
  };

  const handleListItemClick = (marker: any) => {
    setSelected(marker);
    map.panTo(marker.position);
    map.setZoom(15);
  };

  if (loadError) return <div>Erro ao carregar o mapa.</div>;
  if (!isLoaded) return <div>Carregando o mapa...</div>;

  return (
  <div className="container">
      <h1>Onde e Quando Acontecerão as Batalhas</h1>

      {/* Lista de eventos */}
      <ul className="event-list">
          {markers.map((marker:any,index:any) => (
              <li
                  key={index}
                  className="event-item"
                  onClick={() => handleListItemClick(marker)}
              >
                  <span className="event-date">{marker.local.data}</span> -
                  <strong>{marker.local.endereco}</strong><br />
                  {marker.local.descricao}
              </li>
          ))}
      </ul>

      {/* Mapa */}
      <GoogleMap
          mapContainerClassName="map"
          onLoad={mapInstance => setMap(mapInstance)}
          zoom={5}
          center={{ lat: -14.235, lng: -51.9253 }} // Centro do Brasil
      >
          {markers.map((marker: { position: google.maps.LatLng | google.maps.LatLngLiteral; title: string | undefined; }, index: React.Key | null | undefined) => (
              <Marker
                  key={index}
                  position={marker.position}
                  title={marker.title}
                  onClick={() => setSelected(marker)} />
          ))}
        
          {selected && (
              <InfoWindow
                  position={selected.position}
                  onCloseClick={() => setSelected(null)}
              >
                  <div>
                      <strong>{selected.local.endereco}, CEP {selected.local.cep}</strong><br />
                      <p>{selected.local.descricao}</p>
                      <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Praça Sete de Setembro, Belo Horizonte - MG")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="navigate-btn"
                      >
                      Como Chegar
                  </a>
              </div>
              </InfoWindow>
            )
            }
      
  </GoogleMap><div className="footer">
          &copy; 2024 Sua Empresa. Todos os direitos reservados.
      </div>
 
    </div>

    )
};


export default MapaBatalhas;