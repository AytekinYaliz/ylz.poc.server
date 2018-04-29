const customersRepo = require('../repositories/customers');

/**
 * GET /customers
 */
exports.getAll = async function(req, res, next) {
   try {
      // res.json(await customersRepo.getAll());
      res.json([
         {id: 123, firstName: 'aytekin', lastName: 'yaliz'},
         {id: 334, firstName: 'asiye', lastName: 'yaliz'},
         {id: 234, firstName: 'omer faruk', lastName: 'yaliz'},
         {id: 655, firstName: 'yahya selim', lastName: 'yaliz'}
      ]);

   } catch(err) {
      return next(err);
   }
}
