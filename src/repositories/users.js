const User = require('../models/User');


exports.getCount = function() {
   return User.count({});
}
exports.getAll = function() {
   return User.find();
}
exports.getById = function(email) {
   return User.findById(email);
}

exports.insert = async function(user, userId) {
   try {
      user.createdBy = userId;
      user.updatedBy = userId;

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

exports.update = function(user) {
   return user.save();
}
