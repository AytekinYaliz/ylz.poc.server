const mongoose = require('mongoose');


// Define our model
const branchSchema = new mongoose.Schema({
   _id: { type: String, auto: true, default: () => String(new mongoose.Types.ObjectId()) },
   name: { type: String, required: true },
   isDeleted: { type: Boolean, required: true, default: () => false },

   createDate: { type: Date, required: true, default: () => new Date() },
   createdBy: { type: String, required: true },
   updateDate: { type: Date, required: true, default: () => new Date() },
   updatedBy: { type: String, required: true }
}, {
   collection: 'Branches',
   versionKey: false
});
branchSchema.index({ name: 1 }, { unique: true });

branchSchema.set('toObject', {
   transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
   }
});

branchSchema.pre('save', async function (next) {
   this.updateDate = new Date();
   next();
});

// Create the model class
module.exports = mongoose.model('Branch', branchSchema);
