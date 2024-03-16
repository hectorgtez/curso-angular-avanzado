const { response } = require('express');

const getTodo = ( req, res = response ) => {
  const { termino } = req.params;

  res.json({
    ok: true,
    termino: termino,
  });
}

module.exports = {
  getTodo,
}