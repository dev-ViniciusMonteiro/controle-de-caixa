const express = require('express');
const { addSale, getAllSales, getSaleById, updateSaleById } = require('./salesController');

const app = express();
const PORT = 3000;

// Middleware para permitir o parsing de JSON
app.use(express.json());

// Rota para adicionar uma nova venda
app.post('/sales', (req, res) => {
    const { product, quantity, price } = req.body;
    if (!product || !quantity || !price) {
        return res.status(400).json({ error: 'Campos inválidos' });
    }
    addSale({ product, quantity, price });
    res.status(201).send('Venda adicionada com sucesso');
});

// Rota para buscar todas as vendas
app.get('/sales', (req, res) => {
    getAllSales((sales) => {
        res.json(sales);
    });
});

// Rota para buscar uma venda pelo ID
app.get('/sales/:id', (req, res) => {
    const { id } = req.params;
    getSaleById(parseInt(id), (sale) => {
        if (sale) {
            res.json(sale);
        } else {
            res.status(404).json({ error: 'Venda não encontrada' });
        }
    });
});

// Rota para atualizar uma venda pelo ID
app.put('/sales/:id', (req, res) => {
    const { id } = req.params;
    const { product, quantity, price } = req.body;
    if (!product || !quantity || !price) {
        return res.status(400).json({ error: 'Campos inválidos' });
    }
    updateSaleById(parseInt(id), { product, quantity, price });
    res.send('Venda atualizada com sucesso');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
