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

const actualizarMedico = ( req, res = response ) => {
  res.json({
    ok: true,
    msg: 'actualizarMedico',
  });
}

const borrarMedico = ( req, res = response ) => {
  res.json({
    ok: true,
    msg: 'borrarMedico',
  });
}

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
}