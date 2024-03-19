const { response } = require("express");

const Hospital = require('../models/hospital.model');

const getHospitales = async ( req, res = response ) => {
  const hospitales = await Hospital.find()
    .populate('usuario','nombre img');
  
  res.json({
    ok: true,
    hospitales: hospitales,
  });
}

const crearHospital = async ( req, res = response ) => {
  const uid = req.uid;
  const hospital = new Hospital({
    usuario: uid,
    ...req.body
  });

  try {
    const hospitalDB = await hospital.save();
    
    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    res.json.status(500).json({
      ok: true,
      msg: 'Error inesperado...',
    });
  }
}

const actualizarHospital = ( req, res = response ) => {
  res.json({
    ok: true,
    msg: 'actualizarHospital',
  });
}

const borrarHospital = ( req, res = response ) => {
  res.json({
    ok: true,
    msg: 'borrarHospital',
  });
}

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
}