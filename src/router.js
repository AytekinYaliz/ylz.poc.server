const testController = require('./controllers/testController');
const authenticationController = require('./controllers/authenticationController');
const passportService = require('./services/passport');
const passport = require('passport');


// default is cookie based session.
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
   app.get('/test', test1, test2, test3, testController.test);

   app.get('/', requireAuth, function(req, res) {
      res.send({ hi: 'there' });
   });

   app.post('/signup', authenticationController.signup);
   app.post('/signin', requireSignin, authenticationController.signin);
}

function test1(req, res, next) {
   console.log('a');
   next();
}
function test2(req, res, next) {
   console.log('b');
   next();
}
function test3(req, res, next) {
   console.log('c');
   next();
}
