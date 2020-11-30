const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, resp, next) => {

    // Leer token

    const token = req.header('x-token');

    if (!token) {
        return resp.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        return resp.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
};

const validarADMIN_ROLE = async(req, resp, next) => {
    const uid = req.uid;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }
        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return resp.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const validarADMIN_ROLE_o_MismoUsuario = async(req, resp, next) => {
    const uid = req.uid;
    const id = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }
        if (usuarioDB.role !== 'ADMIN_ROLE' && uid !== id) {
            return resp.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};


module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
};