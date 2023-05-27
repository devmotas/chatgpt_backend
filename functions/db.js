/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
require("dotenv").config();

const mysql = require("mysql");


let db;
let retryCount = 0;

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
      if (retryCount < 10) {
        retryCount++;
        console.log("Tentando reconectar. Tentativa", retryCount);
        setTimeout(handleDisconnect, 2000); // Tentar reconectar após 2 segundos
      } else {
        console.error("Número máximo de tentativas excedido. Não é possível conectar ao banco de dados.");
      }
    } else {
      console.log("Conexão bem-sucedida!");
      retryCount = 0; // Zerar o contador em caso de sucesso
    }
  });

  db.on("error", (err) => {
    console.error("Erro no banco de dados:", err);
    if (retryCount < 10) {
      retryCount++;
      console.log("Tentando reconectar. Tentativa", retryCount);
      handleDisconnect(); // Reconectar se a conexão for perdida
    } else {
      console.error("Número máximo de tentativas excedido. Não é possível reconectar ao banco de dados.");
      throw err;
    }
  });
}


handleDisconnect();

exports.db = db;
