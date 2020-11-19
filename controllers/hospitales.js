const { response } = require('express');

const Hospital = require('../models/hospital');
const getHospitales = async(req, resp = response) => {
    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');
    resp.json({
        ok: true,
        hospitales
    });
};

const crearHospital = async(req, resp = response) => {
    const uid = req.uid;

    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();
        resp.json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el adminsitrador'
        });
    }

};

const actualizarHospital = (req, resp = response) => {

    resp.json({
        ok: true,
        msg: 'actualizarHospital'
    });
};

const borrarHospital = (req, resp = response) => {

    resp.json({
        ok: true,
        msg: 'borrarHospital'
    });
};


module.exports = {

    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}