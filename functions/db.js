/* eslint-disable require-jsdoc */
require("dotenv").config();


const mysql = require("mysql");

let db;

function handleDisconnect() {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  db.connect((err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
      setTimeout(handleDisconnect, 2000); // Tentar reconectar após 2 segundos
    }
  });

  db.on("error", (err) => {
    console.error("Erro no banco de dados:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST" ||
     err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
      handleDisconnect(); // Reconectar se a conexão for perdida
    } else {
      throw err;
    }
  });
}

handleDisconnect();

exports.db = db;
