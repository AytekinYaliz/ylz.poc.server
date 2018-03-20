const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Define our model
const userSchema = new mongoose.Schema({
   email: { type: String, unique: true, lowercase: true, required: true },
   password: { type: String, required: true }
}, {
   collection: 'Users'
});

/**
 * On-save Hook: encrypt password
 */
userSchema.pre('save', async function(next) {
   const user = this;   // this: the user model

   try {
      // generate a salt and then run callback
      const salt = await bcrypt.genSalt(10);

      // hash (encrypt) our password using the salt
      const hash = await bcrypt.hash(user.password, salt, null);

      user.password = hash;
      next();
   } catch(err) {
      return next(err);
   }
});


userSchema.methods.comparePasswordAsync = async function(candidatePassword) {
   return await bcrypt.compare(candidatePassword, this.password);
};

// Create the model class
const model = mongoose.model('User', userSchema);

module.exports = model;




//userSchema.pre('save', async function(next) {
// bcrypt.genSalt(10, function(err, salt) {
//    if(err) { return next(err); }
//
//    bcrypt.hash(user.password, salt, null, function(err, hash) {
//       if(err) { return next(err); }
//
//       user.password = hash;
//       next();
//    });
// });
//});
//
// userSchema.methods.comparePassword = function(candidatePassword, callback) {
//    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//       if(err) { return callback(err); }
//       callback(null, isMatch);
//    });
// };