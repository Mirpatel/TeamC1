"use strict";

var express = require('express');

var app = express();

var mysql = require('mysql');

var cors = require('cors');

var axios = require('axios');

var bcrypt = require('bcrypt');

var jwt = require("jsonwebtoken");

var config = require("./config/auth.config");

var fetch = require('node-fetch');

var SibApiV3Sdk = require('sib-api-v3-sdk');

var _require = require('sib-api-v3-sdk'),
    PostContactInfo = _require.PostContactInfo;

var _require2 = require('express'),
    response = _require2.response;

var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];

var crypto = require('crypto');

apiKey.apiKey = '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';
app.use(function (req, res, next) {
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

require('./user.routes')(app); // Create a new MySQL connection using the SSH tunnel


var db = mysql.createConnection({
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

app.post('/reset-password/confirm', function (req, res) {
  var password = req.body.password;
  var token = req.body.token;
  console.log(token);
  console.log(req.body);
  db.query("SELECT * FROM dawg.user WHERE token = ?", [token], function (error, data) {
    if (error) {
      console.log(error);
    } else {
      var email = data[0].Email;
      console.log("128" + data); //Date.now()

      console.log(Date.now());

      if (data[0].timestamp < Date.now()) {
        res.status(400).send('Password reset link has expired');
      } else {
        // Update the user's password in your database
        // const hashedPassword = bcrypt.hash(password, salt); 
        console.log("line 138" + password);
        var hashedPassword = password;
        db.query("UPDATE dawg.user SET password = ? WHERE email = ?", [hashedPassword, email], function (error, results) {
          if (error) {
            console.error(error);
          } else {
            console.log('User profile updated successfully!');
          }
        });
        res.send('Password reset successful');
      }
    }
  }); // console.log("line 127 " + user);
});
app.post('/send-profile-email', function (req, res) {
  defaultClient.basePath = 'https://api.sendinblue.com/v3'; // Create an instance of the API class

  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  var email = req.body.email;
  var name = req.body.name; // Set email parameters

  var sendSmtpEmail = {
    to: [{
      email: email
    }],
    templateId: 1,
    params: {
      FIRSTNAME: name //

    }
  }; // Send email

  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('API called successfully. Returned data: ', data);
  })["catch"](function (error) {
    console.error(error);
  });
});
app.post('/send-password-reset-email', function (req, res) {
  defaultClient.basePath = 'https://api.sendinblue.com/v3';
  var token = crypto.randomBytes(20).toString('hex');
  var timestamp = Date.now() + 3600000; // 1 hour from now

  console.log(timestamp);
  var email = req.body.email; //add token and timestamp to database user

  db.query("UPDATE dawg.user SET token = ?, timestamp = ? WHERE email = ?", [token, timestamp, email], function (error, fname) {
    if (error) {
      console.log(error);
    } else {
      console.log(fname);
    }
  }); // Create an instance of the API class

  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  var name = req.body.name; // Set email parameters

  var sendSmtpEmail = {
    to: [{
      email: email
    }],
    templateId: 2,
    params: {
      FIRSTNAME: name,
      SMS: 'http://localhost:3000/password-reset/?key=' + token //

    }
  }; // Send email

  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('API called successfully. Returned data: ', data);
  })["catch"](function (error) {
    console.error(error);
  });
});
app.post('/send-verify-email', function (req, res) {
  defaultClient.basePath = 'https://api.sendinblue.com/v3';
  var token = crypto.randomBytes(20).toString('hex');
  var timestamp = Date.now() + 3600000; // 1 hour from now
  // Create an instance of the API class

  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  var email = req.body.email;
  var name = req.body.name;
  db.query("UPDATE dawg.user SET token = ?, timestamp = ? WHERE email = ?", [token, timestamp, email], function (error, fname) {
    if (error) {
      console.log(error);
    } else {
      console.log(fname);
    }
  }); // Set email parameters

  var sendSmtpEmail = {
    to: [{
      email: email
    }],
    templateId: 3,
    params: {
      FIRSTNAME: name,
      SMS: 'http://localhost:3000/confirmEmail/?key=' + token
    }
  }; // Send email

  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('API called successfully. Returned data: ', data);
  })["catch"](function (error) {
    console.error(error);
  });
}); //verify email confirm

