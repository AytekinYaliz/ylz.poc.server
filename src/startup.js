const customersRepo = require('./repositories/customers');


exports.startup = async function(userId) {
   const numberOfCustomers = await customersRepo.getCount();
   if(!numberOfCustomers) {
      await customersRepo.startup(customers, userId);
   }
}



const customers = [
   {firstName: 'aytekin', lastName: 'yaliz', createDate: new Date(2011, 2, 5)},
   {firstName: 'asiye', lastName: 'yaliz', createDate: new Date(2013, 3, 9)},
   {firstName: 'omer faruk', lastName: 'yaliz', createDate: new Date(2017, 3, 9)},
   {firstName: 'yahya selim', lastName: 'yaliz', createDate: new Date(2016, 2, 8)},
   {firstName: 'serpil', lastName: 'yaliz', createDate: new Date(2010, 7, 7)},
   {firstName: 'nejdet', lastName: 'yaliz', createDate: new Date(2009, 9, 2)},
];
