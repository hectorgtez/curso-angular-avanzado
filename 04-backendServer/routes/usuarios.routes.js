/**
 * Path: '/api/usuarios'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios.controller');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJwt, getUsuarios );
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
router.put(
  '/:id',
  [
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);
router.delete('/:id', validarJwt, borrarUsuario);

module.exports = router;