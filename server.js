
var express = require('express');
var winston = require('winston');
var app = express();

var logger = app.logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'debug'
    })
  ]
});

app.use(express.static('public'));

app.use(function (req, res, next) {
  logger.debug(req.path);
  next();
});

var port = process.env.PORT || 5000;
app.listen(port, function (err, connection) {
  if (err) throw err;
  logger.info('Up and running on ' + port);
  require('./server/db').init(app);
});
