/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');

const { getUsuarios} = require('../../controllers/seguridad/usuarios')
const { validarJWT } = require('../../middlewares/validar-jwt');




const router = Router();


router.get('/', getUsuarios);



module.exports = router;