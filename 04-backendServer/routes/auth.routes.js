/**
 * Path: '/api/login'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');


const {
  login,
  loginGoogle,
  renewToken,
} = require('../controllers/auth.controller');

const router = Router();

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  '/google',
  [
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  loginGoogle
);

router.get(
  '/renew',
  validarJwt,
  renewToken
);

module.exports = router;