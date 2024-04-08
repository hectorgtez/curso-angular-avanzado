/**
 * Path: '/api/usuarios/'
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const {
  validarJwt,
  validarAdminRole,
  validarAdminRoleOMismoUsuario,
} = require('../middlewares/validar-jwt');

const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario
} = require('../controllers/usuarios.controller');

const router = Router();

// Get all usuarios
router.get(
  '/',
  [
    validarJwt
  ],
  getUsuarios
);

// Crear usuario
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos,
  ],
  crearUsuario
);

// Editar usuario
router.put(
  '/:id',
  [
    validarJwt,
    validarAdminRoleOMismoUsuario,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);

// Borrar usuario
router.delete(
  '/:id',
  [
    validarJwt
  ],
  borrarUsuario
);

module.exports = router;