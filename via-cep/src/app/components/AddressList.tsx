import React from 'react';

interface Address {
  street: string;
  number: string;
  complement?: string;
}

interface AddressListProps {
  addresses: Address[];
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
}

const AddressList: React.FC<AddressListProps> = ({ addresses, setAddresses }) => {
  const handleDelete = (index: number) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  };

  return (
    <div>
      <ul>
        {addresses.map((address, index) => (
          <li key={index}>
            {`${address.street}, ${address.number} ${address.complement ? `(${address.complement})` : ''}`}
            <button onClick={() => handleDelete(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;