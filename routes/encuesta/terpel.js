/*
    Ruta: /api/enecuestas
*/
const { Router } = require('express');


const { getPreguntas } = require('../../controllers/encuestas/terpel');




const router = Router();


router.get('/terpel', getPreguntas);



module.exports = router;