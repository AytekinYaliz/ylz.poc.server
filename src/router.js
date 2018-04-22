const passport = require('passport');
const passportService = require('./services/passport');

const authenticationController = require('./controllers/authenticationController');
const customersController = require('./controllers/customersController');
const testController = require('./controllers/testController');



// default is cookie based session.
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
   app.get('/', requireAuth, function(req, res) {
      res.send({ hi: 'there' });
   });
   app.get('/test', test1, test2, test3, testController.test);

   app.post('/login', requireSignin, authenticationController.login);
   app.post('/register', authenticationController.register);
   app.get('/customers', customersController.getAll);
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
