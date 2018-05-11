const { BranchType } = require('./libs/constants');
const customersRepo = require('./repositories/customers');
const branchesRepo = require('./repositories/branches');

exports.startup = async function(userId) {
   const numberOfCustomers = await customersRepo.getCount();
   if(!numberOfCustomers) {
      await customersRepo.startup(customers, userId);
   }

   const numberOfBranches = await branchesRepo.getCount();
   if(!numberOfBranches) {
      const branches = [];
      Object.keys(BranchType).forEach(branchType => {
         branches.push({ id: BranchType[branchType], name: branchType});
      });
      await branchesRepo.startup(branches, userId);
   }
}



const customers = [
   {firstName: 'aytekin', lastName: 'yaliz', createDate: new Date(2011, 2, 5), phones: [{phone: '786788'}, {phone: '222234'}]},
   {firstName: 'asiye', lastName: 'yaliz', createDate: new Date(2013, 3, 9), phones: [{phone: '111145'}, {phone: '9999'}]},
   {firstName: 'omer faruk', lastName: 'yaliz', createDate: new Date(2017, 3, 9)},
   {firstName: 'yahya selim', lastName: 'yaliz', createDate: new Date(2016, 2, 8)},
   {firstName: 'serpil', lastName: 'yaliz', createDate: new Date(2010, 7, 7), phones: [{phone: '055087349'}]},
   {firstName: 'nejdet', lastName: 'yaliz', createDate: new Date(2009, 9, 2), phones: [{phone: '076384708'}]},
];
