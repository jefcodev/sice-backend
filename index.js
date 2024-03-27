require('dotenv').config()

const express = require('express')
const cors = require('cors')

// Crear servidor express
const app = express();

// Configuración cors
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
});

// Core
app.use('/api/v1/login', require('./routes/auth'));

// Users
app.use('/api/v1/usuarios', require('./routes/seguridad/usuarios'));

//Preguntas
app.use('/api/v1/encuestas', require('./routes/encuesta/terpel'));




app.listen(process.env.PORT, () => {
    console.log('Servidor ' + process.env.PORT)
})