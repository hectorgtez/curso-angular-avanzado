/**
 * Path: /api/todo/:busqueda
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');

const { 
  getTodo,
} = require('../controllers/busquedas.controller');

const router = Router();

// Busqueda
router.get(
  '/:termino',
  [
    validarJwt,
  ],
  getTodo
);

module.exports = router;