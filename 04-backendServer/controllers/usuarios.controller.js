const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const { generarJwt } = require('../helpers/jwt');

const getUsuarios = async ( req, res = response ) => {
  const from = Number(req.query.from) || 0;

  const [ usuarios, totalRegistros ] = await Promise.all([
    Usuario
      .find({}, 'nombre email role google img')
      .skip(from)
      .limit(5),

    Usuario.countDocuments(),
  ]);

  res.json({
    ok: true,
    usuarios: usuarios,
    total: totalRegistros,
  })
};

const crearUsuario = async ( req, res = response ) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya existe...',
      });
    }

    const usuario = new Usuario(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar usuario
    await usuario.save();

    // Generar JWT
    const token = await generarJwt(usuario.id);

    res.json({
      ok: true,
      usuario: usuario,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...',
    });
  }
};

const actualizarUsuario = async ( req, res = response ) => {
  const uid = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usuario con ese ID',
      });
    }

    // Actualizaciones
    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email: email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: 'Ya existe un usuario con ese email',
        });
      }
    }

    if (!usuarioDB.google) {
      campos.email = email;
    } else if (usuarioDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuarios de Google no pueden cambiar su correo'
      })
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...',
    });
  }
};

const borrarUsuario = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe',
      });
    }

    await Usuario.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: 'Usuario eliminado correctamente',
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...',
    });
  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
};