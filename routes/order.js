'use strict';
var express = require('express');
var authenticate = require("../middlewares/authenticate");

var OrderController = require('../controllers/order');
var orderRouter = express.Router();

orderRouter.route('/create').post(OrderController.createOrder);
orderRouter.route('/delete/:orderId').post(OrderController.deleteOrder);
orderRouter.route('/get/:orderId').get(OrderController.getOrder);
orderRouter.route('/update/:orderId').post(OrderController.updateOrder);
orderRouter.route('/getOrders').get(authenticate,OrderController.getOrders);

module.exports = orderRouter;

