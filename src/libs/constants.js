exports.DeploymentType = {
   local: 'local',
   test: 'test',
   dev: 'dev',
   prod: 'prod'
}

exports.HttpStatusCode = {
   OK: 200,
   Created: 201,
   // Accepted: 202,
   NoContent: 204,
   BadRequest: 400,
   Unauthorized: 401,
   Forbidden: 403,
   NotFound: 404,
   UnprocessableEntity: 422,
   InternalServerError: 500
}

exports.RoleType = {
   admin: 'admin',
   manager: 'manager',
   user: 'user'
};
exports.BranchType = {
   Tooting: 'Tooting',
   Croydon: 'Croydon',
   Welling: 'Welling',
   Kent: 'Kent',
   Surrey: 'Surrey',
   Chattem: 'Chattem'
};

exports.PaymentType = {
   Cash: 'Cash',
   CreaditDebitCard: 'Creadit/Debit Card',
   Cheque: 'Cheque',
   BankTransfer: 'Bank Transfer',
   BankDeposit: 'Bank Deposit',
   Other: 'Other'
};

exports.PaymentReason = {
   Donation: 'Donation',
   DonationBox: 'Donation Box',
   StudentFee: 'Student Fee',
   Other: 'Other'
};
