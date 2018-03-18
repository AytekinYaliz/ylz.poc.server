const testController = require('./controllers/testController');
const authenticationController = require('./controllers/authenticationController');
const passportService = require('./services/passport');
const passport = require('passport');


// default is cookie based session.
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
   app.get('/test', testController.test);

   app.get('/', requireAuth, function(req, res) {
      console.log( 'fffff' );
      res.send({ hi: 'there' });
   });
   app.post('/signup', authenticationController.signup);
}
