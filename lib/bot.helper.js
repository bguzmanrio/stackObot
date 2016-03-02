var Botkit = require('botkit');
var os = require('os');

module.exports = (function( token ){
  
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