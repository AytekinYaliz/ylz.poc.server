const mongoose = require('mongoose');
const express = require('express');
const logger = require('../libs/logger');
const { HttpStatusCode } = require('../libs/constants');
const customersRepo = require('../repositories/customers');
const invoicesRepo = require('../repositories/invoices');
const usersRepo = require('../repositories/users');


exports.router = express.Router()
   .get('/', getAll)
   .get('/:customerId', getOne)
   .get('/:customerId/invoices', getInvoices)
   .post('/', create)
   .put('/:customerId', update)
   .delete('/:customerId', remove)
;

/**
 * GET /customers
 */
async function getAll(req, res, next) {
   try {
      const customers = await customersRepo.getAll();

      return res.json(customers);
   } catch(err) {
      logger.error(err);
      return next(err);
   }
}

/**
 * GET /customers/:id
 */
async function getOne(req, res, next) {
   try {
      const customerId = req.params.customerId;

      const customer = await customersRepo.getById(customerId);

      return res.json(customer);
   } catch(error) {
      logger.error(err);
      return next(err);
   }
}

/**
 * POST /customers
 */
async function create(req, res, next) {
   try {
      const customer = req.body,
         userId = req.locals.user.id;

      await customersRepo.post(customer, userId);

      return res.sendStatus(HttpStatusCode.Created);
   } catch(err) {
      logger.error(err);
      return next(err);
   }
}

/**
 * PUT /customers/:id
 */
async function update(req, res, next) {
   try {
      const customerId = req.params.customerId,
         customer = req.body,
         userId = req.locals.user.id;

      await customersRepo.update(customer, userId);

      return res.sendStatus();
   } catch(err) {
      logger.error(err);
      return next(err);
   }
}

/**
 * DELETE /customers/:id
 */
async function remove(req, res, next) {
   try {
      const customerId = req.params.customerId,
         userId = req.locals.user.id;

      customersRepo.remove(customerId, userId);

      return res.sendStatus(HttpStatusCode.NoContent);
   } catch(err) {
      logger.error(err);
      return next(err);
   }
}

/**
 * GET /customers/:id/phones
 */
async function getInvoices(req, res, next) {
   try {
      const customerId = req.params.customerId;

      const invoices = await invoicesRepo.getByCustomerId(customerId),
         users = await usersRepo.getAll();

      res.json(invoices.map(invoice => {
         const user = users.find(u => u._id.toString() === invoice.staffId);

         return {
            ...invoice.toObject(),
            staffName: `${user.firstName} ${user.lastName}`
         };
      }));
   } catch(err) {
      logger.error(err);
      return next(err);
   }
}
