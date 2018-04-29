const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Define our model
const userSchema = new mongoose.Schema({
   email: { type: String, required: true, unique: true, lowercase: true },
   password: { type: String, required: true },
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   isDeleted: { type: Boolean, required: true, default: () => false },
   createDate: {
      type: Date,
      required: true,
      default: () => Date.now()
   },
   updateDate: {
      type: Date,
      required: true,
      default: () => Date.now()
   }
}, {
   collection: 'Users',
   versionKey: false
});
userSchema.index({ email: 1 }, { unique: true });

/**
 * On-save Hook: encrypt password
 */
userSchema.pre('save', async function(next) {
   const user = this;

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
module.exports = mongoose.model('User', userSchema);
