import React, { useState, useEffect } from 'react';
import api from './axiosConfig'; // Importando a configuração do Axios

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Fazendo uma requisição GET para a API
    api.get('/clients') // Substitua pela sua rota real
      .then(response => {
        setClients(response.data); // Supondo que a resposta seja uma lista de clientes
      })
      .catch(error => {
        console.error('Erro ao buscar clientes:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.length ? clients.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="3">Nenhum cliente encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;