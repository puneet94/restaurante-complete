'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require('dotenv').config();
var AdminSchema = new Schema({
	time: { type: Date, default: Date.now },
	username: {type:String},
	password: {type:String},
	passwordHash: {type:String}
});

AdminSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

AdminSchema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

AdminSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      username: this.username
    },
    process.env.JWT_SECRET
  );
};


AdminSchema.methods.toAuthJSON = function toAuthJSON() {
  return {
    username: this.username,
    token: this.generateJWT()
  };
};

var Admin = mongoose.model("Admin", AdminSchema);
exports.Admin = Admin;
