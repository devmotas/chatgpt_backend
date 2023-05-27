/* eslint-disable no-unused-vars */
const {db} = require("../db.js");

exports.getUsers = (_, res) => {
  // const q = "SELECT * FROM users-chatgpt WHERE deleted_time IS NULL"
  const q = "SELECT * FROM users WHERE deleted_time IS NULL";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    const filteredData = data.map((user) => {
      const {password, ...userWithoutPassword} = user;
      return userWithoutPassword;
    });

    return res.status(200).json(filteredData);
  });
};


exports.addUser = (req, res) => {
  // const q = "INSERT INTO users-chatgpt (name, email, password) VALUES (?)"
  const q = "INSERT INTO users (name, email, password) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
  ];
  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

exports.updateUser = (req, res) => {
  // const q = "UPDATE users-chatgpt SET name=?, email=?, password=? WHERE id=?"
  const q = "UPDATE users SET name=?, email=? WHERE id=?";
  const values = [
    req.body.name,
    req.body.email,
  ];
  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

exports.deleteUser = (req, res) => {
  // const q = "UPDATE users-chatgpt SET deleted_time=? WHERE id=?"
  const q = "UPDATE users SET deleted_time=? WHERE id=?";
  const currentTime = new Date().toISOString();
  const values = [
    currentTime,
  ];
  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};

exports.updatePassword = (req, res) => {
  const q = "SELECT password FROM users WHERE id=?";
  const values = [req.params.id];
  db.query(q, values, (err, results) => {
    if (err) return res.json(err);
    const user = results[0];
    if (!user) return res.status(404).json("Usuário não encontrado.");

    const {password: oldPassword} = user;
    const {newPassword} = req.body;

    if (oldPassword !== req.body.password) {
      return res.status(401).json("Senha antiga incorreta.");
    }

    const qUpdate = "UPDATE users SET password=? WHERE id=?";
    const valuesUpdate = [newPassword, req.params.id];
    db.query(qUpdate, valuesUpdate, (err) => {
      if (err) return res.json(err);

      return res.status(200).json("Senha atualizada com sucesso.");
    });
  });
};


