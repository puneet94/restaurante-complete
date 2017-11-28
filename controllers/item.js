'use strict';

var Item = require('..//models/item').Item;


const createItem = async (req, res) =>{
    
    var item = new Item();
    console.log("creat item");
    console.log(req.body.item);
    item.name= req.body.item.name;
    item.stock=true;
    item.price= req.body.item.price;
    item.description = req.body.item.description;
    item.currency = req.body.item.currency;
    item.picture = req.body.item.picture;
    item.category = req.body.item.category;
    item.itemType = req.body.item.itemType;
    try{
        let itemSaved = await item.save();    
        res.json(itemSaved);
    }catch(e){
        console.log("error in save item and user");
        console.log(e);
    }
    
};
const updateItem = async (req, res) =>{
    try{
        let itemNew = await Item.findById(req.params.itemId);
        let {item} = req.body;
        console.log("update item");
        console.log(item);
        Object.keys(item).forEach((key)=>{
        itemNew[key] = item[key];
      });
        
        let itemSaved = await itemNew.save();    
        res.json(itemSaved);
    }catch(e){
        console.log("error in save item and user");
        console.log(e);
    }
        
    
};
function getItems(req,res){
    console.log("inside get items");
     Item.find({stock:true}).populate([{
            path: 'itemType',
            model: 'ItemType',
              }]).then(function(itemList) {
         return res.json(itemList);
     });
}

function getAdminItems(req,res){
    
     Item.find({ itemType: { $ne: null } }).then(function(itemList) {
         return res.json(itemList);
     });
}
function deleteItem(req, res) {
  Item.findById(req.params.itemId, function(err,item) {
    if (err) {
        console.log(err);
    }
    if(item){
        item.remove(function(err,removed){
        if(err){
          console.log("line 71");
          console.log(err);
        }
        if(removed){
        
            res.json({"message":"Item has been deleted"});    
        }
      });
    }
  });
}
function getItem(req, res) {
  Item.findById(req.params.itemId, function(err,item) {
    if (err) {
        console.log(err);
    }
    if(item){
        res.json({"item":item});    
    }
  });
}
var itemController = {
  createItem: createItem,
  getItem: getItem,
  deleteItem: deleteItem,
  getItems: getItems,
  updateItem: updateItem,
  getAdminItems
};

module.exports = itemController;
