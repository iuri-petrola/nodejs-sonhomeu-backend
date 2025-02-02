const { Pool } = require('pg');

const pool = new Pool({
    user: 'user_nodejs_smk',
    host: 'postgresql16',
    database: 'db_nodejs_smk',
    password: 'pass_nodejs_smk',
    port: 5432,
});

/*
CREATE DATABASE "db_nodejs_smk"
    WITH
    OWNER = user_nodejs_smk
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

*/

const criarTabelas = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS produtos (
                id SERIAL PRIMARY KEY,
                nome TEXT NOT NULL,
                preco REAL NOT NULL
            );

            CREATE TABLE IF NOT EXISTS clientes (
                id SERIAL PRIMARY KEY,
                nome TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL
            );

            CREATE TABLE IF NOT EXISTS vendas (
                id SERIAL PRIMARY KEY,
                cliente_id INTEGER REFERENCES clientes(id),
                produto_id INTEGER REFERENCES produtos(id),
                quantidade INTEGER,
                data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Tabelas verificadas/criadas com sucesso.');
    } catch (err) {
        console.error('Erro ao criar tabelas:', err.message);
    }
};

// Executar a criação das tabelas
criarTabelas();

module.exports = pool;