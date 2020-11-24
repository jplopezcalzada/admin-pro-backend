/*
Upload 
ruta: /api/upload/
*/

const { Router } = require('express');
const expressfileUpload = require('express-fileupload');


const { fileUploads, retornaImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(expressfileUpload());
router.put('/:tipo/:id', validarJWT, fileUploads);
//router.get('/:tipo/:foto', validarJWT, retornaImagen);
router.get('/:tipo/:foto', retornaImagen);



module.exports = router;