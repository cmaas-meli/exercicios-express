const express = require('express');

const app = express();

app.use(express.json())

const rotaProdutos = require('./routes/productsRoutes')
const rotaUsuarios = require('./routes/usersRoutes')


app.use('/api/products', rotaProdutos)
app.use('/api/users', rotaUsuarios)
app.use((req,res,next) =>{
    res.status(404).send('Erro 404. Not Found')
})

app.listen(3000, () =>
console.log('Servidor Ativo')
)
