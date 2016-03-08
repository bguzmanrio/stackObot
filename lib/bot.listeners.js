module.exports = (function(){
  
  var expressions = ['hey (.*)'];
  var hears = ['direct_message', 'direct_mention', 'mention'];
  
  
  return {
    expressions: expressions,
    hears: hears
  }
})();