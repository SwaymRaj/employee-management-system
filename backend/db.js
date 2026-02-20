const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nickhaldenmusicbox",
  database: "ems_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("Database Connected");
});

module.exports = db;
