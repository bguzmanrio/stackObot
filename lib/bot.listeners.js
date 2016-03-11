module.exports = (function(){
  

  return {
    startExpression: ['hey (.*)'],
    hears: ['direct_message', 'direct_mention', 'mention'],
    ambientExpression: ['madafaca|madafaka|motafucka|motafuka|motherfucker|motafuca'],
    ambientListener: ['ambient']
  }
})();