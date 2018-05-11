const mongoose = require('mongoose');
const invoicesRepo = require('../repositories/invoices');


// Define our model
const invoiceSchema = new mongoose.Schema({
   number: { type: Number, required: true },
   customerId:{ type: String, required: true },
   amount: { type: Number, required: true },
   amountInLetters: { type: Number, required: true },
   date: { type: Date, required: true },
   branch: { type: String, required: true },
   staffId: { type: String, required: true },
   paymentType: { type: String, required: true },
   paymentTypeOther: { type: String, required: true },
   paymentReason: { type: String, required: true },
   paymentReasonOther: { type: String, required: true },
   details: { type: String, required: true },

   createDate: { type: Date, required: true, default: () => Date.now() },
   createdBy: { type: String, required: true },
   updateDate: { type: Date, required: true, default: () => Date.now() },
   updatedBy: { type: String, required: true }
}, {
   collection: 'Invoices',
   versionKey: false
});
invoiceSchema.index({ number: 1 }, { unique: true });

invoiceSchema.pre('save', next => {
   if(!this.number) {
      this.number = invoicesRepo.getMaxNumber() + 1;
   }
   this.updateDate = Date.now();
   next();
});

module.exports = mongoose.model('Invoice', invoiceSchema);
