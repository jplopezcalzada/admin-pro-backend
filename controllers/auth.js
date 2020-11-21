const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if (!usuarioDB) {
            // no existe el usuario
            usuario = new Usuario({
                nombre: name,
                password: '@@@',
                img: picture,
                email,
                google: true
            });

        } else {
            //Existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }
        // Guardar en BD
        await usuario.save();
        // Generar TOKEN JWT
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            msg: 'Google Signin',
            token

        });
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no correcto',
            googleToken

        });
    }

}

const renewToken = async(req, res = response) => {
    const uid = req.uid;
    // Generar TOKEN JWT
    const token = await generarJWT(uid);
    res.json({
        ok: true,
        token
    });

}
module.exports = {

    login,
    googleSignIn,
    renewToken

}