'use strict';
var mongoose = require('mongoose');
//var relationship = require("mongoose-relationship"); //Refer https://www.npmjs.com/package/mongoose-relationship
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var TableSchema = new Schema({
	order: {type: Schema.ObjectId, ref: "Order"},
	user: {type: Schema.ObjectId, ref: "User"},
	time: { type: Date, default: Date.now },
	name: {type:String},
	state: {type:String}
	
});
TableSchema.plugin(autoIncrement.plugin, { model: 'Table', field: 'tableAutoId' });

var Table = mongoose.model("Table", TableSchema);


exports.Table = Table;
