var Botkit = require('botkit');
var os = require('os');

module.exports = (function( token ){
  
  
  if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
  }


  var controller = Botkit.slackbot({
      debug: true,
  });

  var bot = controller.spawn({
      token: token
  }).startRTM();

  return {
    bot: bot,
    controller: controller
  }

});