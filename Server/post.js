
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
app.use(cors());
app.use(express.json());

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
app.post("/", async (req, res) => {
  
  const email = req.body.email;
  const Password = req.body.Password;

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

      const user = result[0];
      
      if (user.role === 'admin') {
        return res.send({ redirectTo: '/admin' });
      } else {
        return res.send({ redirectTo: '/' });
      }
    }
  );
});

  
app.listen(5000, () => {
console.log("running");
});
