/**
 * Path: /api/uploads/
 */

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validarJwt } = require('../middlewares/validar-jwt');

const { 
  fileUpload,
  retornaImagen,
} = require('../controllers/uploads.controller');

const router = Router();
router.use(expressFileUpload());

// Rutas
router.put('/:tipo/:id', validarJwt, fileUpload);
router.get('/:tipo/:foto', retornaImagen);

module.exports = router;