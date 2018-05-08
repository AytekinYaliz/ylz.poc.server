const Customer = require('../models/Customer');
const logger = require('../libs/logger');


exports.getById = async function(id) {
   return await Customer.findById(id);
}

exports.getAll = async function() {
   return await Customer.find();
}

exports.insertOne = async function(customer: any, userId: string): Promise<any> {
   try {
      const newCustomer = new Customer({
         ...customer,
         createdBy: userId,
         updatedBy: userId
      });

      return await newCustomer.save();
   } catch (err) {
      if(err.code === 11000) {
         logger.warn("11000 duplicate key error collection: " + JSON.stringify(customer));
      } else {
         logger.error(err);
      }
   }
}
