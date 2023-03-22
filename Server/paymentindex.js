
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
    database: 'card'
    
});
//

app.delete("/payment/:id", (req, res) => { 
  const id = req.params.id;

  db.query(
    "DELETE FROM payment WHERE id = ?",
    [id], 
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error deleting payment");
      } else {
        console.log("Payment deleted successfully");
        res.status(200).send("Payment deleted successfully");
      }
    }
  );
});

app.post("/payment", (req, res) => { 
    const id = req.body.id;
console.log("mir");
      db.query(
        "SELECT * FROM payment WHERE userId = ?",
      [id], (error, fname) =>  {
  
        if (error) {
          console.log(error);
        } else {
          res.send(fname);
        }
      }
      );
    });
    //
app.post("/",  (req, res) =>{
   // const salt = await bcrypt.genSalt(20);
   // const hashedPassword = await bcrypt.hash(req.body.Password, salt); // Hash the password from the request body
    console.log(req.body);
const number = req.body.number;
const exp_date = req.body.exp_date;

const ccv = req.body.ccv;
const name = req.body.name;
const exp_year = req.body.exp_year;
const userId = req.body.userId;

//const Password = hashedPassword; // Use the hashed password


db.query(
"INSERT INTO payment (number, exp_date, ccv, name, exp_year, userId) VALUES (?,?,?,?,? ,?)",
[number,exp_date, ccv, name, exp_year, userId]



);


});



app.listen(3050, () => {
console.log("running");
});
 