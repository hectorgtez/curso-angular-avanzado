const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

const validarJwt = ( req, res = response, next ) => {
  // Leer el token
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      ok: false,
      msg: 'Token inválido',
    });
  }
}

const validarAdminRole = async (req, res = response, next) => {
  const uid = req.uid;

  try {
    const usuarioDb = await Usuario.findById(uid);

    if (!usuarioDb) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no existe',
      });
    }

    if (usuarioDb.role !== 'ADMIN_ROLE') {
      return res.status(403).json({
        ok: false,
        msg: 'El usuario no es administrador',
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Póngase en contacto con su administrador',
    });
  }
}

const validarAdminRoleOMismoUsuario = async (req, res = response, next) => {
  const uid = req.uid;
  const id = req.params.id;

  try {
    const usuarioDb = await Usuario.findById(uid);

    if (!usuarioDb) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no existe',
      });
    }

    if (usuarioDb.role === 'ADMIN_ROLE' || uid === id) {
      next();
    } else { 
      return res.status(403).json({
        ok: false,
        msg: 'El usuario no es administrador',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Póngase en contacto con su administrador',
    });
  }
}

module.exports = {
  validarJwt,
  validarAdminRole,
  validarAdminRoleOMismoUsuario,
}