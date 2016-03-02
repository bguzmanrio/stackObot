require('./lib/bot.prepare.js');

var requester = require('./lib/zlib.requester.js');
var botHelper = require('./lib/bot.helper.js');
var config = require('./config.json') || {};
var botConfig = botHelper( process.env.token );

var opt = {
  url: 'http://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&answers=1&site=stackoverflow',
  encoding: null
};

botConfig.controller.hears(['hey (.*)'], ['direct_message', 'direct_mention', 'mention'], function(bot, message){
  console.log(message);
  var matches = message.text.match(/hey (.*)/i);
  var name = matches[1];
  requester.request( opt, function( err, answers ){
    if( !err ){      
      bot.reply( message, 'Hey ' + name + ', motafucka');
      bot.reply( message, 'Got ' + answers.items.length + ' questions like yours, motafucka');
      //bot.startConversation(message, (function()));
    }else{
      bot.reply( message, 'Not results, motafucka');
    }
  })
});


var startConversation = function( bot, answers ){
  return bot.startConversation
}