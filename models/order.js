'use strict';
var mongoose = require('mongoose');
//var relationship = require("mongoose-relationship"); //Refer https://www.npmjs.com/package/mongoose-relationship
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var OrderSchema = new Schema({
	orderItems: [{type: Schema.ObjectId, ref: "OrderItem"}],
	time: { type: Date, default: Date.now },
	price: {type: Number},
	comments: {type:String},
	user: {type:Schema.ObjectId,ref:"User"},
	//table: {type:Schema.ObjectId,ref:"Table"},
	state: {type:String},
	notes: {type:String},
	table: {type:String}
});
OrderSchema.plugin(autoIncrement.plugin, { model: 'Order', field: 'orderAutoId' });

var Order = mongoose.model("Order", OrderSchema);


exports.Order = Order;
