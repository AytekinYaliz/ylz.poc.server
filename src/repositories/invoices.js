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
exports.getAll = function() {
   return Invoice.find();
}
exports.getByCustomerId = function(customerId) {
   return Invoice.find({ customerId });
}


exports.getList = async function() {
   const users = await usersRepo.getAll(),
      customers = await customersRepo.getAll(),
      invoices = await this.getAll().sort({ 'number': -1 });

   return invoices.map(invoice => {
      return {
         ...invoice.toObject(),
         customerName: getName(customers.find(customer => customer.id === invoice.customerId)),
         staffName: getName(users.find(user => user.id === invoice.staffId))
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

function getName(entity) {
   return `${entity.firstName} ${entity.lastName}`
}
