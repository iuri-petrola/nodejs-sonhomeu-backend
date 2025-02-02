import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isAuthenticated = localStorage.getItem('token'); // Exemplo de verificação usando o token no localStorage

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/clients">Clientes</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/profile">Perfil</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;