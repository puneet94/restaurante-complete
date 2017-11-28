'use strict';
var mongoose = require('mongoose');



var relationship = require("mongoose-relationship"); //Refer https://www.npmjs.com/package/mongoose-relationship
var Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
var OrderItemSchema = new Schema({
	time: { type: Date, default: Date.now },
	order: { type: Schema.ObjectId, ref: "Order", childPath: "orderItems"},
	price: {type: Number},
	totalPrice: {type: Number},
	quantity: {type:Number},
	item: {type:Schema.ObjectId,ref:"Item"}
});


OrderItemSchema.plugin(relationship, { relationshipPathName: 'order' });
OrderItemSchema.plugin(autoIncrement.plugin, { model: 'OrderItem', field: 'orderItemAutoId' });

var OrderItem = mongoose.model("OrderItem", OrderItemSchema);
exports.OrderItem = OrderItem;
