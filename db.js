import mysql from 'mysql'

// export const db = mysql.createConnection({
//   host: 'us-cdbr-east-06.cleardb.net',
//   user: 'bdbac09b81d73d',
//   password: '41d47919',
//   database: 'heroku_98ea9202b41516c',
// })

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Mota2018',
  database: 'chatgpt',
})