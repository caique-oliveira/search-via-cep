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
                <hr></hr>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default AddressList;