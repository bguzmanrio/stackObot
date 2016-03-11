require('./lib/bot.prepare.js');

var botHelper = require('./lib/bot.helper.js');
var botRequester = require('./lib/bot.requester.js');
var botConversation = require('./lib/bot.conversation.js');
var botListeners = require('./lib/bot.listeners.js');
var botFormatter = require('./lib/bot.formatter.js');
var botConfig = botHelper( process.env.token );


botConfig.controller.hears(
  botListeners.ambientExpression,
  botListeners.ambientListener,
  function( bot, message ){
    console.log(message);
    bot.reply(message, 'Who is the motafucka?');
  }
)

botConfig.controller.hears(
  botListeners.startExpression, 
  botListeners.hears, 
  function( mainBot, mainMessage ){  
    
    var makeFinalRequest = function( bot, currentParams ){
      botRequester.makeRequest( currentParams, function( err, res ){
        //bot.next();
        if( !err ){      
          var message = botFormatter.getLinks( res );
          mainBot.reply( mainMessage, 'Results motafuca: ' + message );
        }else{
          mainBot.reply( mainMessage, 'Not results, motafucka'); 
        }
      });
    };
    
    mainBot.startConversation(mainMessage, function(err, convBot){
      var asker = new botConversation.ParameterAsker( convBot, makeFinalRequest );
      asker.askParameter();
      convBot.next();
    });
  
});