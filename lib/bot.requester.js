var requester = require('./zlib.requester.js');

module.exports = (function(){
  
  var makeRequest = function( params, cb ){
    var items;
    var options = {
      url: 'https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&accepted=true&site=stackoverflow',
      encoding: null
    };
    options.url = options.url + getParamString( params );
      
    requester.request( options, function( err, answers ){
      if( !err ){      
        items = JSON.parse(answers).items;
        cb( null, items );
      }else{
        cb( err, items)
      }
    } );
  };

  var getParamString = function( params ){
    var str = '';
    for( var param in params ){
      str += '&' + param + '=' + params[param].replace(/\s/g, '%20');
    }
    return str;
  };
  
  return {
    makeRequest: makeRequest
  }
  
})();