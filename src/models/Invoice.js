const mongoose = require('mongoose');
const invoicesRepo = require('../repositories/invoices');


// Define our model
const invoiceSchema = new mongoose.Schema({
   _id: Number,
   customerId:{ type: String, required: true },
   amount: { type: Number, required: true },
   amountInLetters: { type: Number, required: true },
   donationData: { type: Date, required: true },
   branchId: { type: String, required: true },

   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   isDeleted: { type: Boolean, required: true, default: () => false },

   createDate: { type: Date, required: true, default: () => Date.now() },
   createdBy: { type: String, required: true },
   updateDate: { type: Date, required: true, default: () => Date.now() },
   updatedBy: { type: String, required: true }
}, {
   collection: 'Invoices',
   versionKey: false
});
// invoiceSchema.index({ id: 1 }, { unique: true });

invoiceSchema.pre('save', next => {
   this._id = invoicesRepo.getMaxId() + 1;
   this.updateDate = Date.now();
   next();
});

module.exports = mongoose.model('Invoice', invoiceSchema);
