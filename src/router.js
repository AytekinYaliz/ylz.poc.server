const passport = require('passport');
const passportService = require('./services/passport');

const authenticationController = require('./controllers/authentication');
const customersController = require('./controllers/customers');
const invoicesController = require('./controllers/invoices');
const testController = require('./controllers/test');


const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json");
const options = {
   customCss: fs.readFileSync('./styles/theme-material.css', {
      encoding: 'UTF-8'
   })
};

// default is cookie based session.
const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
   app.get('/', requireAuth, (req, res) => res.send({ hi: 'there' }) );
   app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

   app.post('/login', requireSignin, authenticationController.login);
   app.post('/register', authenticationController.register);
   app.post('/changePassword', requireAuth, authenticationController.changePassword);

   app.use('/customers', requireAuth, customersController.router);
   app.use('/invoices', requireAuth, invoicesController.router);
}
