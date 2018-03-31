
const nodeEnv = process.env.NODE_ENV;

module.exports = require(`./config.${nodeEnv}`);
