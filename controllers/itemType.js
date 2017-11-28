'use strict';

var ItemType = require('..//models/itemType').ItemType;


const createItemType = async (req, res) =>{
    
    var itemType = new ItemType();
    
    itemType.name= req.body.itemType.name;
    itemType.description = req.body.itemType.description;
    itemType.sortOrder = parseInt(req.body.itemType.sortOrder,10);
    
    try{
        let itemTypeSaved = await itemType.save(); 
        
        res.json(itemTypeSaved);
    }catch(e){
        console.log("error in save itemType and user");
        console.log(e);
    }
    
};
const updateItemType = async (req, res) =>{
    try{
        let itemTypeNew = await ItemType.findById(req.params.itemTypeId);
        let {itemType} = req.body;
        console.log("update item type");
        console.log(itemType);
        Object.keys(itemType).forEach((key)=>{
        itemTypeNew[key] = itemType[key];
      });
        
        let itemTypeSaved = await itemTypeNew.save();    
        res.json(itemTypeSaved);
    }catch(e){
        console.log("error in save itemType and user");
        console.log(e);
    }
        
    
};
function getItemTypes(req,res){
    
     ItemType.find({}, null, {sort: {sortOrder: 1}}).then(function(itemTypeList) {
         return res.json(itemTypeList);
     });
}
function deleteItemType(req, res) {
  ItemType.findById(req.params.itemTypeId, function(err,itemType) {
    if (err) {
        console.log(err);
    }
    if(itemType){
        itemType.remove(function(err,removed){
        if(err){
          console.log("line 71");
          console.log(err);
        }
        if(removed){
        
            res.json({"message":"ItemType has been deleted"});    
        }
      });
    }
  });
}
var itemTypeController = {
  createItemType: createItemType,
  deleteItemType: deleteItemType,
  getItemTypes: getItemTypes,
  updateItemType: updateItemType
};

module.exports = itemTypeController;
