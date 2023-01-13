const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

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

  // untuk get data
  app.get("/", (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, result) => {
      const users = JSON.parse(JSON.stringify(result));
      res.render("index", { users: users, title: "Data Mahasiswa" });
    });
  });

  // untuk insert data
  app.post("/tambah", (req, res) => {
    const insertSql = `INSERT INTO user (nama, kelas ) VALUES ('${req.body.nama}', '${req.body.kelas}')`;
    db.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
