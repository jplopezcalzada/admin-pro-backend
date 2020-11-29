/*
Medicos
ruta: /api/medicos
*/
const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const {

    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicosById
} = require('../controllers/medicos')
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getMedicos);
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El id del hospital es obligatorio').isMongoId(),
    validarCampos

], crearMedico);

router.put('/:id', [validarJWT,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El id del hospital es obligatorio').isMongoId(),
    validarCampos
], actualizarMedico);

router.delete('/:id', validarJWT, borrarMedico);

router.get('/:id', validarJWT, getMedicosById);






module.exports = router;