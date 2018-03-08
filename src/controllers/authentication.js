const User = require('../models/User');

exports.signup = function(req, res, next) {
   const email = req.body.email,
      password = req.body.password;

   User.findOne({ email: email }, function(err, user) {
      if (err) { return next(err); }

      if (user) {
         return res.status(422).send({ error: 'Email is in use!' });
      }

      const newUser = new User({
         email,
         password
      });

      newUser.save(function(err) {
         if(err) { return next(err); }

         res.json(newUser);
      });
   });
}
