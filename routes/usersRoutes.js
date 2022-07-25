const express = require('express');
const router = express.Router();

let users = [];

// Listar todos os usuários
router.get('/', (req,res) => {
     res.json(users)
});

// Listar um usuário específico
router.get('/:username', (req,res) => {
    const username = req.params.username
    res.json(users.find((user) => user.username == username))
    console.log(username)
});

// Cadastrar usuários
router.post('/', (req,res) => {
    const content = req.body;

    users.push(content);

    res.status(201).json(users)
})

//Alterar usuario
router.put('/:username', (req,res) => {
    const username = req.params.username;
    const content = req.body;

    if(!users.find((user) => user.username === username)){
        return res.status(400).json({"message": "Usuário não encontrado"})
    }

    const usuarioAtualizado = users.map((user) => {
        if(user.username === username) return content;
        return user
    })

    users = usuarioAtualizado

    return res.status(200).json(users)
})

//Alterar senha de um usuario
router.patch('/:username', (req,res) =>{
    const username = req.params.username;
    const password  = req.body.password;

    let usuario = users.find((user) => user.username == username)
    
    if(!usuario) return res.status(400).json({"message":"Usuário não encontrado"})

    usuarioAtualizado = users.map((user) => {
        if(user == usuario) { 
            console.log(password);
            user.password = password;
        }
        return user
    })

    users = usuarioAtualizado

    return res.status(200).json(users)
})

//Deletar um usuário
router.delete('/:username', (req,res) => {
    const username = req.params.username;

    let usuario = users.find((user) => user.username == username)
    
    if(!usuario) return res.status(400).json({"message":"Usuário não encontrado"})

    users.splice(users.indexOf(usuario), 1)

    return res.status(200).json(users)
})

module.exports = router;