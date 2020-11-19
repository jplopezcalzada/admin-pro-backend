/*
Busqueda 
ruta: /api/todo/:busqueda
*/

const { check } = require('express-validator');
const { Router } = require('express');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:busqueda', validarJWT, getTodo);

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);



module.exports = router;