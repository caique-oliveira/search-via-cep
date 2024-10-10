import React from 'react';

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
  onSelectAddress: (address: { street: string; number: string }) => void; // Adicione esta linha
}

const AddressList: React.FC<AddressListProps> = ({ addresses, setAddresses, onSelectAddress }) => {
  const handleDelete = (index: number) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  };

  return (
    <div>
      <ul>
        {addresses.map((address, index) => (
          <li
            key={index}
            onClick={() => onSelectAddress({ street: address.street, number: address.number })} // Certifique-se de que essa função exista
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
            <button onClick={() => handleDelete(index)}>Excluir</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;
