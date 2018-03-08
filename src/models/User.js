const mongoose = require('mongoose');


// Define our model
const userSchema = new mongoose.Schema({
   email: { type: String, unique: true, lowercase: true },
   password: String
}, {
   collection: 'Users'
});

// Create the model class
const model = mongoose.model('User', userSchema);

module.exports = model;
