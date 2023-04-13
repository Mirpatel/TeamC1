"use strict";

var express = require('express');

var app = express();

var mysql = require('mysql');

var cors = require('cors');

var bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());
var db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'dawgtheater123',
  port: '8001'
}); //

app["delete"]("/payment/:id", function (req, res) {
  var id = req.params.id;
  db.query("DELETE FROM dawg.payment WHERE id = ?", [id], function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).send("Error deleting payment");
    } else {
      console.log("Payment deleted successfully");
      res.status(200).send("Payment deleted successfully");
    }
  });
});
app.post("/payment", function (req, res) {
  var id = req.body.id;
  console.log("mir");
  db.query("SELECT * FROM dawg.payment WHERE userId = ?", [id], function (error, fname) {
    if (error) {
      console.log(error);
    } else {
      res.send(fname);
    }
  });
}); //

app.post("/", function (req, res) {
  // const salt = await bcrypt.genSalt(20);
  // const hashedPassword = await bcrypt.hash(req.body.Password, salt); // Hash the password from the request body
  console.log(req.body);
  var number = req.body.number;
  var exp_date = req.body.exp_date;
  var ccv = req.body.ccv;
  var name = req.body.name;
  var exp_year = req.body.exp_year;
  var userId = req.body.userId; //const Password = hashedPassword; // Use the hashed password

  db.query("INSERT INTO dawg.payment (number, exp_date, ccv, name, exp_year, userId) VALUES (?,?,?,?,? ,?)", [number, exp_date, ccv, name, exp_year, userId]);
});
app.listen(3050, function () {
  console.log("running");
});