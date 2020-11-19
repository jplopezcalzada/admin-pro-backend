const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUploads = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipos
    const tiposValidos = ['hospitales', 'usuarios', 'medicos'];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, hospital o medico (tipo)'
        });
        // Validar un archico
    } else if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    // Procesar archivo
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extesion
    const extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'];

    if (extensionArchivo.includes(extensionesValidas)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });

    }

    //Generar nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar el imagen

    const path = `./uploads/${tipo}/${nombreArchivo}`;
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
        // actualizar la base de datos
        actualizarImagen(tipo, id, nombreArchivo);
        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });



}


const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathNoImg = path.join(__dirname, `../uploads/no-img.jpg`);

        res.sendFile(pathNoImg);
    }


}
module.exports = {

    fileUploads,
    retornaImagen
}