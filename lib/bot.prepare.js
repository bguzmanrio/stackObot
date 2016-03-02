var config = require('../config.json') || {};

module.exports = (function(){
  
  if( !config.token ){
    console.log("Error: Specify token in an external config.json file in the root directory. In case you do not have one token, contact your bot's admin to get one, or create your own bot.");
    process.exit(1);
  }
  
  process.env.token = process.env.token || config.token;

})()