const PaymentType = require('../models/PaymentType');
const logger = require('../libs/logger');


exports.getCount = function() {
   return PaymentType.count({});
}
exports.getAll = function() {
   return PaymentType.find().sort({ name: 1});
}

exports.insert = function(paymentTypeId, name, userId) {
   const newPaymentType = new PaymentType({
      _id: paymentTypeId,
      name,
      isDeleted: false,
      createdBy: userId,
      updatedBy: userId
   });

   return newPaymentType.save();
}

exports.startup = async function(paymentTypes, userId) {
   await paymentTypes.forEachSync(async paymentType => {
      await this.insert(paymentType.id, paymentType.name, userId);
   });
}
