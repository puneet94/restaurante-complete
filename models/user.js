'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
var jwt = require("jsonwebtoken");
require('dotenv').config();
var UserSchema = new Schema({
	time: { type: Date, default: Date.now },
	userPhone: {type: Number},
	userName: {type:String},
	userEmail: {type:String}
});

UserSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      userId: this._id
    },
    process.env.JWT_USER_SECRET
  );
};

UserSchema.methods.toAuthJSON = function toAuthJSON() {
  return {
    userId: this._id,
    userToken: this.generateJWT()
  };
};

UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userAutoId' });
var User = mongoose.model("User", UserSchema);
exports.User = User;
