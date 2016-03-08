require('./lib/bot.prepare.js');

var botHelper = require('./lib/bot.helper.js');
var botRequester = require('./lib/bot.requester.js');
var botConversation = require('./lib/bot.conversation.js');
var botListeners = require('./lib/bot.config.js');
var botConfig = botHelper( process.env.token );

botConfig.controller.hears(
  botConfig.expressions, 
  botConfig.hears, 
  function( bot, message ){  
    
    var makeFinalRequest = function( bot, currentParams ){
      botRequester.makeRequest( currentParams, function( err, res ){
        if( !err ){      
          bot.say( 'Got ' + res.length + ' questions like yours, motafucka');
        }else{
          bot.say( 'Not results, motafucka');
        }
        bot.next();
      });
    };
    
    bot.startConversation(message, function(err, convBot){
      var asker = new botConversation.ParameterAsker( convBot, makeFinalRequest );
      asker.askParameter();
      convBot.next();
    });
  
});