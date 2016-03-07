require('./lib/bot.prepare.js');

var botHelper = require('./lib/bot.helper.js');
var botRequester = require('./lib/bot.requester.js');
var botConfig = botHelper( process.env.token );
var botConversation = require('./lib/bot.conversation.js');

var opt = {
  url: 'https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&accepted=true&site=stackoverflow',
  encoding: null
};

var params = ['body', 'title'];

botConfig.controller.hears(
  ['hey (.*)'], 
  ['direct_message', 'direct_mention', 'mention'], 
  function( bot, message ){
    console.log(message);
    
    
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
    
    var index = 0;
    var currentParams = {};
    var savingParams; 
    bot.startConversation(message, function(err, convBot){
      var asker = new botConversation.ParameterAsker( convBot, makeFinalRequest );
      asker.askParameter();
      convBot.next();
    });
  
});