'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import * as S from './login.styled';

interface FormData {
  name: string;
  email: string;
  password: string;
  cep: string;
  number: string;
  complement?: string;
}

interface Address {
  password: string;
  name: string;
  email: string;
  street: string;
  number: string;
  bairro: string;
  uf: string;
  complement?: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    cep: '',
    number: '',
    complement: '',
  });

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [address, setAddress] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'cep') {
      setAddress(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
    const storedAddresses = JSON.parse(localStorage.getItem('addresses') || '[]');

    if (isLogin) {
      const foundUser = storedAddresses.find((address: Address) => address.email === formData.email && address.password === formData.password);

      if (foundUser || (storedUserData.email === formData.email && storedUserData.password === formData.password)) {
        localStorage.setItem('isLoggedIn', 'true');
        router.push('/dashboard');
      } else {
        alert('Email ou senha incorretos');
      }
    } else {
      if (formData.name && formData.email && formData.password && formData.cep && formData.number) {
        localStorage.setItem('userData', JSON.stringify({ 
          email: formData.email, 
          password: formData.password 
        }));
        localStorage.setItem('isLoggedIn', 'true');
        router.push('/dashboard');
      } else {
        alert('Preencha todos os campos obrigatórios.');
      }
    }
  };

  const fetchAddress = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data && !response.data.erro) {
        const { logradouro, bairro, localidade, uf } = response.data;
        setAddress(`${logradouro}, ${bairro} - ${localidade}, ${uf}`);
      } else {
        setAddress('CEP não encontrado');
      }
    } catch (error) {
      setAddress('Erro ao buscar o CEP');
    }
  };

  const handleCepBlur = () => {
    const cleanCep = formData.cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      fetchAddress(cleanCep);
    }
  };

  return (
    <S.ContainerLogin>
      <h1>{isLogin ? 'Login' : 'Cadastro'}</h1>
      <S.FormLogin onSubmit={handleSubmit}>
        {!isLogin && (
          <input 
            name="name" 
            placeholder="Nome" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        )}
        <input 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Senha" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        
        {!isLogin && (
          <>
            <input 
              name="cep" 
              placeholder="CEP" 
              value={formData.cep} 
              onChange={handleChange} 
              onBlur={handleCepBlur} 
              required 
            />
            {address && (
              <div style={{ marginTop: '5px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', marginLeft: '2%' }}>
                {address}
              </div>
            )}
            <input 
              name="number" 
              placeholder="Número" 
              value={formData.number} 
              onChange={handleChange} 
              required 
            />
            <input 
              name="complement" 
              placeholder="Complemento (opcional)" 
              value={formData.complement} 
              onChange={handleChange} 
            />
          </>
        )}

        <button type="submit">{isLogin ? 'Login' : 'Cadastrar'}</button>
      </S.FormLogin>
      <a href="#" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Ainda não sou cadastrado' : 'Já sou cadastrado'}
      </a>
    </S.ContainerLogin>
  );
};

export default LoginPage;