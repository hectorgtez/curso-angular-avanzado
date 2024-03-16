const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJwt = ( req, res = response, next ) => {
  // Leer el token
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      ok: false,
      msg: 'Token inválido',
    });
  }
}

module.exports = {
  validarJwt,
}