var request = require('request');
var zlib = require('zlib');

module.exports = {
  request: function( options, cb ){
    request( options, function response (error, res) {
    if (error) {
      cb(error);
    }else {
      zlib.unzip(res.body, function( err, unzipped ){
        try{
          cb( err, unzipped.toString() ) ;
        }catch(e){
          console.log('Error: ', e );
        }
      });
    }
  });
  }
}