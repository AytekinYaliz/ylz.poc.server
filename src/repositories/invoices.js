const Invoice = require('../models/Invoice');
const logger = require('../libs/logger');


exports.getById = async function(id) {
   return await Invoice.findById(id);
}

exports.getAll = async function() {
   return await Invoice.find();
}

exports.getCurrentId = async function() {
   return await Invoice
      .find()
      .sort({ '_id': -1 })
      .limit(1)
      .exec()
      .then(invoices => {
         return invoices[0]._id;
       })
       .catch(err => {
         return 'error occured';
       });
}
