const { BranchType, PaymentType, PaymentReason } = require('./libs/constants');
const branchesRepo = require('./repositories/branches');
const paymentTypesRepo = require('./repositories/paymentTypes');
const paymentReasonsRepo = require('./repositories/paymentReasons');
const usersRepo = require('./repositories/users');
const customersRepo = require('./repositories/customers');
const invoicesRepo = require('./repositories/invoices');

const mongoose = require('mongoose');


exports.startup = async function(userId) {

   const numberOfUsers = await usersRepo.getCount();
   if(!numberOfUsers) {
      usersRepo.insert({
         email: 'aytekinyaliz@gmail.com',
         password: '123',
         firstName: 'aytekin',
         lastName: 'yaliz',
         isDeleted: false,

      }, userId);
   }

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

   const numberOfInvoices = await invoicesRepo.getCount();
   if(!numberOfInvoices) {
      const customers = await customersRepo.getAll(),
         users = await usersRepo.getAll();

      customers.forEachSync(async (customer, index) => {
         for(let i = 0; i<Math.floor( Math.random() * 15 ); i++) {
            const number = (await invoicesRepo.getMaxNumber());

            const invoice = {
               number: number + 1,
               customerId: customer._id,
               amount: Math.floor( Math.random() * 1000 ),
               amountInLetters: 'amount',
               date: new Date(Date.now() - Math.floor( Math.random() * 10000000000 )),
               branch: Object.keys(BranchType)[Math.floor( Math.random() * 1000 ) % 6],
               staffId: users[0]._id,
               paymentType: Object.keys(PaymentType)[Math.floor( Math.random() * 1000 ) % 6],
               paymentTypeOther: '',
               paymentReason: Object.keys(PaymentReason)[Math.floor( Math.random() * 1000 ) % 4],
               paymentReasonOther: '',
               details: ''
            };

            await invoicesRepo.insert(invoice, userId);
         }
      });
   }
}


const customers = [
   {firstName: 'aytekin', lastName: 'yaliz', createDate: new Date(2011, 2, 5), phones: [{phone: '786788'}, {phone: '222234'}, {phone: '452345'}, {phone: '323'}]},
   {firstName: 'asiye', lastName: 'yaliz', createDate: new Date(2013, 3, 9), phones: [{phone: '111145'}, {phone: '9999'}]},
   {firstName: 'omer faruk', lastName: 'yaliz', createDate: new Date(2017, 3, 9)},
   {firstName: 'yahya selim', lastName: 'yaliz', createDate: new Date(2016, 2, 8)},
   {firstName: 'serpil', lastName: 'yaliz', createDate: new Date(2010, 7, 7), phones: [{phone: '055087349'}, {phone: '7898'}, {phone: '2356'}]},
   {firstName: 'nejdet', lastName: 'yaliz', createDate: new Date(2009, 9, 2), phones: [{phone: '076384708'}, {phone: '5577899'}, {phone: '66800'}]},
   {firstName: 'xdfa', lastName: 'kahdf', createDate: new Date(2011, 2, 5), phones: [{phone: '786788'}, {phone: '222234'}, {phone: '4235'}]},
   {firstName: 'jshdfkh hgfh', lastName: 'djhgdhf', createDate: new Date(2010, 1, 9), phones: [{phone: '111145'}, {phone: '9999'}, {phone: '333'}]},
   {firstName: 'hfggasfdu iusad', lastName: 'sfy87h', createDate: new Date(2008, 8, 9), phones: [{phone: '67890'}, {phone: '5789789'}, {phone: '67990'}]},
   {firstName: 'jasdh hd', lastName: 'asd9if098sax', createDate: new Date(2000, 7, 8), phones: [{phone: '33'}, {phone: '234356678'}, {phone: '33797993'}]},
   {firstName: 'sdf89', lastName: 'sdfkjhl', createDate: new Date(2003, 1, 9), phones: [{phone: '055087349'}, {phone: '55589'}]},
   {firstName: 'sdh889 sdf', lastName: 'ddr3r', createDate: new Date(2003, 2, 10), phones: [{phone: '076384708'}, {phone: '89789'}, {phone: '234'}]},
];
