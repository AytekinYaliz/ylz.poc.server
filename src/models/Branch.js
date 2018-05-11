const mongoose = require('mongoose');


// Define our model
const branchSchema = new mongoose.Schema({
   _id: Number,
   name: { type: String, required: true },
   isDeleted: { type: Boolean, required: true, default: () => false },

   createDate: { type: Date, required: true, default: () => Date.now() },
   createdBy: { type: String, required: true },
   updateDate: { type: Date, required: true, default: () => Date.now() },
   updatedBy: { type: String, required: true }
}, {
   collection: 'Branches',
   versionKey: false
});
branchSchema.index({ name: 1 }, { unique: true });

branchSchema.pre('save', async function (next) {
   this.updateDate = Date.now();
   next();
});

// Create the model class
module.exports = mongoose.model('Branch', branchSchema);
