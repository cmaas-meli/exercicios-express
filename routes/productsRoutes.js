const express = require('express');
const router = express.Router();

let products = require('../productList')

// Listar todos os produtos
router.get('/', (req,res) => {
    res.json(products)
});
// Listar apenas um produto
router.get('/:id', (req,res) => {
    const id = Number(req.params.id)
    res.json(products.find((product) => product.id === id))
    console.log(id)
});

// Adicionar produtos
router.post('/', (req,res) =>{
    const content = req.body

    const newProducts = [...products, content]

    res.status(201).json(newProducts)
})

// Alterar produto
router.put('/:id', (req, res) =>{
    const id = Number(req.params.id);
    const content = req.body

    const product = products.find((product) => product.id === id)

    if(!product){
        return res.status(400).json({"message": "Produto não encontrado"})
    }

    const produtoAtualizado = products.map((product) => {
        if(product.id === id) return content; 
        return product;
    })

    products = produtoAtualizado

    res.status(200).json(products);
})

// Deletar produto
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    
    const product = products.find((produto) => produto.id === id)

    if(!product){
        return res.status(400).json({"message": "Produto não encontrado"})
    }

    products = products.filter((product) => product.id !== id)

    res.json(products)
})

module.exports = router;
