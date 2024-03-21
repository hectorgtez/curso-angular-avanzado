/**
 * Path: '/api/hospitales/'
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');

const { 
  getHospitales, 
  crearHospital, 
  actualizarHospital, 
  borrarHospital 
} = require('../controllers/hospitales.controller');

const router = Router();

// Get all hospitales
router.get(
  '/',
  getHospitales
);

// Crear hospital
router.post(
  '/',
  [
    validarJwt,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos,
  ],
  crearHospital
);

// Editar hospital
router.put(
  '/:id',
  [
    validarJwt,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos,
  ],
  actualizarHospital
);

// Borrar hospital
router.delete(
  '/:id',
  validarJwt,
  borrarHospital
);

module.exports = router;