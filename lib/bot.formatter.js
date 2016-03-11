module.exports = (function(){
  
  var linkResumeMessage = function(res){
    var message = '';
    var responses = JSON.parse(JSON.stringify(res));
    for(var i = 0; i < 10; i++){
      message += ' \n' + responses[i].link; 
    }
    
    return message;
  };
  
  return {
    getLinks: linkResumeMessage
  }
  
})();