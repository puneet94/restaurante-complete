'use strict';
var express = require('express');


var ItemController = require('../controllers/item');
var itemRouter = express.Router();
var authenticate = require("../middlewares/authenticate");
itemRouter.route('/create').post(authenticate,ItemController.createItem);
itemRouter.route('/delete/:itemId').post(authenticate,ItemController.deleteItem);
itemRouter.route('/update/:itemId').post(authenticate,ItemController.updateItem);
//itemRouter.route('/get/:itemId').get(ItemController.getItem);
itemRouter.route('/getItems').get(ItemController.getItems);
itemRouter.route('/getAdminItems').get(authenticate,ItemController.getAdminItems);

module.exports = itemRouter;

