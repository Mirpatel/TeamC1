"use strict";

var express = require('express');

var app = express();

var mysql = require('mysql');

var cors = require('cors');

app.use(cors());
app.use(express.json());
var db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'dawgtheater123',
  port: '8001'
});
app.post("/", function (req, res) {
  console.log(req.body);
  var name = req.body.name;
  var date = req.body.date;
  var trailer = req.body.trailer;
  var description = req.body.description;
  var Rating = req.body.Rating;
  var url = req.body.url;
  var genre = req.body.genre;
  var producer = req.body.producer;
  var cast = req.body.cast;
  var director = req.body.director;
  db.query("INSERT INTO dawg.movie (name, date, trailer, description, url, Rating, genre, producer, cast, director) VALUES (?,?,?,?,?,?,?,?,?,?)", [name, date, trailer, description, url, Rating, genre, producer, cast, director]);
});
app.listen(3003, function () {
  console.log("running");
});