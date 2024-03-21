const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const { generarJwt } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const loginGoogle = async (req, res = response) => {
  try {
    const { email, name, picture } = await googleVerify(req.body.token);

    const usuarioDB = await Usuario.findOne({ email });
    let usuario;

    if (!usuarioDB) {
      usuario = new Usuario({
        nombre: name,
        email: email,
        password: '@@@',
        img: picture,
        google: true,
      })
    } else {
      usuario = usuarioDB;
      usuario.google = true;
    }

    // Guardar usuario
    await usuario.save();

    // Generar JWT
    const token = await generarJwt(usuario.id);

    res.json({
      ok: true,
      email: email,
      name: name,
      picture: picture,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: 'Token de Google inválido...',
    });
  }
}

const renewToken = async ( req, res = response ) => {
  const uid = req.uid;
  const token = await generarJwt(uid);

  res.json({
    ok: true,
    token: token,
  })
}

module.exports = {
  login,
  loginGoogle,
  renewToken,
}