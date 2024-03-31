const pool = require('../../database/config').pool;

const getPreguntas = async (req, res) => {
  try {
    const desde = Number(req.query.desde) || 0;
    const limit = 10;
    const sector = req.query.sector;
    const local = req.query.local;
    const mobil = req.query.mobil;

    let query = `SELECT Id, Fecha_Creado, Nombre_Establecimiento, Region, Provincia, Ciudad, Sector, Direccion, Numero, Transversal, Geolocalizacion, tipo_local, numero_cambios_al_mes, rotulo_mobil, URL_Foto FROM terpel_questions`;
    const queryParams = [];
    let queryCount = `SELECT COUNT(*) as total FROM terpel_questions`;

    if (sector || local || mobil) {
      query += ` WHERE`;
      if (sector) {
        query += ` Sector = ?`;
        queryParams.push(sector);
      }
      if (local) {
        if (sector) query += ` AND`;
        query += ` tipo_local = ?`;
        queryParams.push(local);
      }
      if (mobil) {
        if (sector || local) query += ` AND`;
        query += ` Vende_Mobil = ?`;
        queryParams.push(mobil);
      }
    }

    query += ` LIMIT ?, ?`;

    // Consulta para obtener el conteo total de registros sin el filtro por sector
    const totalCountResultAll = await new Promise((resolve, reject) => {
      pool.query(queryCount, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0].total);
        }
      });
    });

    // Consulta para obtener el conteo total de registros con el filtro por sector si se proporciona
    let totalCountResultFiltered = null;
    if (sector || local || mobil) {
      totalCountResultFiltered = await new Promise((resolve, reject) => {
        pool.query(queryCount + (sector || local || mobil ? ` WHERE` : ``) + (sector ? ` Sector = ?` : ``) + (sector && local ? ` AND` : ``) + (local ? ` tipo_local = ?` : ``) + ((sector || local) && mobil ? ` AND` : ``) + (mobil ? ` Vende_Mobil = ?` : ``), queryParams, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0].total);
          }
        });
      });
    }

    const [preguntasResult] = await Promise.all([
      new Promise((resolve, reject) => {
        pool.query(query, [...queryParams, desde, limit], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      })
    ]);

    const preguntas = preguntasResult;

    res.status(200).json({
      ok: true,
      preguntas,
      totalTodos: totalCountResultAll,
      totalFiltrado: totalCountResultFiltered
    });
  } catch (error) {
    console.error('Error al realizar la consulta:', error);
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener las preguntas'
    });
  }
};




  
  


  const getEstablecimientos = async (req, res) => {
    try {
        const query = `SELECT * FROM terpel_questions` ;
  
        const preguntas = await new Promise((resolve, reject) => {
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
          preguntas
        });
  
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).json({
          ok: false,
          msg: 'Error al obtener las preguntas' 
        });
    } }


module.exports = {
    getPreguntas
}
