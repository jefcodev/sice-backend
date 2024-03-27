const { response } = require("express");
const bcrypt = require("bcryptjs");

const db_mysql = require('../database/config').db_mysql;
const { generarJWT } = require("../helpers/jwt");


const login = async (req, res = response) => {

  const { email, password } = req.body;
  try {
    const [rows] = await db_mysql.promise().query("SELECT * FROM users_2 WHERE email = ?", [email]);

    // Verificar si el usuario existe
    if (!rows || rows.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }

    // Obtener el primer usuario de la respuesta
    const usuarioDB = rows[0];

    // Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no válida",
      });
    }

    // Generar TOKEN - JWT
    const token = await generarJWT(usuarioDB.id);

    delete usuarioDB.password;

    res.status(200).json({
      ok: true,
      token,
      usuario: usuarioDB
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;

  // Generar el TOKEN - JWT
  const token = await generarJWT(uid);
  const [rows] = await db_mysql.promise().query("SELECT * FROM users_2 WHERE id = ?", [uid]);


  const usuarioDB = rows[0];


  delete usuarioDB.password;

  res.json({
    ok: true,
    token,
    usuario: usuarioDB
  });
};

module.exports = {
  login,
  renewToken
};
