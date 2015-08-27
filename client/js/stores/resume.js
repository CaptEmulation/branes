


var resume = require('../actions/resume');
var config = require('../config');
var Reflux = require('reflux');
var http = require('http');
var extend = require('lodash/object/extend');
var resumeFixture = require('../../../server/models/defaults');


var store = module.exports = Reflux.createStore({
   listenables: [ resume ],
   init: function () {
      this.store = {};
   },
   onLoad: function () {
      this.trigger(resumeFixture);
      // http.get({
      //    path: config.service.resume.path
      // }, function (res) {
      //    var data = '';

      //    res.on('data', function (buf) {
      //       data += buf;
      //    });

      //    res.on('end', function () {
      //       data = JSON.parse(data);
      //       extend(this.store, data);
      //       this.trigger(this.store);
      //    }.bind(this));

      //    res.on('error', function (err) {
      //       resume.load.failed(err);
      //    }.bind(this));
      // }.bind(this));
   },

});


