const authenticationController = require('./controllers/authenticationController');

module.exports = function(app) {
   app.post('/signup', authenticationController.signup);

}