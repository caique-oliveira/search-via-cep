'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState, createContext } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import AddressForm from '../components/AddressForm';
import AddressList from '../components/AddressList';
import MapComponent from '../components/Map';
import * as S from './dashboard.styled';

interface Address {
  name: string;
  email: string;
  street: string;
  number: string;
  bairro: string;
  uf: string;
  complement?: string;
}

const Dashboard: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [mainAddress, setMainAddress] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newMainAddress, setNewMainAddress] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchedAddress, setSearchedAddress] = useState<string | null>(null); // Adicione esta linha
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const storedAddresses = localStorage.getItem('addresses');
    const storedMainAddress = localStorage.getItem('mainAddress');
  
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      if (storedAddresses) {
        setAddresses(JSON.parse(storedAddresses));
      }
      if (storedMainAddress) {
        setMainAddress(storedMainAddress);
        setNewMainAddress(storedMainAddress);
      }
    }
  }, [router]);

  // Função para adicionar um novo endereço
  const handleAddAddress = (address: Address) => {
    const updatedAddresses = [...addresses, address];
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  };

  const handleSelectAddress = (address: { street: string; number: string }) => {
    const fullAddress = `${address.street}, ${address.number}`;
    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ address: fullAddress }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        const position = results[0].geometry.location;
        setSelectedLocation({ lat: position.lat(), lng: position.lng() });
        console.log('Selected Location:', selectedLocation);
      } else {
        console.error("Geocodificação falhou: " + status);
        
      }
    });
  };

  return (
    <S.ContainerDashboard>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAWX0_W5BQv53q-VdTJXX7-wHgFgidEcKk`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Google Maps script loaded');
        }}
      />
      {mainAddress && (
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
          <h2>Meu Endereço:</h2>
          {isEditing ? (
            <>
              <input
                type="text"
                value={newMainAddress}
                onChange={(e) => setNewMainAddress(e.target.value)}
                placeholder="Novo Endereço Principal"
              />
              <button onClick={() => setIsEditing(false)}>Cancelar</button>
            </>
          ) : (
            <>
              <p>{mainAddress}</p>
              <button onClick={() => setIsEditing(true)}>Editar</button>
            </>
          )}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, marginRight: '20px' }}>
          <AddressList 
            addresses={addresses} 
            setAddresses={setAddresses} 
            onSelectAddress={handleSelectAddress} 
          />
        </div>
        <div style={{ flex: 2, marginTop: '40px' }}>
          <MapComponent selectedLocation={selectedLocation} />
        </div>
      </div>
      <AddressForm 
        onAddAddress={handleAddAddress} 
        searchedAddress={searchedAddress}
      />
    </S.ContainerDashboard>
  );
};

export default Dashboard;
