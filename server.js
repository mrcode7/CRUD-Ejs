const express = require("express");
const mysql = require("mysql");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tbl_mahasiswa",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected");

  const sql = "SELECT * FROM user";
  db.query(sql, (err, result) => {
    const users = JSON.parse(JSON.stringify(result));
    console.log("hasil database", users);
    app.get("/", (req, res) => {
      res.render("index", { users: users, title: "Data Mahasiswa" });
    });
  });
});

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
