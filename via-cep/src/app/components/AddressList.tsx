// src/app/components/AddressList.tsx
import React, { useState } from 'react';
import * as S from './AddressForm.styled';
import MapComponent from './MapComponent';

interface Address {
  name: string;
  email: string;
  street: string;
  number: string;
  bairro: string;
  uf: string;
  complement?: string;
}

interface AddressListProps {
  addresses: Address[];
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
  onSelectAddress: (address: { street: string; number: string }) => void; 
}

const AddressList: React.FC<AddressListProps> = ({ addresses, setAddresses, onSelectAddress }) => {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editAddress, setEditAddress] = useState<Address | null>(null);

  const handleEditClick = (index: number) => {
    setIsEditing(index);
    setEditAddress(addresses[index]);
  };

  const handleSaveClick = () => {
    if (editAddress) {
      const updatedAddresses = [...addresses];
      updatedAddresses[isEditing as number] = editAddress;
      setAddresses(updatedAddresses);
      localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
      setIsEditing(null); // Resetar edição
    }
  };

  const handleDeleteAccount = () => {
    if (isEditing !== null) {
      const updatedAddresses = addresses.filter((_, index) => index !== isEditing);
      setAddresses(updatedAddresses);
      localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
      setIsEditing(null); // Reseta a edição
      window.location.href = '/';
    }
  };

  return (
    <div>
      <S.TitleContacts>Meus Contatos</S.TitleContacts>
      <ul>
        {addresses.map((address, index) => (
          <S.ListForm
            key={index}
            onClick={() => onSelectAddress({ street: address.street, number: address.number })}
            style={{ cursor: 'pointer' }}
          >
            {isEditing === index ? (
              <>
              <span>Nome:</span>
                <input style={{ marginLeft: '15%', width: '70%' }}
                  type="text"
                  value={editAddress?.name}
                  onChange={(e) => setEditAddress({ ...editAddress!, name: e.target.value })}
                />
                <br></br>
                <span>E-mail:</span>
                <input style={{ marginLeft: '14%', width: '70%' }}
                  type="text"
                  value={editAddress?.email}
                  onChange={(e) => setEditAddress({ ...editAddress!, email: e.target.value })}
                />
                <br></br>
                <span>Endereço:</span>
                <input
                  type="text" style={{ marginLeft: '7.3%', width: '70%' }}
                  value={editAddress?.street}
                  onChange={(e) => setEditAddress({ ...editAddress!, street: e.target.value })}
                />
                <br></br>
                <span>Número:</span>
                <input
                  type="text" style={{ marginLeft: '10.7%', width: '70.1%' }}
                  value={editAddress?.number}
                  onChange={(e) => setEditAddress({ ...editAddress!, number: e.target.value })}
                />
                <br></br>
                <span>Bairro:</span>
                <input style={{ marginLeft: '14.6%', width: '70%' }}
                  type="text"
                  value={editAddress?.bairro}
                  onChange={(e) => setEditAddress({ ...editAddress!, bairro: e.target.value })}
                />
                <br></br>
                <span>Complemento:</span>
                <input style={{ marginLeft: '2%', width: '67.2%' }}
                  type="text"
                  value={editAddress?.complement}
                  onChange={(e) => setEditAddress({ ...editAddress!, complement: e.target.value })}
                />
                {/* Adicione outros campos conforme necessário */}
                <S.ButtonForm onClick={handleSaveClick}>Salvar</S.ButtonForm>
                <S.ButtonForm onClick={handleDeleteAccount}>Excluir Conta</S.ButtonForm>
              </>
            ) : (
              <>
                {`Nome: ${address.name},`}
                <br />
                {`E-mail: ${address.email}`}
                <br />
                {`CEP: ${address.street}`}
                <br />
                {`Número: ${address.number}`}
                <br />
                {`Bairro: ${address.bairro}`}
                <br />
                {`UF: ${address.uf}`}
                <br />
                {`Complemento: ${address.complement ? `(${address.complement})` : ''}`}
                <br />
                <S.ButtonForm onClick={() => handleEditClick(index)}>Editar</S.ButtonForm>
                <S.ButtonForm onClick={() => handleDeleteAccount()}>Excluir</S.ButtonForm>
                <S.ButtonDeleteAccont onClick={handleDeleteAccount}>Excluir Conta</S.ButtonDeleteAccont>
              </>
            )}
          </S.ListForm>
        ))} 
      </ul>
    </div>
  );
};

export default AddressList;
