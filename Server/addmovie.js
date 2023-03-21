
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({

    user: 'root',
    host: 'localhost',
    password: '',
    database: 'movierating'
    
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


db.query(
"INSERT INTO movie (name, date, trailer, description, url, Rating, genre) VALUES (?,?,?,?,?,?,?)",
[name, date, trailer, description, url, Rating, genre]



);


});



app.listen(3003, () => {
console.log("running");
});
 