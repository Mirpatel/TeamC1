
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const axios = require('axios');
const bcrypt = require('bcrypt');
const { constructFromObject } = require('sib-api-v3-sdk/src/ApiClient');



app.use((req, res, next) => {
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


const db = mysql.createConnection({
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

app.post("/profile-edit", (req, res) => {
const newFirstName = req.body.newFirstName;
const newLastName = req.body.newLastName; // Use the hashed password
const newStreetAddress = req.body.newStreetAddress;
const newCity = req.body.newCity;
const newState = req.body.newState;
const newZipCode = req.body.newZipCode;
const email = req.body.email;
db.query(
  "UPDATE dawg.user SET street = ?, city = ?, adressState = ?, zipCode = ?, fname = ?, lname = ? WHERE email = ?",
    //"INSERT into user WHERE email = ? ( street, city, adressState, zipCode,  fname, lname, email, phone, Password) VALUES (?,?,?,?,?, ?, ?, ?, ?)",
  [ newStreetAddress, newCity, newState, newZipCode, newFirstName,newLastName, email]


    , (error, results) => {
      if (error) {
        console.error(error);
      } else {
        console.log('User profile updated successfully!');
      }
    
    });

});
//
app.post("/", async (req, res) =>{

  console.log(req.body);
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const phone = req.body.phone;
  const street = req.body.street;
  const city = req.body.city;
  const addressState = req.body.addressState;
  const zipCode = req.body.zipCode;
  const promoBool = req.body.promo;
  console.log(promoBool);
  let promo = 0;
  if (promoBool === true) {
      promo = 1;
  }

  const saltRounds = 10;
  const Password = req.body.Password;
  
  bcrypt.hash(Password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).send("An error occurred while processing your request.");
    }
    db.query(
      "INSERT INTO dawg.user (street, city, adressState, zipCode, fname, lname, email, phone, password, promo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [street, city, addressState, zipCode, fname, lname, email, phone, hash, promo],
      (error, data) => {
          if (error) {
              console.log(error);
          } else {
              axios.post('http://localhost:8080/send-verify-email', {
                  email: email,
                  fname: fname
              }).then((response) => {
                  // res.send(fname);
              });
          }
      }
  );
    // use the hashed password (hash) in your database query or other code here
  });
 


});

app.post("/getMovies", (req, res) => {
console.log("called get movies");

  db.query(
    "SELECT * FROM dawg.movie",
  
       (error, results) => {
        if (error) {
          console.error(error);
        } else {
          console.log("something");
          // console.log(results);
          res.send(results);
          console.log('movies fetched!');
        }
      
      });
  
  });

  app.post("/get-movie-times", (req, res) => {
    const id = req.body.mId;
    console.log("called get movies");
    
      db.query(
        "SELECT sid,time,date FROM dawg.showtable WHERE mid_fk = ?",
        [id],
      
           (error, results) => {
            if (error) {
              console.error(error);
            } else {
            
              console.log(results);
              res.send(results);
              console.log('times fetched!');
            }
          
          });
      
      });

      app.post("/isAdmin", (req, res) => {
        const email = req.body.email;
        console.log("called isAdmin");
        
          db.query(
            "SELECT role FROM dawg.user WHERE email = ?",
            [email],
          
               (error, results) => {
                if (error) {
                  console.error(error);
                } else {
                
                  console.log(results);
                  res.send(results);
                
                }
              
              });
          
          });

          app.post("/user-get-times", (req, res) => {
            const id = req.body.mid_fk;
            const date = req.body.date;
            console.log(req.body);
            console.log("called get times for user");
            
              db.query(
                "SELECT time FROM dawg.showtable WHERE mid_fk = ? AND date = ?",
                [id, date],
              
                   (error, results) => {
                    if (error) {
                      console.error(error);
                    } else {
                    
                      console.log(results);
                      res.send(results);
                    
                    }
                  
                  });
              
              });


              app.post("/movies-coming-soon", (req, res) => {
                var today = new Date().toISOString().split('T')[0];
                
                console.log(req.body);
                console.log("called get times for user");
                
                  db.query(
                    "SELECT * FROM dawg.movie WHERE date > ?",
                    [today],
                  
                       (error, results) => {
                        if (error) {
                          console.error(error);
                        } else {
                        
                          console.log(results);
                          res.send(results);
                        
                        }
                      
                      });
                  
                  });

                  app.post("/movies-now-playing", (req, res) => {
                    var today = new Date().toISOString().split('T')[0];
                
                    console.log(req.body);
                    console.log("called get times for user");
                    
                      db.query(
                        "SELECT * FROM dawg.movie WHERE date <= ?",
                        [today],
                      
                           (error, results) => {
                            if (error) {
                              console.error(error);
                            } else {
                            
                              console.log(results);
                              res.send(results);
                            
                            }
                          
                          });
                      
                      });

      app.post("/delete-showtime", (req, res) => {
        const id = req.body.timeId;
        console.log("called delete showtime");
        
          db.query(
            "DELETE FROM dawg.showtable WHERE sid = ?",
            [id],
          
               (error, results) => {
                if (error) {
                  console.error(error);
                } else {
                
                  console.log(results);
                  res.send(results);
                 
                }
              
              });
          
          });

          app.post("/add-showtime", (req, res) => {
            const id = req.body.mId;
            const time = req.body.time;
            const date = req.body.date;
            console.log("called add showtime");
            db.query(
              "INSERT INTO dawg.showtable ( mid_fk, roomid_fk, theatreid, date, time) VALUES (?,?,?,?,?)",
              [ id, 1, 1, date, time], (error, data) =>  {
              
                if (error) {
                  console.log(error);
                } else {
                  console.log(data);
                  // res.send(fname);
                }
              }
              
              
              
              );
              
              });




              
app.get("/api/user",(req, res)=> {
  db.query("select * from dawg.user WHERE isVerified = 1", (err,rows)=> {
      if(!err) {
          res.send(rows);
      } else{
          console.log(err);
      }
  } );
  
  });

  // suspend api
  app.post('/suspend', (req, res) => {
    const Id = req.body.Id;
    const suspend = req.body.suspend;
  console.log(req.body);
    db.query(
      'UPDATE dawg.user SET suspend = ? WHERE id = ?',
      [suspend, Id],
      (error, results) => {
        if (error) {
          throw error;
        }
      
      else {
        console.log(results);
        res.send('User suspended successfully');
      }
    }
    );
  });

  app.post('/unsuspend', (req, res) => {
    const Id = req.body.Id;
    const unsuspend = req.body.unsuspend;
  
    db.query(
      'UPDATE  dawg.user SET suspend = ?',
      [unsuspend, Id],
      (error, results, fields) => {
        if (error) throw error;
        res.send('User suspended successfully');
      }
    );
  });

              app.post("/showtime-exists", (req, res) => {
                const id = req.body.mId;
                const time = req.body.time;
                const date = req.body.date;
                console.log("called showtime exists");
                console.log(req.body);
                db.query(
                  "SELECT * FROM dawg.showtable WHERE date = ? AND time = ?",
                  [date, time], (error, data) =>  {
                  
                    if (error) {
                      console.log(error);
                    } else {
                 
                     
                      if (data.length === 0) {
                        console.log("nothing here");
                        res.send("false");
                      }
                      else {
                        res.send("true");
                      }
                  
                    }
                  }
                  
                  
                  
                  );
                  
                  });

              app.post('/movie-filter-genre', (req, res) => {
                // Retrieve the filter parameters from the query string
                const genre = req.body.genre;
       
           console.log("genre " + genre);
                // Build the SQL query based on the provided filters
      
                // Execute the SQL query and return the results as a JSON response
                db.query('SELECT * FROM dawg.movie WHERE genre = ?',[genre] ,
                (error, results) => {
                  if (error) {
                    // Handle any errors that occur during the query execution
                    console.error(error);
                    res.status(500).send('Internal server error');
                    return;
                  }
              
                  // If no movies were found, return a custom error message
                  if (results.length === 0) {
                    res.status(404).send('No movies found.');
                    return;
                  }
                  
                  // Return the filtered results as a JSON response
                  res.json(results);
                });
              });

              app.post('/movie-filter-title', (req, res) => {
                // Retrieve the filter parameters from the query string
                const title = req.body.title;
       
       
                // Build the SQL query based on the provided filters
      
                // Execute the SQL query and return the results as a JSON response
                db.query('SELECT * FROM dawg.movie WHERE Name = ?',[title] ,
                (error, results) => {
                  if (error) {
                    // Handle any errors that occur during the query execution
                    console.error(error);
                    res.status(500).send('Internal server error');
                    return;
                  }
              
                  // If no movies were found, return a custom error message
                  if (results.length === 0) {
                    res.status(404).send('No movies found.');
                    return;
                  }
                  
                  // Return the filtered results as a JSON response
                  res.json(results);
                });
              });



app.listen(3001, () => {
console.log("running on 3001");

});


