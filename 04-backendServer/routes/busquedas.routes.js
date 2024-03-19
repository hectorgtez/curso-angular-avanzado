/**
 * Path: '/api/todo/'
 */

const { Router } = require('express');
const { validarJwt } = require('../middlewares/validar-jwt');

const { 
  getTodo,
  getDocumentosColeccion,
} = require('../controllers/busquedas.controller');

const router = Router();

// Busqueda
router.get('/:busqueda', validarJwt, getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJwt, getDocumentosColeccion);

module.exports = router;