import React, { useState, useEffect } from 'react';
import api from './axiosConfig'; // Importando a configuração do Axios

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fazendo uma requisição GET para a API
    api.get('/home') // Substitua pela sua rota real
      .then(response => {
        setMessage(response.data.message); // Exemplo de mensagem retornada pela API
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, []);

  return (
    <div>
      <h1>Bem-vindo ao Sistema de Vendas</h1>
      <p>{message || 'Carregando...'}</p>
    </div>
  );
};

export default Home;