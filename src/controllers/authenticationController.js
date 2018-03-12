const User = require('../models/User');


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

      res.json(newUser);
   } catch(err) {
      return next(err);
   }
}
