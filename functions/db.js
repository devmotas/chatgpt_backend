/* eslint-disable require-jsdoc */

require("dotenv").config();

const mysql = require("mysql2");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let db;

function handleDisconnect() {
  db = mysql.createConnection(dbConfig);

  db.connect((err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
      setTimeout(handleDisconnect, 2000); // Tentar reconectar após 2 segundos
    } else {
      console.log("Conexão estabelecida com sucesso!");
    }
  });

  db.on("error", (err) => {
    console.error("Erro na conexão com o banco de dados:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect(); // Tentar reconectar
    } else {
      throw err;
    }
  });
}

handleDisconnect();

exports.db = db.promise();
