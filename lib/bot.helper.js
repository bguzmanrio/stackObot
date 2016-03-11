var Botkit = require('botkit');
var os = require('os');

module.exports = (function( token ){
  
  var controller = Botkit.slackbot({
      debug: false,
  });

  var bot = controller.spawn({
      token: token
  }).startRTM();

  return {
    bot: bot,
    controller: controller
  }

});