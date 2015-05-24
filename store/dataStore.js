//var _ = require('lodash');
//var bluebird = require('bluebird');


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
			installProvider: function (provider) {
				selfie._providers.push(provider);
			}
		};
		return installer;
	},
	
	query: function (query) {
		var providers = this._providers;
		var queries = providers.map(function (provider) {
			return provider.handleQuery(query);
		});
		
		var data;
		console.log(queries);
		queries.forEach(function (queryPromise, index) {
			if (queryPromise) {
				queryPromise.then(function (response) {
					providers[index].decorateData(data, query, response);
				});
			}
		});
	}
};