import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Clients from './pages/Clients';
import Navbar from './components/Navbar';
import axios from 'axios';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<Clients />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// Criando a página Home
export function Home() {
  return (
    <div>
      <h1 className="text-xl font-bold">Lista de Produtos</h1>
      <p>Carregando produtos...</p>
    </div>
  );
}

// Criando a página Clients
export function Clients() {
  return (
    <div>
      <h1 className="text-xl font-bold">Lista de Clientes</h1>
      <p>Carregando clientes...</p>
    </div>
  );
}

// Criando o Navbar
export function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <a href="/" className="mr-4">Produtos</a>
      <a href="/clients">Clientes</a>
    </nav>
  );
}
