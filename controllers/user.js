'use strict';

var User = require('..//models/user').User;
var Order = require('..//models/order').Order;


async function createUser(req, res) {
  
  
  try{
    var user = new User();  
    let savedUser = await user.save();
    res.json({ user: savedUser.toAuthJSON() });
  }catch(e){
    console.log("exception in create user");
    console.log(e);
  }
  
    


};
function getUser(req, res) {
  
  
    User.findById(req.params.userId)
    .then(function(result) {
        return res.json(result);
    });
  
 
  
}
function updateUser(req, res) {
  User.findById(req.params.userId, function(err, foundUser) {
    if (err) {
    	console.log("hit the empty user");
    	console.log(err);
      
    }
    if(foundUser){
      console.log("the requested object");
      console.log(req.body);
      const {user} = req.body;
      Object.keys(user).forEach((item)=>{
        foundUser[item] = user[item];
      });
      foundUser["userTable"] = "";
      foundUser["userNotes"] = "";
      foundUser.save(function(err, result) {
        if (err) {
          console.log(err);
        }
        return res.json(result);
      });
    }
  });
}
function deleteUser(req, res) {

  User.findById(req.params.userId, function(err, user) {
    if (err) {
      console.log(err);
    }
    else {

    }
  });
}

const getUserOrders = async (req,res)=>{
  try{
   var options = {};
     
     options.sort = '-time';
    let userOrders = await Order.find({user:req.params.userId},null,options).populate([{
            path: 'orderItems',
            model: 'OrderItem',
              populate: {
                path: 'item',
                model: 'Item'
              }
        },{path:"user",model:"User"}]);
        
        res.json(userOrders);
    
  }catch(e){
    console.log("get orders error");
    console.log(e);
  }
  
};
var userController = {
  createUser: createUser,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getUserOrders: getUserOrders
};

module.exports = userController;


