const { response } = require('express');
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
        console.log('usuarioGoogle', name, email, picture);
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        console.log('usuarioDB', usuarioDB);
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
        console.log('usuario', usuario);
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
module.exports = {

    login,
    googleSignIn

}