const passport = require('passport');
const passportService = require('./services/passport');

const authenticationController = require('./controllers/authentication');
const customersController = require('./controllers/customers');
const testController = require('./controllers/test');


// default is cookie based session.
const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
   app.get('/', requireAuth, (req, res) => res.send({ hi: 'there' }) );

   app.post('/login', requireSignin, authenticationController.login);
   app.post('/register', authenticationController.register);
   app.post('/changePassword', requireAuth, authenticationController.changePassword);

   app.use('/customers', customersController.router);
}
