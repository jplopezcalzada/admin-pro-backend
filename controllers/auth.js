const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, resp = response) => {
    const { email, password } = req.body;
    try {
        // Verifiacar email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'email no encontrado'
            });

        }
        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return resp.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });

        }

        // Generar TOKEN JWT
        const token = await generarJWT(usuarioDB.id);
        resp.json({
            ok: true,
            msg: token

        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


module.exports = {

    login,

}