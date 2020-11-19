const { response } = require('express');

const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getMedicos = async(req, resp = response) => {
    const medico = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre');
    //   .populate('usuario', 'nombre img');
    resp.json({
        ok: true,
        medico
    });
};

const crearMedico = async(req, resp = response) => {
    const { hid } = req.body;
    const uid = req.uid;
    try {
        /* const hospitalDB = await Hospital.findById(hid);
         if (!hospitalDB) {
             return resp.status(404).json({
                 ok: false,
                 msg: 'No existe hospital con ese id'
             });
         }*/

        const medico = new Medico({
            usuario: uid,
            ...req.body

        });


        const medicoDB = await medico.save();
        resp.json({
            ok: true,
            medico: medicoDB
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el adminsitrador'
        });
    }

};

const actualizarMedico = (req, resp = response) => {

    resp.json({
        ok: true,
        msg: 'actualizarMedico'
    });
};

const borrarMedico = (req, resp = response) => {

    resp.json({
        ok: true,
        msg: 'borrarMedico'
    });
};


module.exports = {

    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}