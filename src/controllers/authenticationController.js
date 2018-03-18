const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/User');


/**
 * Encodes userId (Subject) and IssuedAtTime w/ the secret
 * @param {User model} user 
 */
function tokenForUser(user) {
   return jwt.encode({ sub: user.id, iat: Date.now() }, config.secret);
}


/**
 * /signup
 */
exports.signup = async function(req, res, next) {
   const email = req.body.email,
      password = req.body.password;

   // if(!email || !password) {
   //    return res.status(422).send({ error: 'Please provide email and password!'});
   // }

   try {
      // generate a salt and then run callback
      const user = await User.findOne({ email });

      if(user) {
         return res.status(422).send({ error: 'Email is in use!' });
      }

      const newUser = new User({
         email,
         password
      });

      await newUser.save();

      res.json({ token: tokenForUser(user) });
   } catch(err) {
      return next(err);
   }
}
