const mongoose = require('mongoose');


// Define our model
const customerSchema = new mongoose.Schema({
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
   collection: 'Customers',
   versionKey: false
});

userSchema.methods.comparePasswordAsync = async function(candidatePassword) {
   return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
