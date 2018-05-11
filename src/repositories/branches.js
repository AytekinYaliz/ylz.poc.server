const Branch = require('../models/Branch');
const logger = require('../libs/logger');


exports.getCount = function() {
   return Branch.count({});
}
exports.getAll = function() {
   return Branch.find().sort({ name: 1});
}

exports.insert = function(id, name, userId) {
   console.log( id, name );

   const newBranch = new Branch({
      _id: id,
      name,
      isDeleted: false,
      createdBy: userId,
      updatedBy: userId
   });

   return newBranch.save();
}

exports.startup = async function(branches, userId) {
   await branches.forEachSync(async branch => {
      await this.insert(branch.id, branch.name, userId);
   });
}
