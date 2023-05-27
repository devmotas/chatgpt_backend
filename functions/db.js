const mysql = require("mysql");

exports.db = mysql.createConnection({
  host: "us-cdbr-east-06.cleardb.net",
  user: "ba3361d9963c59",
  password: "78504133",
  database: "heroku_e9da8e1bcac571c",
});

// exports.db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "@Mota2018",
//   database: "chatgpt",
// });
