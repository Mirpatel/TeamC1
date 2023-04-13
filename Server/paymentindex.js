
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'dawgtheater123',
  port: '8001'
});
//

app.delete("/delete/:id", (req, res) => { 
  const id = req.params.id;
console.log(id);
  db.query(
    "DELETE FROM dawg.payment WHERE id = ?",
    [id], 
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error deleting payment");
      } else {
        console.log("Payment deleted successfully");
        console.log(result);
        // res.status(200).send("Payment deleted successfully");
      }
    }
  );
});

app.post("/payment", (req, res) => { 
    const id = req.body.id;
console.log("mir");
      db.query(
        "SELECT * FROM dawg.payment WHERE userId = ?",
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
    app.post("/", async (req, res) => {
      console.log()
      const number = req.body.number;
      const exp_date = req.body.exp_date;
      const ccv = req.body.ccv;
      const name = req.body.name;
      const exp_year = req.body.exp_year;
      const userId = req.body.userId;
    
      // Extract the last four digits of the card number
      const lastFour = number.slice(-4);
    
      // Encrypt the whole card number
      const salt = await bcrypt.genSalt(10);
      const encryptedNumber = await bcrypt.hash(number, salt);
    
      // Insert the encrypted card number and other details into the payment table
      db.query(
        "INSERT INTO dawg.payment (number, exp_date, ccv, name, exp_year, userId, lastFour) VALUES (?,?,?,?,?,?,?)",
        [encryptedNumber, exp_date, ccv, name, exp_year, userId, lastFour],
        (error, results) => {
          if (error) {
           console.log(error);
          }
          else {
            console.log(results);
          res.send("Payment processed successfully!");
          }
        }
      );
    });



app.listen(3050, () => {
console.log("running");
});
 