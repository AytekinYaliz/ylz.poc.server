const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/User');
const { HttpStatusCode } = require('../libs/constants');


/**
 * /customers
 */
exports.getAll = async function(req, res, next) {
   const token = req.get('authorization');

   if(!token) {
      return res.status(HttpStatusCode.Forbidden)
         .send({ error: 'Please provide a token!'});
   }

   try {
      const customers = [
         {id: 123, firstName: 'aytekin', lastName: 'yaliz'},
         {id: 334, firstName: 'asiye', lastName: 'yaliz'},
         {id: 234, firstName: 'omer faruk', lastName: 'yaliz'},
         {id: 655, firstName: 'yahya selim', lastName: 'yaliz'}
      ];

      res.json(customers);
   } catch(err) {
      return next(err);
   }
}

