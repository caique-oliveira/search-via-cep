'use client'
import { useState } from 'react';
import axios from 'axios';
import * as S from './AddressForm.styled';

interface Address {
  name: string;
  email: string;
  street: string;
  number: string;
  bairro: string;
  uf: string;
  complement?: string;
  password: string;
}

interface AddressFormProps {
  onAddAddress: (address: Address) => void;
  searchedAddress: string | null; // Novo prop para endereço buscado
}

const AddressForm: React.FC<AddressFormProps> = ({ onAddAddress, searchedAddress }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [bairro, setBairro] = useState('');
  const [uf, setUf] = useState('');
  const [complement, setComplement] = useState('');

  const fetchAddress = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data && !response.data.erro) {
        const { logradouro, bairro, localidade, uf } = response.data;
        setStreet(logradouro);
      } else {
        alert('CEP não encontrado');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert('Erro ao buscar o CEP');
    }
  };

  const handleCepBlur = () => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      fetchAddress(cleanCep);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAddress({ name, email, password, street, number, bairro, uf, complement });
    // Limpar os campos após o envio
    setName('');
    setEmail('');
    setPassword('');
    setCep('');
    setStreet('');
    setNumber('');
    setBairro('');
    setUf('');
    setComplement('');
  };

  return (
    <div>
      {searchedAddress && (
        <>
          <hr />
          <div style={{
            padding: '10px',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px',
            margin: '10px 0',
            height: '100px', // Altura fixa
            overflow: 'hidden', // Oculta o excesso
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            <h3>Endereço buscado:</h3>
            <p>{searchedAddress}</p>
          </div>
          <hr />
        </>
      )}
      
      <S.FormContacts onSubmit={handleSubmit}>
      <input
          type="text"
          value={name}
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
         <input
          type="text"
          value={password}
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          value={cep}
          placeholder="CEP"
          onChange={(e) => setCep(e.target.value)}
          onBlur={handleCepBlur}
          required
        />
        <input
          type="text"
          value={street}
          placeholder="Rua"
          onChange={(e) => setStreet(e.target.value)}
          required
        />
        <input
          type="text"
          value={number}
          placeholder="Número"
          onChange={(e) => setNumber(e.target.value)}
          required
        />
        <input
          type="text"
          value={bairro}
          placeholder="Bairro"
          onChange={(e) => setBairro(e.target.value)}
          required
        />
        <input
          type="text"
          value={uf}
          placeholder="UF"
          onChange={(e) => setUf(e.target.value)}
          required
        />
        <input
          type="text"
          value={complement}
          placeholder="Complemento (opcional)"
          onChange={(e) => setComplement(e.target.value)}
        />
        <button type="submit">Adicionar Endereço</button>
      </S.FormContacts>
    </div>
  );
};

export default AddressForm;