
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const axios = require('axios');
const bcrypt = require('bcrypt');



app.use((req, res, next) => {
    try {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      console.log("got here 2");
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
    const salt = await bcrypt.genSalt(1);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt); // Hash the password from the request body
    console.log(req.body);
const fname = req.body.fname;
const lname = req.body.lname;

const email = req.body.email;
const phone = req.body.phone;
//const Password = req.body.Password;
const Password = hashedPassword; // Use the hashed password
const street = req.body.street;
const city = req.body.city;
const adressState = req.body.adressState;
const zipCode = req.body.zipCode;
const promoBool = req.body.promo;
console.log(promoBool);
let promo = 0;
if (promoBool === true) {
  promo = 1;
}

db.query(
"INSERT INTO  dawg.user ( street, city, adressState, zipCode,  fname, lname, email, phone, Password, promo) VALUES (?,?,?,?,?, ?, ?, ?, ?, ?)",
[ street, city, adressState, zipCode, fname,lname, email, phone, Password, promo], (error, data) =>  {

  if (error) {
    console.log(error);
  } else {
    axios.post('http://localhost:8080/send-verify-email',{
      email: email, fname: fname}).then((response) => {
   


      });
    // res.send(fname);
  }
}



);


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
          console.log(results);
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

app.listen(3001, () => {
console.log("running on 3001");

});
 