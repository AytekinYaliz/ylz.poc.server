const Invoice = require('../models/Invoice');
const logger = require('../libs/logger');
const usersRepo = require('./users');
const customersRepo = require('./customers');

exports.getCount = function() {
   return Invoice.count({});
}
exports.getById = function(invoiceId) {
   return Invoice.findById(invoiceId);
}
exports.getByCustomerId = function(customerId) {
   return Invoice.find({ customerId });
}


exports.getAll = async function() {
   const users = await usersRepo.getAll(),
      customers = await customersRepo.getAll(),
      invoices = await Invoice.find();

   return invoices.map(invoice => {
      return {
         ...invoice.toObject(),
         customerName: ((customer) => {
            return `${customer.firstName} ${customer.lastName}`
         })(customers.find(customer => customer.id === invoice.customerId)),
         staffName: ((user) => {
            return `${user.firstName} ${user.lastName}`
         })(users.find(user => user.id === invoice.staffId))
      }
   });
}

exports.insert = function(invoice, userId) {
   const newInvoice = new Invoice({
      ...invoice,
      createdBy: userId,
      updatedBy: userId
   });

   return newInvoice.save();
}

exports.update = async function(invoiceId, invoice, userId) {
   const invoiceFromDB = await getById(invoiceId);

   // invoiceFromDB.firstName = invoice.XXX;
   // invoiceFromDB.lastName = invoice.XXX;
   invoiceFromDB.updatedBy = userId;

   return invoiceFromDB.save();
}

exports.getMaxNumber = async function() {
   return new Promise((resolve, reject) => {
      Invoice
         .find()
         .sort({ 'number': -1 })
         .limit(1)
         // .exec()
         .then(invoices => {
            resolve(invoices.length ? invoices[0].number : 0);
         })
         .catch(err => {
            reject(err);
         });
   });
}
