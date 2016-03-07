module.exports = (function(){
  
  function ParameterAsker( bot, cb ){
    this.bot = bot;
    this.index = 0;
    this.currentParams = {};
    this.params = ['body', 'title'];
    this.cb = cb;
  };
  
  ParameterAsker.prototype.askParameter = function(  ){
    var currentParam = this.params[ this.index ];
    this.index++;
    if( currentParam !== undefined ){
      this.askParameterIncluded( this.bot, currentParam );
    }else{
      this.cb( this.bot, this.currentParams );
    }
  };
  
  ParameterAsker.prototype.askParameterIncluded =  function( bot, currentParam ){
    var asker = this;
    asker.bot.ask('Do you want to search by ' + currentParam + '? (y/n)', function(response, convbot){
      if( response.text === 'y' || response.text === 'yes' ){
        asker.savingParams = asker.saveParams( currentParam );
        asker.askParameterValue( bot, currentParam );
      }else{
        asker.askParameter( convbot );
      }
      convbot.next();
    });
  };
  
  ParameterAsker.prototype.askParameterValue = function( bot, currentParam ){
    var asker = this;
    asker.bot.ask('Tell me the value for ' + currentParam, function(response, bot){
      asker.savingParams( response.text );
      asker.askParameter( response, bot );
      asker.bot.next();
    });
  };
  
  ParameterAsker.prototype.saveParams = function( paramKey ){
    var asker = this;
    return function( paramValue ){
      asker.currentParams[paramKey] = paramValue;
    }
  };
  
  return {
    ParameterAsker: ParameterAsker
  };
  
})();