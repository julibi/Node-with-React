//figure out what credentials to return

if(process.env.NODE_ENV === 'production') {
  //we are in productino, return prod set of keys
  module.exports = require('./prod');
} else {
  //we are in development - return the dev keys
  module.exports = require('./dev');
}