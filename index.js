// Importações necessárias
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Importando conexão do banco
const routes = require('./routes'); // Importando rotas separadas

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());    //Converte JSON do body da requisição para um objeto JavaScript.
app.use(express.urlencoded({ extended: true }));    //Permite que o Express interprete dados de formulários.
app.use(cors());   // Permitir requisições do frontend React


// Middleware de log
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Passa para a próxima função
});

// Usando rotas externas
app.use('/api', routes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});