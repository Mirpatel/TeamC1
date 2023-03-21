const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
var jwt = require("jsonwebtoken");
const config = require("./config/auth.config");
const fetch = require('node-fetch');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];



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

app.post('/send-profile-email', (req, res) => {
  // const sgMail = require('@sendgrid/mail')
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  // const msg = {
  //   to: 'jordynfulbright@gmail.com', // Change to your recipient
  //   from: 'dawgTheatre@gmail.com', // Change to your verified sender
  //   subject: 'Profile Information Changed',
  //   text: '',
  //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  // }
  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     console.log('Email sent')
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //   })

  // const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  // sendSmtpEmail.subject = "Profile Information Changed";
  // sendSmtpEmail.htmlContent = "<p>Hello</p>";
  // sendSmtpEmail.sender = {"name":"Sender Name","email":"dawgTheatre@gmail.com"};
  // sendSmtpEmail.to = [{"email":"jordynfulbright@gmail.com"}];
  // sendSmtpEmail.replyTo = {"email":"dawgTheatre@gmail.com"};
  // sendSmtpEmail.headers = {"Some-Custom-Header":"unique-id-1234"};
  // const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  // apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
  //   console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  // }, function(error) {
  //   console.error(error);
  // });
  
  defaultClient.basePath = 'https://api.sendinblue.com/v3';

// Create an instance of the API class
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Set email parameters
const sendSmtpEmail = {
  to: [{ email: 'jordynfulbright@gmail.com' }],
  templateId: 1, 
  params: {
    FIRSTNAME: 'John', //
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

// Create an instance of the API class
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Set email parameters
const sendSmtpEmail = {
  to: [{ email: 'jordynfulbright@gmail.com' }],
  templateId: 2, 
  params: {
    FIRSTNAME: 'John',
    SMS: 'link here' //
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
  
  // Create an instance of the API class
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  
  // Set email parameters
  const sendSmtpEmail = {
    to: [{ email: 'jordynfulbright@gmail.com' }],
    templateId: 3, 
    params: {
      FIRSTNAME: 'John',
      SMS: 'link here' //
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
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: 'jordynfulbright@gmail.com', // Change to your recipient
    from: 'dawgTheatre@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  const msg2 = {
    to: "jordynfulbright@gmail.com", 
    from: "dawgTheatre@gmail.com",
    subject: "Email Subject",
    template_id: "d-7cbd16b9f52447ec8869009e2dcba6ec",
    "personalizations": [{
      "substitutions": {
          "{first_name}": "jordyn",
      }
  }],
  };
  sgMail
    .send(msg2)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })

});



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
 