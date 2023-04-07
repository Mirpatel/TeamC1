"use strict";

var express = require('express');

var app = express();

var mysql = require('mysql');

var cors = require('cors');

var axios = require('axios');

var bcrypt = require('bcrypt');

var _require = require('sib-api-v3-sdk/src/ApiClient'),
    constructFromObject = _require.constructFromObject;

app.use(function (req, res, next) {
  try {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});
app.use(cors());
app.use(express.json());
var db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'dawgtheater123',
  port: '8001'
});
/*
 const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newStreetAddress, setNewStreetAddress] = useState(" ");
    const [newCity, setNewCity] = useState(" ");
    const [newState, setNewState] = useState(" ");
    const [newZipCode, setNewZipCode] = useState(" ");
*/

app.post("/profile-edit", function (req, res) {
  var newFirstName = req.body.newFirstName;
  var newLastName = req.body.newLastName; // Use the hashed password

  var newStreetAddress = req.body.newStreetAddress;
  var newCity = req.body.newCity;
  var newState = req.body.newState;
  var newZipCode = req.body.newZipCode;
  var email = req.body.email;
  db.query("UPDATE dawg.user SET street = ?, city = ?, adressState = ?, zipCode = ?, fname = ?, lname = ? WHERE email = ?", //"INSERT into user WHERE email = ? ( street, city, adressState, zipCode,  fname, lname, email, phone, Password) VALUES (?,?,?,?,?, ?, ?, ?, ?)",
  [newStreetAddress, newCity, newState, newZipCode, newFirstName, newLastName, email], function (error, results) {
    if (error) {
      console.error(error);
    } else {
      console.log('User profile updated successfully!');
    }
  });
}); //

app.post("/", function _callee(req, res) {
  var fname, lname, email, phone, street, city, addressState, zipCode, promoBool, promo, saltRounds, Password;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body);
          fname = req.body.fname;
          lname = req.body.lname;
          email = req.body.email;
          phone = req.body.phone;
          street = req.body.street;
          city = req.body.city;
          addressState = req.body.addressState;
          zipCode = req.body.zipCode;
          promoBool = req.body.promo;
          console.log(promoBool);
          promo = 0;

          if (promoBool === true) {
            promo = 1;
          }

          saltRounds = 10;
          Password = req.body.Password;
          bcrypt.hash(Password, saltRounds, function (err, hash) {
            if (err) {
              console.log(err);
              return res.status(500).send("An error occurred while processing your request.");
            }

            db.query("INSERT INTO dawg.user (street, city, adressState, zipCode, fname, lname, email, phone, password, promo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [street, city, addressState, zipCode, fname, lname, email, phone, hash, promo], function (error, data) {
              if (error) {
                console.log(error);
              } else {
                axios.post('http://localhost:8080/send-verify-email', {
                  email: email,
                  fname: fname
                }).then(function (response) {// res.send(fname);
                });
              }
            }); // use the hashed password (hash) in your database query or other code here
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post("/getMovies", function (req, res) {
  console.log("called get movies");
  db.query("SELECT * FROM dawg.movie", function (error, results) {
    if (error) {
      console.error(error);
    } else {
      console.log("something"); // console.log(results);

      res.send(results);
      console.log('movies fetched!');
    }
  });
});
app.post("/get-movie-times", function (req, res) {
  var id = req.body.mId;
  console.log("called get movies");
  db.query("SELECT sid,time,date FROM dawg.showtable WHERE mid_fk = ?", [id], function (error, results) {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
      res.send(results);
      console.log('times fetched!');
    }
  });
});
app.post("/isAdmin", function (req, res) {
  var email = req.body.email;
  console.log("called isAdmin");
  db.query("SELECT role FROM dawg.user WHERE email = ?", [email], function (error, results) {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
      res.send(results);
    }
  });
});
app.post("/user-get-times", function (req, res) {
  var id = req.body.mid_fk;
  var date = req.body.date;
  console.log(req.body);
  console.log("called get times for user");
  db.query("SELECT time FROM dawg.showtable WHERE mid_fk = ? AND date = ?", [id, date], function (error, results) {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
      res.send(results);
    }
  });
});
app.post("/movies-coming-soon", function (req, res) {
  var today = new Date().toISOString().split('T')[0];
  console.log(req.body);
  console.log("called get times for user");
  db.query("SELECT * FROM dawg.movie WHERE date > ?", [today], function (error, results) {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
      res.send(results);
    }
  });
});
app.post("/movies-now-playing", function (req, res) {
  var today = new Date().toISOString().split('T')[0];
  console.log(req.body);
  console.log("called get times for user");
  db.query("SELECT * FROM dawg.movie WHERE date <= ?", [today], function (error, results) {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
      res.send(results);
    }
  });
});
app.post("/delete-showtime", function (req, res) {
  var id = req.body.timeId;
  console.log("called delete showtime");
  db.query("DELETE FROM dawg.showtable WHERE sid = ?", [id], function (error, results) {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
      res.send(results);
    }
  });
});
app.post("/add-showtime", function (req, res) {
  var id = req.body.mId;
  var time = req.body.time;
  var date = req.body.date;
  console.log("called add showtime");
  db.query("INSERT INTO dawg.showtable ( mid_fk, roomid_fk, theatreid, date, time) VALUES (?,?,?,?,?)", [id, 1, 1, date, time], function (error, data) {
    if (error) {
      console.log(error);
    } else {
      console.log(data); // res.send(fname);
    }
  });
});
app.post("/showtime-exists", function (req, res) {
  var id = req.body.mId;
  var time = req.body.time;
  var date = req.body.date;
  console.log("called showtime exists");
  console.log(req.body);
  db.query("SELECT * FROM dawg.showtable WHERE date = ? AND time = ?", [date, time], function (error, data) {
    if (error) {
      console.log(error);
    } else {
      if (data.length === 0) {
        console.log("nothing here");
        res.send("false");
      } else {
        res.send("true");
      }
    }
  });
});
app.post('/movie-filter-genre', function (req, res) {
  // Retrieve the filter parameters from the query string
  var genre = req.body.genre;
  console.log("genre " + genre); // Build the SQL query based on the provided filters
  // Execute the SQL query and return the results as a JSON response

  db.query('SELECT * FROM dawg.movie WHERE genre = ?', [genre], function (error, results) {
    if (error) {
      // Handle any errors that occur during the query execution
      console.error(error);
      res.status(500).send('Internal server error');
      return;
    } // If no movies were found, return a custom error message


    if (results.length === 0) {
      res.status(404).send('No movies found.');
      return;
    } // Return the filtered results as a JSON response


    res.json(results);
  });
});
app.post('/movie-filter-title', function (req, res) {
  // Retrieve the filter parameters from the query string
  var title = req.body.title; // Build the SQL query based on the provided filters
  // Execute the SQL query and return the results as a JSON response

  db.query('SELECT * FROM dawg.movie WHERE Name = ?', [title], function (error, results) {
    if (error) {
      // Handle any errors that occur during the query execution
      console.error(error);
      res.status(500).send('Internal server error');
      return;
    } // If no movies were found, return a custom error message


    if (results.length === 0) {
      res.status(404).send('No movies found.');
      return;
    } // Return the filtered results as a JSON response


    res.json(results);
  });
});
app.listen(3001, function () {
  console.log("running on 3001");
});