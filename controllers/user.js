import { db } from '../db.js';

export const getUsers = (_, res) => {
  const q = "SELECT * FROM users-chatgpt WHERE deleted_time IS NULL"

  db.query(q, (err, data) => {
    if (err) return res.json(err)

    const filteredData = data.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return res.status(200).json(filteredData);
  });
};



export const addUser = (req, res) => {
  const q = "INSERT INTO users-chatgpt (name, email, password) VALUES (?)"
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
  ]
  db.query(q, [values], (err) => {
    if (err) return res.json(err)

    return res.status(200).json('Usuário criado com sucesso.')
  })
}

export const updateUser = (req, res) => {
  const q = "UPDATE users-chatgpt SET name=?, email=?, password=? WHERE id=?"
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
  ]
  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err)

    return res.status(200).json('Usuário atualizado com sucesso.')
  })
}

export const deleteUser = (req, res) => {
  const q = "UPDATE users-chatgpt SET deleted_time=? WHERE id=?"
  const currentTime = new Date().toISOString()
  const values = [
    currentTime
  ]
  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err)

    return res.status(200).json('Usuário deletado com sucesso.')
  })
}
