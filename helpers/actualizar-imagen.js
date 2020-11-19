//const { response } = require('express');
const fs = require('fs');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        //Borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async(tipo, id, nombreArchivo) => {
    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No hay medico por id');
                return false;
            }
            pathViejo = `./uploads/${tipo}/${medico.img}`;
            borrarImagen(pathViejo);
            medico.img = nombreArchivo;
            await medico.save();
            return true;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No hay hospital por id');
                return false;
            }
            pathViejo = `./uploads/${tipo}/${hospital.img}`;
            borrarImagen(pathViejo);
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No hay usuario por id');
                return false;
            }
            pathViejo = `./uploads/${tipo}/${usuario.img}`;
            borrarImagen(pathViejo);
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'El tipo tiene que ser ususarios/medicos/hospitales'
            });



    }

};

module.exports = {

    actualizarImagen,
};