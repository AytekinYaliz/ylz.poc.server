/**
 * passport: used to authenticate a user when they navigate a route that requires authenticaton
 * strategy: a method in passport to authenticate a user
 *    strategy 1: verify user w/ a JWT
 *    strategy 2: verify user w/ a username and password 
 */
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/User');
const config = require('../config');


// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, async function(email, password, done) {
   // Verify this username and pasword, call done w/ the user
   // if it the correct email and password
   // otherwise, call done w/ false
   try {
      const user = await User.findOne({ email });

      if(!err) { return done(null, false); }

      // compare passwords - is 'password' === user.password
      user.comparePassword(email, callback(err, isMatch) { 
         if(err) { return done(err); }

         return done(null, user);
         
      });
      
   } catch(err) {
      return done(err);
   }
});

// Setup options for JWT Strategy
const jwtOptions = {
   jwtFromRequest: ExtractJwt.fromHeader('authorization'),
   secretOrKey: config.secret
};

/**
 * Create JWT Strategy
 * payload: decoded version of jwt token { sub: user.id, iat: Date.now() }
 */
const jwtLogin = new JwtStrategy(jwtOptions, async function(payload, done) {
   // see if the user ID in the payload exists in our DB 
   // If it does, call done w/ a user object
   // otherwise, call done w/o a user object
   try {
      const user = await User.findById(payload.sub);

      if(user) {
         done(null, user);
      } else {
         done(null, false);
      }
   } catch(err) {
      return done(err);
   }
});

// Tell passport to use this strategy
passport.use(jwtLogin);
