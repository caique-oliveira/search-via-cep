'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  password: string;
  cep: string;
  number: string;
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

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Se o campo for o CEP, limpa o endereço
    if (name === 'cep') {
      setAddress(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (isLogin) {
      const storedData = JSON.parse(localStorage.getItem('userData') || '{}');
      console.log('Stored Data:', storedData); // Logar os dados armazenados
      if (storedData.email === formData.email && storedData.password === formData.password) {
        console.log('Redirecionando para a dashboard...'); // Log para depuração
        router.push('/dashboard');
      } else {
        alert('Email ou senha incorretos');
      }
    } else {
      // Verifique se o nome está preenchido antes de cadastrar
      if (formData.name && formData.email && formData.password) {
        localStorage.setItem('userData', JSON.stringify(formData));
        localStorage.setItem('isLoggedIn', 'true'); // Armazenar o estado de login
        console.log('Usuário cadastrado:', formData); // Log para depuração
        router.push('/dashboard'); // Certifique-se de que isso está aqui
      } else {
        alert('Preencha todos os campos obrigatórios.');
      }
    }
    if (formData.name && formData.email && formData.password && formData.cep && formData.number) {
      // Armazenar os dados do usuário
      localStorage.setItem('userData', JSON.stringify(formData));

      // Criar o endereço completo
      const fullAddress = `${address}, ${formData.number} ${formData.complement ? `- ${formData.complement}` : ''}`;
      localStorage.setItem('mainAddress', fullAddress); // Armazenar o endereço principal
      localStorage.setItem('isLoggedIn', 'true'); // Armazenar o estado de login
    } else {
      alert('Preencha todos os campos obrigatórios.');
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setAddress('Erro ao buscar o CEP');
    }
  };

  const handleCepBlur = () => {
    const cleanCep = formData.cep.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (cleanCep.length === 8) {
      fetchAddress(cleanCep);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, cep: value });

    // Verifica se o valor é um CEP válido ao sair do campo
    const cleanCep = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (cleanCep.length === 8) {
      fetchAddress(cleanCep);
    } else {
      setAddress(null); // Limpa o endereço se o CEP não tiver 8 dígitos
    }
  };

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Cadastro'}</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nome" value={formData.name} onChange={handleChange} required={!isLogin} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Senha" value={formData.password} onChange={handleChange} required />
        
        <div style={{ marginBottom: '10px' }}>
          <input 
            name="cep" 
            placeholder="CEP" 
            value={formData.cep} 
            onChange={handleCepChange} 
            onBlur={handleCepBlur} 
            required 
          />
          {address && (
            <div style={{ marginTop: '5px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
              {address}
            </div>
          )}
        </div>
        
        <input name="number" placeholder="Número" value={formData.number} onChange={handleChange} required />
        <input name="complement" placeholder="Complemento (opcional)" value={formData.complement} onChange={handleChange} />
        <button type="submit">{isLogin ? 'Login' : 'Cadastrar'}</button>
      </form>
      <a href="#" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Ainda não sou cadastrado' : 'Já sou cadastrado'}</a>
    </div>
  );
};

export default LoginPage;