import React from 'react';
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
  
  const handleDelete = (index: number) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  };

  return (
    <>
      <div>
        <S.TitleContacts>Meus Contatos</S.TitleContacts>
        <ul>
          {addresses.map((address, index) => (
            <S.ListForm
              key={index}
              onClick={() => onSelectAddress({ street: address.street, number: address.number })}
              style={{ cursor: 'pointer' }}
            >
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
              <S.ButtonForm onClick={() => handleDelete(index)}>Excluir</S.ButtonForm>
            </S.ListForm>
          ))} 
        </ul>
      </div>
    </>
  );
};

export default AddressList;