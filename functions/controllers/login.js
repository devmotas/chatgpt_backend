/* eslint-disable max-len */

require("dotenv").config();
const mysql = require("mysql2");


exports.login = (req, res) => {
  const db = mysql.createConnection(process.env.DATABASE_URL);
  console.log("Connected to PlanetScale!");

  const {email, password} = req.body;

  // Verificar se as credenciais são válidas
  if (!email || !password) {
    return res.status(400).json({message: "E-mail e senha são obrigatórios."});
  }

  const q = "SELECT * FROM users WHERE email = ? AND deleted_time IS NULL LIMIT 1";
  const values = [email];

  db.query(q, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({message: "Ocorreu um erro ao tentar fazer login.", erro: err});
    }

    if (results.length === 0) {
      return res.status(400).json({message: "E-mail ou senha inválidos."});
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(400).json({message: "E-mail ou senha inválidos."});
    }

    db.end();

    return res.status(200).json({message: "Login realizado com sucesso.", user: user});
  });
};
