const { response } = require("express");

const Medico = require('../models/medico.model');

const getMedicos = async ( req, res = response ) => {
  const medicos = await Medico.find()
    .populate('hospital', 'nombre img')
    .populate('usuario', 'nombre img');
  
  res.json({
    ok: true,
    medicos: medicos,
  });
}

const getMedicoById = async ( req, res = response ) => {
  const id = req.params.id;
  try {
    const medico = await Medico.findById(id)
      .populate('hospital', 'nombre img')
      .populate('usuario', 'nombre img');
    
    res.json({
      ok: true,
      medico: medico,
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: 'Error inesperado...',
    });
  }
}

const crearMedico = async ( req, res = response ) => {
  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body
  });

  try {
    const medicoDB = await medico.save();
    
    res.json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    res.json.status(500).json({
      ok: true,
      msg: 'Error inesperado...',
    });
  }
}

const actualizarMedico = async ( req, res = response ) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: 'Médico no encontrado...',
      });
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid,
    }

    const medicoActualizado = await Medico.findByIdAndUpdate(
      id, 
      cambiosMedico, 
      { new: true }
    );

    res.json({
      ok: true,
      medico: medicoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...',
    });
  }
}

const borrarMedico = async ( req, res = response ) => {
  const id = req.params.id;

  try {
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: 'Médico no encontrado...',
      });
    }

    await Medico.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: 'Médico eliminado correctamente!',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...',
    });
  }
}

module.exports = {
  getMedicos,
  getMedicoById,
  crearMedico,
  actualizarMedico,
  borrarMedico,
}