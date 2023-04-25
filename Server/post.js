
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const axios = require('axios');
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
apiKey.apiKey = '';

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


 app.post('/reset-password/confirm', (req, res) => {
    const password  = req.body.password;
    const  token  = req.body.token;
  console.log(token);
 console.log(req.body);


 db.query(
  "SELECT * FROM dawg.user WHERE token = ?",
[token], (error, data) =>  {

  if (error) {
    console.log(error);
  } else {
const email = data[0].Email;
    console.log("128" + data);
//Date.now()
console.log(Date.now());
    if (data[0].timestamp < Date.now()) {
      res.status(400).send('Password reset link has expired');
    } 
    else {
      
      const saltRounds = 10;
      
      
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
          return res.status(500).send("An error occurred while processing your request.");
        }
        db.query(
          "UPDATE dawg.user SET password = ? WHERE email = ?",
        
          [ hash, email]
        
        
            , (error, results) => {
              if (error) {
                console.error(error);
              } else {
                console.log('User profile updated successfully!');
              }
            
            });
        // use the hashed password (hash) in your database query or other code here
      });

      console.log("line 138" + password);
  
  
    }
 

  }
}
);

    // console.log("line 127 " + user);
 
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
  console.log(timestamp);
  let email = req.body.email;
  //add token and timestamp to database user
  db.query(
    "UPDATE dawg.user SET token = ?, timestamp = ? WHERE email = ?",
      [ token, timestamp, email], (error, fname) =>  {
    
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
    FIRSTNAME: "Dawg Theatre User",
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

  db.query(
    "UPDATE dawg.user SET token = ?, timestamp = ? WHERE email = ?",
      [ token, timestamp, email], (error, fname) =>  {
    
          if (error) {
            console.log(error);
          } else {
            console.log(fname);
          }
        }
    
    
    );
  // Set email parameters
  const sendSmtpEmail = {
    to: [{ email: email }],
    templateId: 3, 
    params: {
      FIRSTNAME: name,
      SMS: 'http://localhost:3000/confirmEmail/?key='+token
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

//verify email confirm
app.post('/verify-email/confirm', (req, res) => {
  const  token  = req.body.token;
console.log(token);
console.log(req.body);


db.query(
"SELECT * FROM dawg.user WHERE token = ?",
[token], (error, data) =>  {

if (error) {
  console.log(error);
} else {
const email = data[0].Email;
  console.log("128" + data);
//Date.now()
  if (data[0].timestamp < Date.now()) {
    res.status(400).send('Verify email link has expired');
  } 
  else {
    
  db.query(
    "UPDATE dawg.user SET isVerified = ? WHERE email = ?",
  
    [ 1, email]
  
  
      , (error, results) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email verified!');
        }
      
      });
    res.send('Email verification successful');
  }


}
}
);

  // console.log("line 127 " + user);

});

app.post('/send-confirmation-booking', (req, res) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  defaultClient.basePath = 'https://api.sendinblue.com/v3';

  // Create an instance of the API class
  let email = req.body.email;
  let noTickets = req.body.noTickets;
  let movie = req.body.movie;
  let dateTime = req.body.dateTime;
  // Set email parameters
  const sendSmtpEmail = {
    to: [{ email: email }],
    templateId: 5, 
    params: {
      FIRSTNAME: noTickets,
      SMS: dateTime,
      LASTNAME: movie //
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
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  defaultClient.basePath = 'https://api.sendinblue.com/v3';

  // Create an instance of the API class
  let email = req.body.email;
  let name = req.body.name;
  let title = req.body.title;
  let text = req.body.text;
  // Set email parameters
  const sendSmtpEmail = {
    to: [{ email: email }],
    templateId: 4, 
    params: {
      FIRSTNAME: name,
      SMS: title,
      LASTNAME: text //
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
//here


app.post("/sendOutPromotion", (req, res) => { 
  let title = req.body.title;
  let text = req.body.text;

    db.query(
      "SELECT * FROM dawg.user WHERE promo = 1",
   (error, fname) =>  {

      if (error) {
        console.log(error);
      } else {
        
        res.send(fname);
        console.log(fname);
        console.log(fname.length);
        for (i = 0; i < fname.length; i++) {
          // console.log(fname[i]);
          let name = fname[i].fname;
          let email = fname[i].Email;
          let data = {
            email: email, name: name, title: title, text:text
          }
            axios.post('http://localhost:8080/send-promotion-email', data).then(response => {
                // handle the response from the external API
                res.json(response.data);
              })
              .catch(error => {
                console.log(error);
                res.status(500).json({ message: 'An error occurred' });
              });
         

        }
      }
    }
    );
  });

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

  app.post("/getPromos", (req, res) => { 

  
      db.query(
        "SELECT * FROM dawg.promotion",
       (error, fname) =>  {
  
        if (error) {
          console.log(error);
        } else {
         
          res.send(fname);
        }
      }
      );
    });

    app.post("/verifyPromo", (req, res) => { 

  const code = req.body.code;
      db.query(
        "SELECT * FROM dawg.promotion WHERE code = ?",[code],
       (error, fname) =>  {
  
        if (error) {
          console.log(error);
        } else {
         
          res.send(fname);
        }
      }
      );
    });

  app.post("/addPromo",  (req, res) => { 
    const name = req.body.title;
    const information = req.body.text;
    const code = req.body.code;
    const percent = req.body.percent;
    console.log(req.body);
  
    db.query(
      "INSERT INTO dawg.promotion ( name, information, code, percent) VALUES (?,?,?,?)",
      [ name, information, code, percent], (error, data) =>  {
      
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          // res.send(fname);
        }
      }
      
      
      
      );
    });

  //
 
// 

app.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.Password;
  const promo = req.body.promo;
let passwordMatch;
  if (!email || !password) {
      return res.status(400).send("Email and password are required.");
  }
  
  db.query(
    "SELECT * FROM dawg.user WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("An error occurred while processing your request.");
      }


      if (result.length === 0) {
        return res.status(401).send("Invalid email or password.");
      }

      const user = result[0];
      console.log(password);
      console.log(user.Password);
      bcrypt.compare(password, user.Password, (err, resp) => {
        if (err) {
          console.log(err);
          console.log("An error occurred while processing your request.");
        }
        else {
          passwordMatch = resp;
          console.log("compare " + resp);



          if (!passwordMatch) {
            console.log(passwordMatch);
            return res.status(401).send("Invalid email or password.");
          }
          
             if (result[0].suspend === 1) {
         return res.status(401).send("Your account has been suspended.");
         

        }
    
          const expiresIn = promo ? 2592000 : 86400;
          const token = jwt.sign({ id: email }, config.secret, { expiresIn: expiresIn });
    
          if (user.role === 'admin') {
            return res.send({
              redirectTo: '/admin',
              accessToken: token
            });
          } else {
            return res.send({
              redirectTo: '/',
              accessToken: token
            });
          }


        }


      });


    }
  );
});
  
/*


app.post("/suspend", (req, res) => { 
  let title = req.body.title;
  let text = req.body.text;

    db.query(
      "SELECT * FROM dawg.user WHERE promo = 1",
   (error, fname) =>  {

      if (error) {
        console.log(error);
      } else {
        
        res.send(fname);
        console.log(fname);
        console.log(fname.length);
        for (i = 0; i < fname.length; i++) {
          // console.log(fname[i]);
          let name = fname[i].fname;
          let email = fname[i].Email;
          let data = {
            email: email, name: name, title: title, text:text
          }
            axios.post('http://localhost:8080/send-promotion-email', data).then(response => {
                // handle the response from the external API
                res.json(response.data);
              })
              .catch(error => {
                console.log(error);
                res.status(500).json({ message: 'An error occurred' });
              });
         

        }
      }
    }
    );
  });



*/

app.listen(8080, () => {
console.log("running on 8080");
});