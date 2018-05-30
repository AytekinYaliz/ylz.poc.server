const Customer = require('../models/Customer');
const logger = require('../libs/logger');


exports.getCount = function() {
   return Customer.count({});
}
exports.getById = function(customerId) {
   return Customer.findById(customerId);
}
exports.getAll = function(query) {
   return Customer.find(query);
}


exports.getList = async function() {
   return this.getAll({ 'isDeleted': false }).sort({ 'firstName': 1, 'lastName': 1 });
}

exports.insert = function(customer, userId) {
   const newCustomer = new Customer({
      ...customer,
      createdBy: userId,
      updatedBy: userId
   });

   return newCustomer.save();
}

exports.update = async function(customerId, customer, userId) {
   const customerFromDB = await getById(customerId);

   customerFromDB.firstName = customer.firstName;
   customerFromDB.lastName = customer.lastName;
   customerFromDB.updatedBy = userId;

   return customerFromDB.save();
}

exports.remove = async function(customerId, userId) {
   const customerFromDB = await getById(customerId);

   customerFromDB.isDeleted = true;
   customerFromDB.updatedBy = userId;

   return customerFromDB.save();
}

exports.insertPhone = async function(customerId, phone, userId) {
   const customer = await getById(customerId);

   customer.phones.push({ phone });

   return customer.save();
}

exports.startup = async function(customers, userId) {
   await customers.forEachSync(customer => {
      this.insert(customer, userId);
   });
}