app.post('/verify-email/confirm', function (req, res) {
  var token = req.body.token;
  console.log(token);
  console.log(req.body);
  db.query("SELECT * FROM dawg.user WHERE token = ?", [token], function (error, data) {
    if (error) {
      console.log(error);
    } else {
      var email = data[0].Email;
      console.log("128" + data); //Date.now()

      if (data[0].timestamp < Date.now()) {
        res.status(400).send('Verify email link has expired');
      } else {
        db.query("UPDATE dawg.user SET isVerified = ? WHERE email = ?", [1, email], function (error, results) {
          if (error) {
            console.error(error);
          } else {
            console.log('Email verified!');
          }
        });
        res.send('Email verification successful');
      }
    }
  }); // console.log("line 127 " + user);
});
app.post('/send-promotion-email', function (req, res) {
  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  defaultClient.basePath = 'https://api.sendinblue.com/v3'; // Create an instance of the API class

  var email = req.body.email;
  var name = req.body.name;
  var title = req.body.title;
  var text = req.body.text; // Set email parameters

  var sendSmtpEmail = {
    to: [{
      email: email
    }],
    templateId: 4,
    params: {
      FIRSTNAME: name,
      SMS: title,
      LASTNAME: text //

    }
  }; // Send email

  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('API called successfully. Returned data: ', data);
  })["catch"](function (error) {
    console.error(error);
  });
}); //here

app.post("/sendOutPromotion", function (req, res) {
  var title = req.body.title;
  var text = req.body.text;
  db.query("SELECT * FROM dawg.user WHERE promo = 1", function (error, fname) {
    if (error) {
      console.log(error);
    } else {
      res.send(fname);
      console.log(fname);
      console.log(fname.length);

      for (i = 0; i < fname.length; i++) {
        // console.log(fname[i]);
        var name = fname[i].fname;
        var email = fname[i].Email;
        var data = {
          email: email,
          name: name,
          title: title,
          text: text
        };
        axios.post('http://localhost:8080/send-promotion-email', data).then(function (response) {
          // handle the response from the external API
          res.json(response.data);
        })["catch"](function (error) {
          console.log(error);
          res.status(500).json({
            message: 'An error occurred'
          });
        });
      }
    }
  });
});
app.post("/profile", function (req, res) {
  var email = req.body.email;
  db.query("SELECT * FROM dawg.user WHERE email = ?", [email], function (error, fname) {
    if (error) {
      console.log(error);
    } else {
      console.log(email);
      res.send(fname);
    }
  });
});
app.post("/getPromos", function (req, res) {
  db.query("SELECT * FROM dawg.promotion", function (error, fname) {
    if (error) {
      console.log(error);
    } else {
      res.send(fname);
    }
  });
});
app.post("/addPromo", function (req, res) {
  var name = req.body.title;
  var information = req.body.text;
  var code = req.body.code;
  db.query("INSERT INTO dawg.promotion ( name, information, code) VALUES (?,?,?)", [name, information, code], function (error, data) {
    if (error) {
      console.log(error);
    } else {
      console.log(data); // res.send(fname);
    }
  });
}); //
// 

app.post("/", function _callee2(req, res) {
  var email, password, promo, passwordMatch;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = req.body.email;
          password = req.body.Password;
          promo = req.body.promo;

          if (!(!email || !password)) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", res.status(400).send("Email and password are required."));

        case 5:
          db.query("SELECT * FROM dawg.user WHERE email = ?", [email], function _callee(err, result) {
            var user;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!err) {
                      _context.next = 3;
                      break;
                    }

                    console.log(err);
                    return _context.abrupt("return", res.status(500).send("An error occurred while processing your request."));

                  case 3:
                    if (!(result.length === 0)) {
                      _context.next = 5;
                      break;
                    }

                    return _context.abrupt("return", res.status(401).send("Invalid email or password."));

                  case 5:
                    user = result[0];
                    console.log(password);
                    console.log(user.Password);
                    bcrypt.compare(password, user.Password, function (err, resp) {
                      if (err) {
                        console.log(err);
                        console.log("An error occurred while processing your request.");
                      } else {
                        passwordMatch = resp;
                        console.log("compare " + resp);

                        if (!passwordMatch) {
                          console.log(passwordMatch);
                          return res.status(401).send("Invalid email or password.");
                        }

                        var expiresIn = promo ? 2592000 : 86400;
                        var token = jwt.sign({
                          id: email
                        }, config.secret, {
                          expiresIn: expiresIn
                        });

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

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.listen(8080, function () {
  console.log("running on 8080");
});