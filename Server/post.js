
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const bcrypt = require('bcrypt');

var jwt = require("jsonwebtoken");
const config = require("./config/auth.config");
const fetch = require('node-fetch');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const { PostContactInfo } = require('sib-api-v3-sdk');
const { response } = require('express');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
const crypto = require('crypto');
apiKey.apiKey = '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';

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
     // Create a new MySQL connection using the SSH tunnel
     const db = mysql.createConnection({
      host: 'localhost',
      user: 'admin',
      password: 'dawgtheater123',
      port: '8001'
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

 function getUserFromDatabase(token) {
    // Retrieve the user's email address and timestamp from your database using the token
    // I don't know how to retrieve the user's email and timestamp from the database. Help Gigi / Mir!!!
    // Return an object with the email and timestamp values
    console.log(token);
    db.query(
      "SELECT * FROM dawg.user WHERE token = ?",
    [token], (error, data) =>  {

      if (error) {
        console.log(error);
      } else {
        console.log(data);
        console.log(data.email);
        // res.send(fname);
      }
    }
    );
    const email = data.email;
    const timestamp = data.timestamp;
    //query here to get user email and timestamp with token
    return {
      email: email,
      timestamp: timestamp // 
    };
  }
  
  function updateUserPasswordInDatabase(email, password) {
    // Update the user's password in your database. I don't know how to do this, help  Gigi / Mir!!!
    const hashedPassword = bcrypt.hash(req.body.Password, salt); 
    db.query(
      "UPDATE dawg.user SET password = ? WHERE email = ?",
    
      [ hashedPassword, email]
    
    
        , (error, results) => {
          if (error) {
            console.error(error);
          } else {
            console.log('User profile updated successfully!');
          }
        
        });
    //query database to use update function using email to get user.
  }

 app.post('/reset-password/confirm', (req, res) => {
    const { password } = req.body.password;
    const  token  = req.body.token;
  console.log(token);
 console.log(req.body);
    // Retrieve the user's email address and timestamp from your database using the token


    const user = getUserFromDatabase(token);
    const { email, timestamp } = user;
    console.log(user);
    if (timestamp < Date.now()) {
      res.status(400).send('Password reset link has expired');
    } else {
      // Update the user's password in your database
      updateUserPasswordInDatabase(email, password);
      res.send('Password reset successful');
    }
  });

app.post('/send-profile-email', (req, res) => {

  defaultClient.basePath = 'https://api.sendinblue.com/v3';

// Create an instance of the API class
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let email = req.body.email;
let name = req.body.name;
// Set email parameters
const sendSmtpEmail = {
  to: [{ email: email }],
  templateId: 1, 
  params: {
    FIRSTNAME: name, //
  },
};

// Send email
apiInstance.sendTransacEmail(sendSmtpEmail)
  .then((data) => {
    console.log('API called successfully. Returned data: ', data);
  })
  .catch((error) => {
    console.error(error);
  });


});

app.post('/send-password-reset-email', (req, res) => {
defaultClient.basePath = 'https://api.sendinblue.com/v3';
  const token = crypto.randomBytes(20).toString('hex');
  const timestamp = Date.now() + 3600000; // 1 hour from now
  let email = req.body.email;
  //add token and timestamp to database user
  db.query(
    "UPDATE dawg.user SET token = ? WHERE email = ?",
      [ token, email], (error, fname) =>  {
    
          if (error) {
            console.log(error);
          } else {
            console.log(fname);
          }
        }
    
    
    );

// Create an instance of the API class
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let name = req.body.name;
// Set email parameters
const sendSmtpEmail = {
  to: [{ email: email }],
  templateId: 2, 
  params: {
    FIRSTNAME: name,
    SMS: 'http://localhost:3000/password-reset/?key='+token //
  },
};

// Send email
apiInstance.sendTransacEmail(sendSmtpEmail)
  .then((data) => {
    console.log('API called successfully. Returned data: ', data);
  })
  .catch((error) => {
    console.error(error);
  });


});

app.post('/send-verify-email', (req, res) => {
  defaultClient.basePath = 'https://api.sendinblue.com/v3';
    const token = crypto.randomBytes(20).toString('hex');
  const timestamp = Date.now() + 3600000; // 1 hour from now
  // Create an instance of the API class
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  let email = req.body.email;
  let name = req.body.name;
  // Set email parameters
  const sendSmtpEmail = {
    to: [{ email: email }],
    templateId: 3, 
    params: {
      FIRSTNAME: name,
      SMS: 'http://localhost:3000/reset-password/${token}' //
    },
  };
  
  // Send email
  apiInstance.sendTransacEmail(sendSmtpEmail)
    .then((data) => {
      console.log('API called successfully. Returned data: ', data);
    })
    .catch((error) => {
      console.error(error);
    });
  
  
  });

app.post('/send-promotion-email', (req, res) => {


});
//here
app.post("/profile", (req, res) => { 
  const email = req.body.email;

    db.query(
      "SELECT * FROM dawg.user WHERE email = ?",
    [email], (error, fname) =>  {

      if (error) {
        console.log(error);
      } else {
        console.log(email);
        res.send(fname);
      }
    }
    );
  });

  //
 
// 
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
      "SELECT * FROM dawg.user WHERE email = ? AND password = ?",
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
        const user = result[0];
      console.log(token);
      if (user.role === 'admin') {
        return res.send({ redirectTo: '/admin', accessToken: token
      });

      } else {
        return res.send({ redirectTo: '/',  accessToken: token
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
        });
      }
    );


  });

  
app.listen(8080, () => {
console.log("running on 8080");
});