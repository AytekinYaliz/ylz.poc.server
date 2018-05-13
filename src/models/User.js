const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const roleSchema = new mongoose.Schema({
   name: { type: String, required: true }
}, { _id: false });

// Define our model
const userSchema = new mongoose.Schema({
   _id: { type: String, default: () => String(new mongoose.Types.ObjectId()) },
   email: { type: String, required: true, unique: true, lowercase: true },
   password: { type: String, required: true },
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   roles: { type: [roleSchema], required: false },
   isDeleted: { type: Boolean, required: true, default: () => false },

   createDate: { type: Date, required: true, default: () => new Date() },
   createdBy: { type: String, required: true },
   updateDate: { type: Date, required: true, default: () => new Date() },
   updatedBy: { type: String, required: true }
}, {
   collection: 'Users',
   versionKey: false
});
userSchema.index({ email: 1 }, { unique: true });

userSchema.set('toObject', {
   transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
   }
});


/**
 * On-save Hook: encrypt password
 */
userSchema.pre('save', async function (next) {
   // const user = this;

   try {
      // generate a salt and then run callback
      const salt = await bcrypt.genSalt(10);

      // hash (encrypt) our password using the salt
      const hash = await bcrypt.hash(this.password, salt, null);

      this.password = hash;
      this.updateDate = new Date();

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
