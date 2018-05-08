const express = require('express');
const { HttpStatusCode } = require('../libs/constants');
const customersRepo = require('../repositories/customers');
// const namor = require('namor');


exports.router = express.Router()
   .get('/', getAll)
   .delete('/:customerId', deleteCustomer)
;

const customers = [
   {_id: 'jbhafd97', firstName: 'aytekin', lastName: 'yaliz', createDate: new Date(2011, 2, 5)},
   {_id: 'khdf73', firstName: 'asiye', lastName: 'yaliz', createDate: new Date(2013, 3, 9)},
   {_id: 'jhdf77jhd', firstName: 'omer faruk', lastName: 'yaliz', createDate: new Date(2017, 3, 9)},
   {_id: '8jadsf67tuydf', firstName: 'yahya selim', lastName: 'yaliz', createDate: new Date(2016, 2, 8)},
   {_id: 'hnayst7', firstName: 'serpil', lastName: 'yaliz', createDate: new Date(2010, 7, 7)},
   {_id: 'dd9898hb', firstName: 'nejdet', lastName: 'yaliz', createDate: new Date(2009, 9, 2)},
];


/**
 * GET /customers
 */
async function getAll(req, res, next) {
   try {
      // res.json(await customersRepo.getAll());

      res.json(customers);
   } catch(err) {
      return next(err);
   }
}

/**
 * DELETE /customers/:customerId
 */
async function deleteCustomer(req, res, next) {
   try {
      const index = customers.findIndex(customer => customer._id === req.params.customerId);
      customers.splice(index, 1);

      res.sendStatus(HttpStatusCode.OK);
   } catch(err) {
      return next(err);
   }
}
