/**
 * PASSPORT: used to authenticate a user when they navigate a route that requires authenticaton
 * STRATEGY: a method in passport to authenticate a user
 *    strategy 1: verify user w/ a JWT
 *    strategy 2: verify user w/ a username and password
 */
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/User');
const config = require('../config');


/**
 * Create local strategy
 *    done: this callback is supplied by passport. Passport assigns user model to req.user
 */
const localOptions = {
   usernameField: 'email'
};
const localLogin = new LocalStrategy(localOptions, async function(email, password, done) {
   // Verify this username and pasword, call done w/ the user
   // if it the correct email and password. Otherwise, call done w/ false
   try {
      const user = await User.findOne({ email });

      if(!user) { return done(null, false); }

      const isMatch = await user.comparePasswordAsync(password);
      return isMatch
         ? done(null, user)
         : done(null, false);
   } catch(err) {
      return done(err);
   }
});


/**
 * Create JWT Strategy
 * payload: decoded version of jwt token { sub: user.id, iat: Date.now() }
 */
const jwtOptions = {
   jwtFromRequest: ExtractJwt.fromHeader('authorization'),
   secretOrKey: config.secret
};
 const jwtLogin = new JwtStrategy(jwtOptions, async function(payload, done) {
   // see if the user ID in the payload exists in our DB
   // If it does, call done w/ a user object
   // otherwise, call done w/o a user object
   try {
      const user = await User.findById(payload.sub);

      return user
         ? done(null, user)
         : done(null, false);
   } catch(err) {
      return done(err);
   }
});


// Tell passport to use these strategies
passport.use(jwtLogin);
passport.use(localLogin);
