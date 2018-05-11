const PaymentReason = require('../models/PaymentReason');
const logger = require('../libs/logger');


exports.getCount = function() {
   return PaymentReason.count({});
}
exports.getAll = function() {
   return PaymentReason.find().sort({ name: 1});
}

exports.insert = function(paymentReasonId, name, userId) {
   const newPaymentReason = new PaymentReason({
      _id: paymentReasonId,
      name,
      isDeleted: false,
      createdBy: userId,
      updatedBy: userId
   });

   return newPaymentReason.save();
}

exports.startup = async function(paymentReasons, userId) {
   await paymentReasons.forEachSync(async paymentReason => {
      await this.insert(paymentReason.id, paymentReason.name, userId);
   });
}
