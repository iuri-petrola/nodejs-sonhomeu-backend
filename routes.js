const express = require('express');
const pool = require('./db');
const router = express.Router();

// Página inicial (Produtos)
router.get('/', async (req, res) => {
    try {
        const produtos = await pool.query('SELECT * FROM produtos');
        res.render('layout', { body: 'index', produtos: produtos.rows });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Página de Clientes
router.get('/clientes', async (req, res) => {
    try {
        const clientes = await pool.query('SELECT * FROM clientes');
        res.render('layout', { body: 'clientes', clientes: clientes.rows });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Criar um Produto
router.post('/produtos', async (req, res) => {
    const { nome, preco } = req.body;
    try {
        await pool.query('INSERT INTO produtos (nome, preco) VALUES ($1, $2)', [nome, preco]);
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Registrar uma Venda
router.post('/vendas', async (req, res) => {
    const { cliente_id, produto_id, quantidade } = req.body;
    try {
        await pool.query('INSERT INTO vendas (cliente_id, produto_id, quantidade) VALUES ($1, $2, $3)',
            [cliente_id, produto_id, quantidade]);
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
