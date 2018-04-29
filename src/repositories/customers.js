const Customer = require('../models/Customer');


exports.getById = async function(customerId) {
   return await Customer.findById(customerId);
}

exports.getAll = async function() {
   return await Customer.find({});
}

// exports.insert = async function(user) {
//    try {
//       const newUser = new User(user);

//       return await newUser.save();
//    } catch (err) {
//       if(err.code === 11000) {
//          console.log('11000 duplicate key error collection: ' + JSON.stringify(user));
//          throw Error('Email in use');
//       }
//       throw err;
//    }
// }

// exports.update = async function(user) {
//    try {
//       return await user.save();
//    } catch (err) {
//       if(err.code === 11000) {
//          console.log('11000 duplicate key error collection: ' + JSON.stringify(user));
//          throw Error('Email in use');
//       }
//       throw err;
//    }
// }
