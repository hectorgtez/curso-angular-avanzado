/**
 * Path: '/api/medicos/'
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');

const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico
} = require('../controllers/medicos.controller');

const router = Router();

// Get all medicos
router.get(
  '/',
  getMedicos
);

// Crear medico
router.post(
  '/',
  [
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('hospital', 'El ID hospital debe ser válido').isMongoId(),
    validarCampos,
  ],
  crearMedico
);

// Editar medico
router.put(
  '/:id',
  [
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('hospital', 'El ID hospital debe ser válido').isMongoId(),
    validarCampos,
  ],
  actualizarMedico
);

// Borrar medico
router.delete(
  '/:id',
  validarJwt,
  borrarMedico
);

module.exports = router;