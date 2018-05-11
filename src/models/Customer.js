const mongoose = require('mongoose');


const phoneSchema = new mongoose.Schema({
   phone: { type: String, required: true }
}, { _id: false });

// Define our model
const customerSchema = new mongoose.Schema({
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

   createDate: { type: Date, required: true, default: () => Date.now() },
   createdBy: { type: String, required: true },
   updateDate: { type: Date, required: true, default: () => Date.now() },
   updatedBy: { type: String, required: true }
}, {
   collection: 'Customers',
   versionKey: false
});

customerSchema.pre('save', next => {
   this.updateDate = Date.now();
   next();
});

customerSchema.methods.comparePasswordAsync = async function(candidatePassword) {
   return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Customer', customerSchema);
