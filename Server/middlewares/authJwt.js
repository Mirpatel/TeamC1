const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log("verify TOKEN");

  if (!token) {
    console.log("no token");
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.email = decoded.id;
    res.send({email: req.email});
    // next();
  });
  console.log("issue here");
 
};



const authJwt = {
    verifyToken,
  };
  module.exports = authJwt;