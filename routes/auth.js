/*
    Path '/api/login'
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
        check('email', 'EL email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos

    ],
    login
);
router.post('/google', [
        check('token', 'La token Google es obligatoria').not().isEmpty(),
        validarCampos

    ],
    googleSignIn
);


module.exports = router;