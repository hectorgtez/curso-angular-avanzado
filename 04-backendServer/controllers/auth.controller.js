const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const { generarJwt } = require('../helpers/jwt');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuarioDB = await Usuario.findOne({ email: email });

    // Validar email
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'El email no existe',
      });
    }

    // Validar contraseña
    const validPassword= bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'La contraseña es incorrecta',
      });
    }

    // Generar el Token - JWT
    const token = await generarJwt(usuarioDB.id);

    res.json({
      ok: true,
      token: token,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte a su administrador',
    });
  }
}

module.exports = {
  login,
}