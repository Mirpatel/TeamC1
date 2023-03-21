const { verifySignUp } = require("./middlewares");


module.exports = function(app) {
  app.use(function(req, res, next) {
    console.log(req.body);
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



};