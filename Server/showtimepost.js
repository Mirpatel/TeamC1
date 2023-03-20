/*const express = require('express');
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
const showdb = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    databse: 'show'
});
app.get('/', (req, res) => {
    db.query('SELECT id, Name FROM movie', (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('Server error');
      } else {
        res.json({ data: results });
      }
    });
  });
  
  app.post("/", (req, res) => {
    console.log(req.body);
    const showtimes = req.body.showtimes;
    const selectedMovieId = req.body.selectedMovieId;
  
    showdb.query(
      "INSERT INTO showtable (showtime, movie_id) VALUES (?, ?)",
      [showtimes, selectedMovieId],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).send("Server error");
        } else {
          res.json({ data: results });
        }
      }
    );
  });
  


app.listen(4500, () => {
    console.log("running");
    });
     */
    const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const movieDb = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'movierating'
});

const showDb = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'show'
});

app.get('/', (req, res) => {
  movieDb.query('SELECT id, Name FROM movie', (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Server error');
    } else {
      res.json({ data: results });
    }
  });
});

app.post("/", (req, res) => {
  console.log(req.body);
  const time = req.body.time;
  const selectedMovieId = req.body.selectedMovieId;

  showDb.query(
    "INSERT INTO date (time, mid) VALUES (?, ?)",
    [time, selectedMovieId],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("Server error");
      } else {
        res.json({ data: results });
      }
    }
  );
});

movieDb.connect((err) => {
  if (err) throw err;
  console.log('Connected to movie database!');
});

showDb.connect((err) => {
  if (err) throw err;
  console.log('Connected to show database!');
});

app.listen(4500, () => {
  console.log("running");
});
