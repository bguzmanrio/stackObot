require('./lib/bot.prepare.js');

var botHelper = require('./lib/bot.helper.js');
var botRequester = require('./lib/bot.requester.js');
var botConversation = require('./lib/bot.conversation.js');
var botListeners = require('./lib/bot.listeners.js');
var botFormatter = require('./lib/bot.formatter.js');
var eeLoader = require('./lib/bot.eeloader.js');
var botConfig = botHelper( process.env.token );

eeLoader.addEE({
  hears: botListeners.ambientExpression,
  listenTo: botListeners.ambientListener,
  cb: function( bot, message ){
    console.log(message);
    bot.reply(message, 'Who is the motafucka?');
  }
});

eeLoader.loadEEs( botConfig );

botConfig.controller.hears(
  botListeners.startExpression, 
  botListeners.hears, 
  function( mainBot, mainMessage ){  
    
    var makeFinalRequest = function( bot, currentParams ){
      if( Object.keys(currentParams).length > 0 ){
        botRequester.makeRequest( currentParams, function( err, res ){
          if( !err ){      
            var message = botFormatter.getLinks( res );
            mainBot.reply( mainMessage, 'Results motafuca: ' + message );
          }else{
            mainBot.reply( mainMessage, 'Not results, motafucka'); 
          }
        });
      }else{
        mainBot.reply( mainMessage, 'Ok then... I will be over here if you need something')
      }
    };
    
    mainBot.startConversation(mainMessage, function(err, convBot){
      var asker = new botConversation.ParameterAsker( convBot, makeFinalRequest );
      asker.askParameter();
      convBot.next();
    });
  
});

botConfig.controller.hears(
  botListeners.quickSearch,
  botListeners.hears,
  function( mainBot, mainMessage ){
    mainBot.reply( mainMessage, mainMessage.match[2] );
  }
)