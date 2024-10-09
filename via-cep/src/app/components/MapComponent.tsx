'use client'
import { useEffect, useRef, useState } from 'react';

interface MapComponentProps {
  addresses: Array<{ street: string; number: string }>;
}

const MapComponent: React.FC<MapComponentProps> = ({ addresses }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
      const map = new google.maps.Map(mapRef.current, {
        zoom: 5,
        center: { lat: -14.2350, lng: -51.9253 }, // Centro do Brasil
      });

      const geocoder = new google.maps.Geocoder();

      addresses.forEach((address) => {
        const fullAddress = `${address.street}, ${address.number}`;
        geocoder.geocode({ address: fullAddress }, (results, status) => {
          if (status === "OK" && results[0]) {
            const position = results[0].geometry.location;
            new google.maps.Marker({
              position,
              map,
              title: fullAddress,
            });
          }
        });
      });
    }
  }, [isLoaded, addresses]);

  return <div ref={mapRef} style={{ width: '100%', height: '600px', border: '2px solid #ccc', borderRadius: '10px' }} />;
};

export default MapComponent;
