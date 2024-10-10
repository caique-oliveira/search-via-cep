'use client'
import { useEffect, useRef, useState } from 'react';

interface MapComponentProps {
  addresses: Array<{ street: string; number: string }>;
  selectedLocation: { lat: number; lng: number } | null; // Adicione esta linha
}

const MapComponent: React.FC<MapComponentProps> = ({ addresses, selectedLocation }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null); // Estado para o mapa

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const newMap = new google.maps.Map(mapRef.current, {
        zoom: 5,
        center: { lat: -14.2350, lng: -51.9253 }, // Centro do Brasil
      });
      setMap(newMap); // Armazena a instância do mapa

      addresses.forEach((address) => {
        const fullAddress = `${address.street}, ${address.number}`;
        const geocoder = new google.maps.Geocoder();
        
        geocoder.geocode({ address: fullAddress }, (results, status) => {
          if (status === "OK" && results[0]) {
            const position = results[0].geometry.location;
            new google.maps.Marker({
              position,
              map: newMap,
              title: fullAddress,
            });
          }
        });
      });
    }
  }, [isLoaded, addresses]);

  useEffect(() => {
    if (map && selectedLocation) {
      map.setCenter(selectedLocation); // Atualiza o centro do mapa
      map.setZoom(15); // Ajusta o zoom
    }
  }, [map, selectedLocation]); // Atualiza sempre que o mapa ou a localização selecionada mudar

  return <div ref={mapRef} style={{ width: '100%', height: '600px', border: '2px solid #ccc', borderRadius: '10px', marginTop: '15px' }} />;
};

export default MapComponent;