var _ = require('lodash');
var Q = require('q');

var DataStore = module.exports = function () {
	this._providers = [];	
};



DataStore.prototype = {
	/**
	 * Returns an installer helper object for creating data providers
	 */
	installer: function () {
		var selfie = this;
		var installer = {
			addProvider: function (provider) {
				selfie._providers.push(provider);
			}
		};
		return installer;
	},
	
	query: function (query) {
		var context = {
			query: query,
			data: {}
		};
		var providers = this._providers;
		var queries = providers.map(function (provider) {
			return provider.handleQuery(context);
		});
		
		queries.forEach(function (queryPromise, index) {
			if (queryPromise) {
				queryPromise.then(function (response) {
					providers[index].decorate(_.extend(context, {
						response: response
					}));
				});
			}
		});
		
		return Q.all(queries).then(function () {
			return context.data;
		});
	}
};