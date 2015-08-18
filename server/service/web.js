
var Q = require('q');
var Options = require('../utils/options');
var ES5Class = require('es5class');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var sprintf = require('sprintf').sprintf;
var mongoose = require('mongoose');

var WithSearchFields = ES5Class.$define('WithSearchField', {
  withSearchString: function (field, term) {
    if (!term) {
      term = field;
    }
    this.on('req', function (req, query) {
      query[term] = req.params[field];
    });
    this._route += sprintf("/:%s", field);
    return this;
  },
  withSearchNumber: function (field) {
    this.on('req', function (req, query) {
      query[field] = parseInt(req.params[field], 10);
    });
    this._route += sprintf("/:%s", field);
    return this;
  }
});

var ServiceDsl = ES5Class.$define('ServiceDsl', {
  construct: function (options) {
    options = Options.for(options);
    this._route = options.expect('route');
    this._name = options.expect('name');
    this.setProvider(options.default('name') || options.expect('provider'));
    this.setFind(options.default('find', 'find'));

  },
  model: function () {
    return this._provider(this._name);
  },
  route: function () {
    return this._route;
  },
  justOne: function () {
    this.setFind('findOne');
    return this;
  },
  setProvider: function (provider) {
    if (_.isString(provider)) {
      this._provider = function () {
        return mongoose.model(provider);
      };
    } else if (_.isFunction(provider)) {
      this._provider = provider;
    }
  },
  setFind: function (find) {
    if (_.isString(find)) {
      this._find = function (model, query) {
        return model[find].call(model, query).exec();
      };
    } else if (_.isFunction(find)) {
      this._find = find;
    }
  },
  installTo: function (app) {
    var operations = {
      find: function(req, res) {
        var query = {};
        this.emit('req', req, query);
        var model = this.model();
        return Q(this._find(model, query))
          .then(function (all) {
            res.json(all);
          })
          .fail(function (err) {
            res.send(err);
          })
          .finally(function () {
          });
      }.bind(this),
      create: function (req, res) {
        var data = req.body;
        var model = this.model();
				var defer = Q.defer();
				model.create(data, function (err, data) {
					if (err) {
						defer.reject(err);
					} else {
						defer.resolve(data);
					}
				});
				return defer.promise.then(function (all) {
            res.json(all);
          })
          .fail(function (err) {
            res.send(err);
          })
          .finally(function () {
          });
      }.bind(this),
      update: function (req, res) {
        operations.find(req, res)
          .then(function () {
            var model = this.model();
            _(model).extend(req.body);
            Q(model.save().exec())
              .then(function (resp) {
                res.json(model);
              })
              .fail(function (err) {
                res.send(err);
              })
              .finally(function () {
              });
          }.bind(this));
      }.bind(this)
    };
    var route = function (app, method, endpoint) {
      app.route(this.route())[method](endpoint);
    }.bind(this);
    
    route(app, 'get', operations.find);
    route(app, 'post', operations.create)
    route(app, 'put', operations.update);
    
    return this;
  }
})
  .$implement(EventEmitter)
  .$implement(WithSearchFields);

exports.service = function (options) {
  var dsl = ServiceDsl.$create(options);
  return dsl;
}
