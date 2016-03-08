require('./lib/bot.prepare.js');

var botHelper = require('./lib/bot.helper.js');
var botRequester = require('./lib/bot.requester.js');
var botConfig = botHelper( process.env.token );
var botConversation = require('./lib/bot.conversation.js');

botConfig.controller.hears(
  ['hey (.*)'], 
  ['direct_message', 'direct_mention', 'mention'], 
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