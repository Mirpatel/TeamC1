
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


if (!fname || !lname || !email || !phone || !Password) {
    return res.status(400).send("All fields are required.");
}

if (!/^[a-zA-Z ]+$/.test(fname) || !/^[a-zA-Z ]+$/.test(lname)) {
    return res.status(400).send("First name and last name should only contain letters and spaces.");
}

if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).send("Invalid email format.");
}
if (!/^\d{10}$/.test(phone)) {
    return res.status(400).send("Phone number should contain 10 digits.");
}
if (!/^\d{10}$/.test(Password)) {
    return res.status(400).send("Password  should be a length of 10.");
}


db.query(
"INSERT INTO user (fname, lname, email, phone, Password) VALUES (?,?,?,?,?)",
[fname,lname, email, phone, Password]



);


});



app.listen(3004, () => {
console.log("running");
});
 