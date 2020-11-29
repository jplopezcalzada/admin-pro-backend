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

const actualizarHospital = async(req, resp = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            return resp.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado'
            });

        }
        const cambioHospital = {
            ...req.body,
            usuario: uid
        };
        const hospitalActualizado = await Hospital.findOneAndUpdate(id, cambioHospital, { new: true });
        resp.json({
            ok: true,
            msg: 'actualizarHospital',
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

const borrarHospital = async(req, resp = response) => {

    const id = req.params.id;
    try {
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            return resp.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado'
            });

        }
        await Hospital.findByIdAndDelete(id);
        resp.json({
            ok: true,
            msg: 'Hospital Borrado'
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};


module.exports = {

    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}