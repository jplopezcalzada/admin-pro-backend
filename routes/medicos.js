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
    borrarMedico
} = require('../controllers/medicos')
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getMedicos);
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El id del hospital es obligatorio').isMongoId(),
    validarCampos

], crearMedico);

router.put('/:id', [], actualizarMedico);

router.delete('/:id', borrarMedico);





module.exports = router;