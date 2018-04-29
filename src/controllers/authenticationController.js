const config = require('../config');
const { generateToken, decodeToken } = require('../services/passport');
const User = require('../models/User');
const { HttpStatusCode } = require('../libs/constants');
const usersRepo = require('../repositories/users');


/**
 * /login
 */
exports.login = function(req, res, next) {
   // User has already had their email & password auth'd
   // We just need to give them a token
   res.send({ token: generateToken(req.user) });
};

/**
 * /register
 */
exports.register = async function(req, res, next) {
   const email = req.body.email,
      password = req.body.password,
      firstName = req.body.firstName,
      lastName = req.body.lastName;

   //region [User input validations]
   if(!email) {
      return res
         .status(HttpStatusCode.BadRequest)
         .json({ error: 'Empty email!'});
   } else if(!password) {
      return res
         .status(HttpStatusCode.BadRequest)
         .json({ error: 'Empty password!'});
   } else if(!firstName) {
      return res
         .status(HttpStatusCode.BadRequest)
         .json({ error: 'Empty first name!'});
   } else if(!lastName) {
      return res
         .status(HttpStatusCode.BadRequest)
         .json({ error: 'Empty last name!'});
   }
   //#endregion

   try {
      const newUser = await usersRepo.insert({
         email,
         password,
         firstName,
         lastName
      });

      res.json({ token: generateToken(newUser) });
   } catch(err) {
      return next(err);
   }
}

/**
 * /changePassword
 */
exports.changePassword = async function(req, res, next) {
   const password = req.body.password,
      newPassword = req.body.newPassword;

   //region [User input validations]
   if(!password) {
      return res
         .status(HttpStatusCode.BadRequest)
         .json({ error: 'Empty password!'});
   } else if(!newPassword) {
      return res
         .status(HttpStatusCode.BadRequest)
         .json({ error: 'Empty new password!'});
   }
   //#endregion

   try {
      const user = new User(req.user);

      if(!await user.comparePasswordAsync(password)) {
         return res
            .status(HttpStatusCode.BadRequest)
            .send('Password not correct!');
      }

      user.password = newPassword;
      await usersRepo.update(user);

      res.sendStatus(HttpStatusCode.NoContent);
   } catch(err) {
      return next(err);
   }
};
