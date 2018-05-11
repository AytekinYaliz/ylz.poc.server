const { BranchType, PaymentType, PaymentReason } = require('./libs/constants');
const customersRepo = require('./repositories/customers');
const branchesRepo = require('./repositories/branches');
const paymentTypesRepo = require('./repositories/paymentTypes');
const paymentReasonsRepo = require('./repositories/paymentReasons');

exports.startup = async function(userId) {
   const numberOfBranches = await branchesRepo.getCount();
   if(!numberOfBranches) {
      const branches = [];
      Object.keys(BranchType).forEach(branchType => {
         branches.push({ id: branchType, name: BranchType[branchType] });
      });
      await branchesRepo.startup(branches, userId);
   }

   const numberOfPaymentTypes = await paymentTypesRepo.getCount();
   if(!numberOfPaymentTypes) {
      const paymentTypes = [];
      Object.keys(PaymentType).forEach(paymentType => {
         paymentTypes.push({ id: paymentType, name: PaymentType[paymentType] });
      });
      await paymentTypesRepo.startup(paymentTypes, userId);
   }

   const numberOfPaymentReasons = await paymentReasonsRepo.getCount();
   if(!numberOfPaymentReasons) {
      const paymentReasons = [];
      Object.keys(PaymentReason).forEach(paymentReason => {
         paymentReasons.push({ id: paymentReason, name: PaymentReason[paymentReason] });
      });
      await paymentReasonsRepo.startup(paymentReasons, userId);
   }

   const numberOfCustomers = await customersRepo.getCount();
   if(!numberOfCustomers) {
      await customersRepo.startup(customers, userId);
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
