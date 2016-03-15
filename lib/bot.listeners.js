module.exports = (function(){
  
  return {
    quickSearch: ['so([.]{2,}|[…]) (.*)'],
    startExpression: ['hey (.*)'],
    hears: ['direct_message', 'direct_mention', 'mention'],
    ambientExpression: ['madafaca|madafaka|motafucka|motafuka|motherfucker|motafuca'],
    ambientListener: ['ambient']
  }
})();