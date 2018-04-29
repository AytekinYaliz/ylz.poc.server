const User = require('../models/User');


exports.getById = async function(email) {
   return await User.findById(email);
}

exports.insert = async function(user) {
   try {
      const newUser = new User(user);

      return await newUser.save();
   } catch (err) {
      if(err.code === 11000) {
         console.log('11000 duplicate key error collection: ' + JSON.stringify(user));
         throw Error('Email in use');
      }
      throw err;
   }
}

exports.update = async function(user) {
   try {
      return await user.save();
   } catch (err) {
      if(err.code === 11000) {
         console.log('11000 duplicate key error collection: ' + JSON.stringify(user));
         throw Error('Email in use');
      }
      throw err;
   }
}
