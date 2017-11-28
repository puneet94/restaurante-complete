'use strict';
var express = require('express');

var ItemTypeController = require('../controllers/itemType');
var itemTypeRouter = express.Router();
var authenticate = require("../middlewares/authenticate");
itemTypeRouter.route('/create').post(authenticate,ItemTypeController.createItemType);
itemTypeRouter.route('/delete/:itemTypeId').post(authenticate,ItemTypeController.deleteItemType);
itemTypeRouter.route('/update/:itemTypeId').post(authenticate,ItemTypeController.updateItemType);
itemTypeRouter.route('/getItemTypes').get(ItemTypeController.getItemTypes);

module.exports = itemTypeRouter;

