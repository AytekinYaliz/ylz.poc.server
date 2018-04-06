const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/User');
const { HttpStatusCode } = require('../libs/constants');


/**
 * /signup
 */
exports.signup = async function(req, res, next) {
   console.log('/signup');

   const email = req.body.email,
      password = req.body.password;

   if(!email || !password) {
      return res.status(HttpStatusCode.UnprocessableEntity)
         .send({ error: 'Please provide email and password!'});
   }

   try {
      // generate a salt and then run callback
      const user = await User.findOne({ email });

      if(user) {
         return res.status(HttpStatusCode.UnprocessableEntity)
            .send({ error: 'Email is in use!' });
      }

      const newUser = new User({
         email,
         password
      });

      await newUser.save();

      res.json({ token: tokenForUser(newUser) });
   } catch(err) {
      return next(err);
   }
}


/**
 * /signin
 */
exports.signin = function(req, res, next) {
   console.log('/signin');

   // User has already had their email & password auth'd
   // We just need to give them a token
   res.send({ token: tokenForUser(req.user) });
};


/**
 * Encodes userId (Subject) and IssuedAtTime w/ the secret
 * @param {User model} user
 */
function tokenForUser(user) {
   return jwt.encode({ sub: user.id, iat: Date.now() }, config.secret);
}
