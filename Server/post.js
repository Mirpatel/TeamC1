const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
var jwt = require("jsonwebtoken");
const config = require("./config/auth.config");
app.use((req, res, next) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    console.log("got here");
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});
app.use(cors());
app.use(express.json());

require('./user.routes')(app);
const db = mysql.createConnection({

    user: 'root',
    host: 'localhost',
    password: '',
    database: 'group'
    
});
/*
app.post("/", (req, res) =>{
 console.log(req.body);
const email = req.body.email

const Password = req.body.Password;


db.query(

"SELECT * FROM user WHERE email = ?;",
[ email, Password],
(err, result) => {
    if (err) {
        res.send({err: err})
    } 

    if(result.length > 0){

        res.send(result);
    } else {
        res.send({message: "Wrong Combination"});
    }
}
);


});

*/

app.post("/", (req, res) => {
    const email = req.body.email;
    const Password = req.body.Password;
    const promo = req.body.Promo;
    //putting this here to test token

    //gonna take away soon



    if (!email || !Password) {
      return res.status(400).send("Email and password are required.");
    }
  
    db.query(
      "SELECT * FROM user WHERE email = ? AND password = ?",
      [email, Password],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("An error occurred while processing your request.");
        }
  
        if (result.length === 0) {
          return res.status(401).send("Invalid email or password.");
        }

        if (promo) {
        var token = jwt.sign({ id: email }, config.secret, {
          expiresIn:  2592000 // 30 days
          
        });
      }
      else {
        var token = jwt.sign({ id: email }, config.secret, {
          expiresIn: 86400 // 24 hours
      });
    }
        console.log("assigned token");
        console.log(token);
        // If we reach here, it means that the email and password are valid
        // You can redirect the user to the home page or return a success message
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        res.send("Login successful.", {
          accessToken: token
        });
      }
    );


  });
  
app.listen(8080, () => {
console.log("running on 8080");
});
 