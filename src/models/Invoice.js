const mongoose = require('mongoose');

const { BaseModel } = require('./BaseModel');
const invoicesRepo = require('../repositories/invoices');

// Define our model
const invoiceSchema = new mongoose.Schema({
   _id: number,
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
invoiceSchema.index({ id: 1 }, { unique: true });

invoiceSchema.pre('save', (next: any) => {
   this._id = invoicesRepo.getCurrentId() + 1;
   this.updateDate = Date.now();
   next();
});

module.exports = mongoose.model('Invoice', invoiceSchema);

export interface Invoice extends BaseModel {
   _id: number;
   firstName: string;
   lastName: string;
   isDeleted: boolean;
};
