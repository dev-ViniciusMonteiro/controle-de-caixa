const sqlite3 = require('sqlite3').verbose();

const DB_PATH = './data.db'; // Nome do arquivo do banco de dados SQLite

// Inicializa o banco de dados
function initDatabase() {
    const db = new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
            console.error('Erro ao abrir o banco de dados', err.message);
        } else {
            console.log('Conexão bem-sucedida com o banco de dados');
        }
    });

    // Cria a tabela de vendas, se ainda não existir
    db.run(`CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product TEXT,
        quantity INTEGER,
        price REAL
    )`, (err) => {
        if (err) {
            console.error('Erro ao criar tabela de vendas', err.message);
        } else {
            console.log('Tabela de vendas criada com sucesso');
        }
    });

    return db;
}

module.exports = {
    initDatabase
};
