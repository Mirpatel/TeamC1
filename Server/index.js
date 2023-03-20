
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
    database: 'group'
    
});

app.post("/", (req, res) =>{
    console.log(req.body);
const fname = req.body.fname;
const lname = req.body.lname;

const email = req.body.email;
const phone = req.body.phone;
const Password = req.body.Password;





db.query(
"INSERT INTO user (fname, lname, email, phone, Password) VALUES (?,?,?,?,?)",
[fname,lname, email, phone, Password]



);


});



app.listen(3001, () => {
console.log("running");
});
 