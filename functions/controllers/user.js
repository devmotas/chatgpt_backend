/* eslint-disable no-unused-vars */
// const {db} = require("../db.js");

require("dotenv").config();
const mysql = require("mysql2");

exports.getUsers = (_, res) => {
  const db = mysql.createConnection(process.env.DATABASE_URL);
  console.log("Connected to PlanetScale!");

  const q = "SELECT * FROM users WHERE deleted_time IS NULL";

  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      db.end();
      return res.json(err);
    }

    const filteredData = data.map((user) => {
      const {password, ...userWithoutPassword} = user;
      return userWithoutPassword;
    });

    db.end();

    return res.status(200).json(filteredData);
  });
};
exports.addUser = (req, res) => {
  const db = mysql.createConnection(process.env.DATABASE_URL);
  console.log("Connected to PlanetScale!");

  // Verifica se o usuário já existe
  const checkQuery = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
  const email = req.body.email;
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error(err);
      db.end();
      return res.json(err);
    }

    const userExists = results[0].count > 0;
    if (userExists) {
      db.end();
      return res.status(400).json("Usuário já existe.");
    }

    // Cria o usuário
    const insertQuery = "INSERT INTO users (name, email, password) VALUES (?)";
    const values = [
      req.body.name,
      req.body.email,
      req.body.password,
    ];
    db.query(insertQuery, [values], (err) => {
      if (err) {
        console.error(err);
        db.end();
        return res.json(err);
      }

      db.end();
      return res.status(200).json("Usuário criado com sucesso.");
    });
  });
};

exports.updateUser = (req, res) => {
  const db = mysql.createConnection(process.env.DATABASE_URL);
  console.log("Connected to PlanetScale!");


  const q = "UPDATE users SET name=?, email=?, profile_image=? WHERE id=?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.profile_image,
  ];
  db.query(q, [...values, req.params.id], (err) => {
    if (err) {
      console.error(err);
      db.end();
      return res.json(err);
    }

    db.end();

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

exports.deleteUser = (req, res) => {
  const db = mysql.createConnection(process.env.DATABASE_URL);
  console.log("Connected to PlanetScale!");

  // Verifica se o usuário existe
  const checkQuery = "SELECT COUNT(*) AS count FROM users WHERE id = ?";
  const userId = req.params.id;
  db.query(checkQuery, [userId], (err, results) => {
    if (err) {
      console.error(err);
      db.end();
      return res.json(err);
    }

    const userExists = results[0].count > 0;
    if (!userExists) {
      db.end();
      return res.status(500).json("Usuário não encontrado.");
    }

    // Deleta o usuário
    const deleteQuery = "UPDATE users SET deleted_time = ? WHERE id = ?";
    const currentTime = new Date().toISOString();
    const values = [
      currentTime,
    ];
    db.query(deleteQuery, [...values, userId], (err) => {
      if (err) {
        console.error(err);
        db.end();
        return res.json(err);
      }

      db.end();
      return res.status(200).json("Usuário deletado com sucesso.");
    });
  });
};


exports.updatePassword = (req, res) => {
  const db = mysql.createConnection(process.env.DATABASE_URL);
  console.log("Connected to PlanetScale!");


  const q = "SELECT password FROM users WHERE id=?";
  const values = [req.params.id];
  db.query(q, values, (err, results) => {
    if (err) {
      console.error(err);
      db.end();
      return res.json(err);
    }
    const user = results[0];
    if (!user) {
      db.end();
      return res.status(404).json("Usuário não encontrado.");
    }

    const {password: oldPassword} = user;
    const {newPassword} = req.body;

    if (oldPassword !== req.body.password) {
      db.end();
      return res.status(401).json("Senha antiga incorreta.");
    }
    const qUpdate = "UPDATE users SET password=? WHERE id=?";
    const valuesUpdate = [newPassword, req.params.id];
    db.query(qUpdate, valuesUpdate, (err) => {
      if (err) {
        console.error(err);
        db.end();
        return res.json(err);
      }

      db.end();

      return res.status(200).json("Senha atualizada com sucesso.");
    });
  });
};

exports.updateAuthorization = (req, res) => {
  const db = mysql.createConnection(process.env.DATABASE_URL);
  console.log("Connected to PlanetScale!");
  const q = "SELECT authorization FROM users WHERE id=?";
  const values = [req.params.id];
  db.query(q, values, (err, results) => {
    if (err) {
      console.error(err);
      db.end();
      return res.json(err);
    }
    const user = results[0];
    if (!user) {
      db.end();
      return res.status(404).json("Usuário não encontrado.");
    }
    const {authorization} = req.body;

    const qUpdate = "UPDATE users SET authorization=? WHERE id=?";
    const valuesUpdate = [authorization, req.params.id];
    db.query(qUpdate, valuesUpdate, (err) => {
      if (err) {
        console.error(err);
        db.end();
        return res.json(err);
      }
      db.end();
      return res.status(200).json("Autorização atualizada com sucesso.");
    });
  });
};
