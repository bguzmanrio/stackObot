module.exports = (function(){
  
  var easterEggs = [];
  
  var addEasterEgg = function( hears, listenTo, cb ){
    if(arguments.length === 1){
      easterEggs.push( arguments[0] );
    }else{
      easterEggs.push({
        hears: hears,
        listenTo: listenTo,
        cb: cb 
      });
    }
  };
  
  var loadEasterEggs = function( bot ){
    easterEggs.forEach(function( ea, pos ){
      if( typeof ea === 'function' ){
        ea( bot );
      }else{
        bot.controller.hears( ea.hears, ea.listenTo, ea.cb );
      }
    });
  };
  
  return {
    addEE: addEasterEgg,
    loadEEs: loadEasterEggs
  }
  
})();