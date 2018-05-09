const Customer = require('../models/Customer');
const logger = require('../libs/logger');


exports.getCount = function() {
   return Customer.count({});
}
exports.getById = function(id) {
   return Customer.findById(id);
}
exports.getAll = function() {
   return Customer.find();
}

exports.insert = function(customer, userId) {
   const newCustomer = new Customer({
      ...customer,
      createdBy: userId,
      updatedBy: userId
   });

   return newCustomer.save();
}

exports.update = async function(id, customer, userId) {
   const customerFromDB = await getById(id);

   customerFromDB.firstName = customer.firstName;
   customerFromDB.lastName = customer.lastName;
   customerFromDB.updatedBy = userId;

   return customerFromDB.save();
}

exports.remove = async function(id, userId) {
   const customerFromDB = await getById(id);

   customerFromDB.isDeleted = true;
   customerFromDB.updatedBy = userId;

   return customerFromDB.save();
}

exports.insertPhone = async function(id, phone, userId) {
   const customer = await getById(id);

   customer.phones.push({ phone });

   return customer.save();
}

exports.startup = async function(customers, userId) {
   await customers.forEachSync(customer => {
      this.insert(customer, userId);
   });
}
