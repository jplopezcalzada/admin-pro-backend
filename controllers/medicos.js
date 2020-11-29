const { response } = require('express');

const Medico = require('../models/medico');

const getMedicos = async(req, resp = response) => {
    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre');
    //   .populate('usuario', 'nombre img');
    resp.json({
        ok: true,
        medicos
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

const actualizarMedico = async(req, resp = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            return resp.status(404).json({
                ok: true,
                msg: 'Medico no encontrado'
            });

        }
        const cambioMedico = {
            ...req.body,
            usuario: uid
        };
        const medicoActualizado = await Medico.findOneAndUpdate(id, cambioMedico, { new: true });
        resp.json({
            ok: true,
            msg: 'Medico actualizado',
            medico: medicoActualizado
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

const borrarMedico = async(req, resp = response) => {
    const id = req.params.id;
    try {
        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            return resp.status(404).json({
                ok: true,
                msg: 'Medico no encontrado'
            });

        }
        await Medico.findByIdAndDelete(id);
        resp.json({
            ok: true,
            msg: 'Medico Borrado'
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

const getMedicosById = async(req, resp = response) => {
    const id = req.params.id;
    try {
        const medico = await Medico.findById(id)
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre');

        resp.json({
            ok: true,
            medico
        });
    } catch (error) {
        console.log(error);
        resp.json({
            ok: true,
            msg: 'Hable con el administrador'
        });
    }

};
module.exports = {

    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicosById
}