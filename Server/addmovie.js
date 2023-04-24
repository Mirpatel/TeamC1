
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'dawgtheater123',
    port: '8001'
  });

app.post("/", (req, res) =>{
    console.log(req.body);


const name = req.body.name;
const date = req.body.date;
const trailer = req.body.trailer;
const description = req.body.description;
const Rating  = req.body.Rating;
const url  = req.body.url;
const genre  = req.body.genre;
const producer = req.body.producer;
const cast = req.body.cast;
const director = req.body.director;
const movieRating = req.body.movierating;



db.query(
"INSERT INTO dawg.movie (name, Date, trailer, description, url, Rating, genre, producer, cast, director, movierating) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
[name, date, trailer, description, url, Rating, genre, producer, cast, director, movieRating]



);


});



app.listen(3003, () => {
console.log("running");
});
 