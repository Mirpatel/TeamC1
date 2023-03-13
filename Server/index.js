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
const name = req.body.name;
const email = req.body.email;
const phone = req.body.phone;
const Password = req.body.Password;


db.query(
"INSERT INTO user(name, email, phone, Password) VALUES (?,?,?,?)",
[name, email, phone, Password]



);


});



app.listen(3002, () => {
console.log("running");
});
 