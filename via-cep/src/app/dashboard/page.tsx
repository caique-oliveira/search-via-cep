'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AddressForm from '../components/AddressForm';
import AddressList from '../components/AddressList';

interface Address {
  street: string;
  number: string;
  complement?: string;
}

const Dashboard: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [mainAddress, setMainAddress] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newMainAddress, setNewMainAddress] = useState<string>('');
  const [searchedAddress] = useState<string | null>(null); // Estado para endereço buscado
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

  const handleAddAddress = (address: Address) => {
    const updatedAddresses = [...addresses, address];
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('addresses');
    localStorage.removeItem('mainAddress');
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  const handleEditMainAddress = () => {
    setMainAddress(newMainAddress);
    localStorage.setItem('mainAddress', newMainAddress);
    setIsEditing(false);
  };

  const handleDeleteMainAddress = () => {
    setMainAddress(null);
    localStorage.removeItem('mainAddress');
    alert('Endereço principal excluído.');
  };

  return (
    <div>
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
              <button onClick={handleEditMainAddress}>Salvar</button>
              <button onClick={() => setIsEditing(false)}>Cancelar</button>
            </>
          ) : (
            <>
              <p>{mainAddress}</p>
              <button onClick={() => setIsEditing(true)}>Editar</button>
              <button onClick={handleDeleteMainAddress}>Excluir</button>
              <button onClick={handleDeleteAccount}>Excluir Conta</button>
            </>
          )}
        </div>
      )}
      <h1>Meus Contatos</h1>
      <AddressList addresses={addresses} setAddresses={setAddresses} />
      <hr></hr>
      <AddressForm 
        onAddAddress={handleAddAddress} 
        searchedAddress={searchedAddress} // Passar o endereço buscado
      />
      <hr></hr>
    </div>
  );
};

export default Dashboard;