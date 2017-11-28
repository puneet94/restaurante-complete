'use strict';

var Order = require('..//models/order').Order;
var User = require('..//models/user').User;
var OrderItem = require('..//models/orderItem').OrderItem;

const createOrder = async (req, res) =>{
    
    var order = new Order();
    
    let items = req.body.order.items;
    let price = req.body.order.price;
    let currency = req.body.order.currency;
    
    /*var user = new User();
    user.name= req.body.order.user.userName;
    user.phone = req.body.order.user.userPhone;
    user.email = req.body.order.user.userEmail;
    user.notes = req.body.order.user.userNotes;
    user.table = req.body.order.user.userTable;
    */
    order.notes = req.body.order.user.userNotes;
    
    
    order.table = req.body.order.user.userTable;
    order.user = req.body.order.user.userId;
    order.state = "Received";
    order.content = req.body.content;
        
    order.price = price;
    order.currency   = currency;
    try{
        //let savedUser = await user.save();
        
        let orderSaved = await order.save();    
        for(let i=0;i<items.length;i++){
             await saveOrderItem(items[i],orderSaved._id);
            
        }  
        let finalOrder = await Order.findById(orderSaved._id).populate([{
            path: 'orderItems',
            model: 'OrderItem',
              populate: {
                path: 'item',
                model: 'Item'
              }
        },{path:"user",model:"User"}]);
        res.json(finalOrder);
    }catch(e){
        console.log("error in save order and user");
        console.log(e);
    }
    
};
const updateOrder = async (req,res)=>{
    try{
        let order = await Order.findById(req.params.orderId);
        order.state = req.body.type;
        let updatedOrder = await order.save();
        res.json(updatedOrder);
    }catch(e){
        console.log("update order error");
        console.log(e);
    }
  
};
const saveOrderItem = async(item,order)=>{
    var orderItem = new OrderItem();
    orderItem.item= item._id;
    orderItem.quantity = item.quantity;
    orderItem.price = item.price;
    orderItem.order = order;
    try{
        await orderItem.save();    
    }catch(e){
        console.log("error in saving order item");
        console.log(e);
    }
};
function getOrders(req,res){
    var query = {};
    
    if(req.query.type!="All"){
        query.state = req.query.type;
    }
     var options = {};
     
     options.sort = '-time';
     options.populate = [{
            path: 'orderItems',
            model: 'OrderItem',
              populate: {
                path: 'item',
                model: 'Item'
              }
        },{path:"user",model:"User"}];
     Order.find(query,null,options).then((orders)=>{
         res.json(orders);
     });
}
function deleteOrder(req, res) {
  Order.findById(req.params.orderId, function(err,order) {
    if (err) {
        console.log(err);
    }
    if(order){
        order.remove(function(err,removed){
        if(err){
          console.log("line 71");
          console.log(err);
        }
        if(removed){
        
            res.json({"message":"Order has been deleted"});    
        }
      });
    }
  });
}
function getOrder(req, res) {
  Order.findById(req.params.orderId, function(err,order) {
    if (err) {
        console.log(err);
    }
    if(order){
        res.json({"order":order});    
    }
  });
}
var orderController = {
  createOrder: createOrder,
  getOrder: getOrder,
  deleteOrder: deleteOrder,
  getOrders,
  updateOrder
};

module.exports = orderController;
