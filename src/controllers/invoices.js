const express = require('express');
const logger = require('../libs/logger');
const { HttpStatusCode } = require('../libs/constants');
const invoicesRepo = require('../repositories/invoices');


exports.router = express.Router()
   .get('/', getAll)
   .get('/:invoiceId', getOne)
   .post('/', create)
   .put('/:invoiceId', update)
;

/**
 * GET /invoices
 */
async function getAll(req, res, next) {
   try {
      res.json(await invoicesRepo.getAll());
   } catch(err) {
      logger.error(err);
      return next(err);
   }
}

/**
 * GET /invoices/:id
 */
async function getOne(req, res, next) {
   try {
      const invoiceId = req.params.invoiceId;

      res.json(await invoicesRepo.getById(invoiceId));
   } catch(err) {
      logger.error(err);
      return next(err);
   }
}

/**
 * POST /invoices
 */
async function create(req, res, next) {
   try {
      const invoice = req.body,
         userId = req.locals.user.id;

      await invoicesRepo.post(invoice, userId);

      res.sendStatus(HttpStatusCode.Created);
   } catch(err) {
      logger.error(err);
      return next(err);
   }
}

/**
 * PUT /invoices/:id
 */
async function update(req, res, next) {
   try {
      const invoiceId = req.params.invoiceId,
         invoice = req.body,
         userId = req.locals.user.id;

      await invoicesRepo.update(invoiceId, invoice, userId);

      res.sendStatus();
   } catch(err) {
      logger.error(err);
      return next(err);
   }
}
