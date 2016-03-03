require('./lib/bot.prepare.js');

var requester = require('./lib/zlib.requester.js');
var botHelper = require('./lib/bot.helper.js');
var config = require('./config.json') || {};
var botConfig = botHelper( process.env.token );

var opt = {
  url: 'http://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&answers=1&site=stackoverflow',
  encoding: null
};
var opt2 = {
  url: 'https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&accepted=true&site=stackoverflow',
  encoding: null
};

var params = ['body', 'title'];

botConfig.controller.hears(['hey (.*)'], ['direct_message', 'direct_mention', 'mention'], function( bot, message ){
  console.log(message);
  var index = 0;
  var currentParams = {};
  var savingParams; 
  
  var saveParams = function( paramKey ){
    return function( paramValue ){
      currentParams[paramKey] = paramValue;
    }
  };
  
  var askParameter = function( response, bot ){
    var currentParam = params[ index ];
    index++;
    if( currentParam !== undefined ){
      bot.ask('Do you want to search by ' + currentParam + '? (y/n)', function(response, convbot){
        if( response.text === 'y' || response.text === 'yes' ){
          savingParams = saveParams( currentParam );
          askParameterValue( bot, currentParam );
        }else{
          askParameter( response, convbot );
        }
        convbot.next();
      });
    }else{
      makeRequest( bot, response, {
        url: opt2.url + getParamString( currentParams ),
        encoding: null
      });
    }
  };
  
  var askParameterValue = function( bot, currentParam ){
    bot.ask('Tell me the value for ' + currentParam, function(response, bot){
      savingParams( response.text );
      askParameter( response, bot );
      bot.next();
    });
  };
  
  bot.startConversation(message, askParameter);
  
});

var makeRequest = function( bot, message, options ){
  var items;
  requester.request( options, function( err, answers ){
    if( !err ){      
      items = JSON.parse(answers).items;
      bot.say( 'Got ' + items.length + ' questions like yours, motafucka');
    }else{
      bot.say( 'Not results, motafucka');
    }
    bot.next();
  })
};

var getParamString = function( params ){
  var str = '';;
  for( var param in params ){
    str += '&' + param + '=' + params[param].replace(/\s/g, '%20');
  }
  return str;
};
