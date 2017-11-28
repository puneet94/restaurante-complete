'use strict';

var Admin = require('..//models/admin').Admin;





const login = async (req, res) =>{
    
  const { credentials } = req.body;
    
  Admin.findOne({ username: credentials.username }).then(admin => {
    if (admin && admin.isValidPassword(credentials.password )) {
      res.json({ admin: admin.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: "Invalid credentials" } });
    }
  });
};

const signup = async (req, res) =>{
    
    const { credentials } = req.body;
    
    var admin =  new Admin();
    
    admin.username = credentials.username;
    admin.setPassword(credentials.password);
    try{
      let savedAdmin = await admin.save();
      
      res.json({ admin: admin.toAuthJSON() });
    }
    catch(e){
      res.status(400).json({ errors: { global: "Invalid credentials" } });
    }
};


var adminController = {
  login,signup
};

module.exports = adminController;
