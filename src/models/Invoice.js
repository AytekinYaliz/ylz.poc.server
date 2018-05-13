const mongoose = require('mongoose');
const invoicesRepo = require('../repositories/invoices');


// Define our model
const invoiceSchema = new mongoose.Schema({
   _id: { type: String, default: () => String(new mongoose.Types.ObjectId()) },
   number: { type: Number, required: true },
   customerId:{ type: String, required: true },
   amount: { type: Number, required: true },
   amountInLetters: { type: String },
   date: { type: Date, required: true },
   branch: { type: String, required: true },
   staffId: { type: String, required: true },
   paymentType: { type: String, required: true },
   paymentTypeOther: { type: String },
   paymentReason: { type: String, required: true },
   paymentReasonOther: { type: String },
   details: { type: String },

   createDate: { type: Date, required: true, default: () => new Date() },
   createdBy: { type: String, required: true },
   updateDate: { type: Date, required: true, default: () => new Date() },
   updatedBy: { type: String, required: true }
}, {
   collection: 'Invoices',
   versionKey: false
});
invoiceSchema.index({ number: 1 }, { unique: true });

invoiceSchema.set('toObject', {
   transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
   }
});

invoiceSchema.pre('save', async next => {
   this.updateDate = new Date();
   next();
});

module.exports = mongoose.model('Invoice', invoiceSchema);
