const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new mongoose.Schema({
   email: { type: String, unique: true, lowercase: true },
   password: String
}, {
   collection: 'Users'
});

// On-save Hook: encrypt password
userSchema.pre('save', function(next) {
   console.log( 'pre-save' );

});

// Create the model class
const model = mongoose.model('User', userSchema);

module.exports = model;
