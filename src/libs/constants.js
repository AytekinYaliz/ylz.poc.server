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
   Tooting: 1,
   Croydon: 2,
   Welling: 3,
   Kent: 4,
   Surrey: 5,
   Chattem: 6
};
