var config = require('./config');
var mongoose = require('mongoose');

exports.init = function (app) {
  var logger = app.logger;
  app.db = mongoose.connect(config.mongodb.uri, {server:{auto_reconnect:true}});
  
  mongoose.connection.once('open', function () {
    logger.info('Mongoose connected at ' + config.mongodb.uri);
    require('./routes').init(app);
  });
  
}