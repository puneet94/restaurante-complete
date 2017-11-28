'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
var ItemTypeSchema = new Schema({
	time: { type: Date, default: Date.now },
	name: {type:String},
	description: {type:String},
	picture: {type:String},
	sortOrder: {type:Number,default: 0}
});


ItemTypeSchema.plugin(autoIncrement.plugin, { model: 'ItemType', field: 'itemTypeAutoId' });

var ItemType = mongoose.model("ItemType", ItemTypeSchema);
exports.ItemType = ItemType;
