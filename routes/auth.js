/*
    Path '/api/login'
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
        check('email', 'EL email es obligatorio').isEmail(),
        check('password', 'La conraseña es obligatoria').not().isEmpty(),
        validarCampos

    ],
    login
);



module.exports = router;