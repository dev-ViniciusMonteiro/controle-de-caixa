const { initDatabase } = require('./database');

// Função para adicionar uma nova venda
function addSale(saleData) {
    const db = initDatabase();
    const { product, quantity, price } = saleData;
    const sql = 'INSERT INTO sales (product, quantity, price) VALUES (?, ?, ?)';
    db.run(sql, [product, quantity, price], function(err) {
        if (err) {
            console.error('Erro ao adicionar venda', err.message);
        } else {
            console.log(`Venda adicionada com ID: ${this.lastID}`);
        }
    });
    db.close();
}

// Função para buscar todas as vendas
function getAllSales(callback) {
    const db = initDatabase();
    const sql = 'SELECT * FROM sales';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar vendas', err.message);
            callback([]);
        } else {
            callback(rows);
        }
    });
    db.close();
}

// Função para buscar uma venda pelo ID
function getSaleById(id, callback) {
    const db = initDatabase();
    const sql = 'SELECT * FROM sales WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error('Erro ao buscar venda', err.message);
            callback(null);
        } else {
            callback(row);
        }
    });
    db.close();
}

// Função para atualizar uma venda pelo ID
function updateSaleById(id, updatedData) {
    const db = initDatabase();
    const { product, quantity, price } = updatedData;
    const sql = 'UPDATE sales SET product = ?, quantity = ?, price = ? WHERE id = ?';
    db.run(sql, [product, quantity, price, id], function(err) {
        if (err) {
            console.error('Erro ao atualizar venda', err.message);
        } else {
            console.log(`Venda com ID ${id} atualizada com sucesso`);
        }
    });
    db.close();
}

// Outras funções CRUD de vendas podem ser implementadas aqui

module.exports = {
    addSale,
    getAllSales,
    getSaleById,
    updateSaleById
    // outras funções CRUD exportadas aqui, se necessário
};
