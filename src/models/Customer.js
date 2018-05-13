const mongoose = require('mongoose');


const phoneSchema = new mongoose.Schema({
   phone: { type: String, required: true }
}, { _id: false });

// Define our model
const customerSchema = new mongoose.Schema({
   _id: { type: String, default: () => String(new mongoose.Types.ObjectId()) },
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   address1: { type: String },
   address2: { type: String },
   town: { type: String },
   city: { type: String },
   postCode: { type: String },
   email: { type: String },
   phones: [phoneSchema],
   isDeleted: { type: Boolean, required: true, default: () => false },

   createDate: { type: Date, required: true, default: () => new Date() },
   createdBy: { type: String, required: true },
   updateDate: { type: Date, required: true, default: () => new Date() },
   updatedBy: { type: String, required: true }
}, {
   collection: 'Customers',
   versionKey: false
});

customerSchema.set('toObject', {
   transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
   }
});

customerSchema.pre('save', next => {
   this.updateDate = new Date();
   next();
});

customerSchema.methods.comparePasswordAsync = async function(candidatePassword) {
   return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Customer', customerSchema);
