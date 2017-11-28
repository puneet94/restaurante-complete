'use strict';
var express = require('express');

var userAuthenticate = require("../middlewares/userAuthenticate");
var UserController = require('../controllers/user');
var userRouter = express.Router();

userRouter.route('/create').post(UserController.createUser);
userRouter.route('/get/:userId').get(userAuthenticate,UserController.getUser);
userRouter.route('/update/:userId').post(userAuthenticate,UserController.updateUser);
userRouter.route('/orders/:userId').get(userAuthenticate,UserController.getUserOrders);

module.exports = userRouter;

