'use strict';
var mongoose = require('mongoose');



var Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
var ItemSchema = new Schema({
	time: { type: Date, default: Date.now },
	price: {type: Number},
	name: {type:String},
	description: {type:String},
	picture: {type:String},
	currency: {type:String},
	stock: {type: Boolean , default:true},
	category: {type:String},
	itemType: {type: Schema.ObjectId, ref: "ItemType"},
});


ItemSchema.plugin(autoIncrement.plugin, { model: 'Item', field: 'itemAutoId' });

var Item = mongoose.model("Item", ItemSchema);
exports.Item = Item;
