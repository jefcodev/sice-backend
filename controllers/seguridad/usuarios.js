const pool = require('../../database/config').pool;

const getUsuarios = async (req, res) => {
  try {
      const query = 'SELECT * FROM users';

      const usuarios = await new Promise((resolve, reject) => {
          pool.query(query, (err, results) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(results);
              }
          });
      });

      res.status(200).json({
        ok: true,
        usuarios
      });

  } catch (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({
        ok: false,
        msg: 'Error al obtener los usuarios' 
      });
  } }

module.exports = {
  getUsuarios
}
