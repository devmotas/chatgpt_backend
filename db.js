import mysql from 'mysql'

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Mota2018',
  database: 'chatgpt',
})