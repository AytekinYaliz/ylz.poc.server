const config = require('./config');
const app = require('./app');


const port = config.port || 3001;

const server = app.listen(port, function() {
   const ann = `| App is running at port '${port}' in '${app.get("env")}' mode |`;

   console.log(ann.replace(/[^]/g, "-"));
   console.log(ann);
   console.log(ann.replace(/[^]/g, "-"));
   console.log("Press CTRL-C to stop\n");
});

module.exports = server;
