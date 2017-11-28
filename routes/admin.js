'use strict';
var express = require('express');


var AdminController = require('../controllers/admin');
var adminRouter = express.Router();

adminRouter.route('/login').post(AdminController.login);
adminRouter.route('/signup').post(AdminController.signup);

module.exports = adminRouter;

