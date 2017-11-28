var jwt = require("jsonwebtoken");
var Admin = require( "../models/admin").Admin;

module.exports =  (req, res, next) => {
  const header = req.headers.authorization;
  let token;

  if (header) token = header.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ errors: { global: "Invalid token" } });
      } else {
        Admin.findOne({ username: decoded.username }).then(user => {
          req.currentAdmin = user;
          next();
        });
      }
    });
  } else {
    res.status(401).json({ errors: { global: "No token" } });
  }
};