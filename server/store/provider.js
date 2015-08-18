
/**
 * Provider
 * 
 * A provider understands queries, can retrieve data from the store, or from a remote service as well as deocorating the final
 * reponse object
 */

 /**
  * Context
  * @typedef {Object} ProviderContext
  * @property {DataStore} store
  * @property {Query} query
  * @property {Object} data
  * @property {Object} storeData
  */


var Provider = module.exports = function (delegate) {
	this.delegate = delegate;
};


Provider.prototype = Object.create({
	/**
	 * Check the query object to determine if a network request is required.  Return a promise which is resolved with the
	 * backing data
	 * 
	 * @returns {Promise}
	 */
	handleQuery: function (context) {
		if (this.delegate.willDecorate(context)) {
			return this.delegate.promiseData(context);
		}
	},
	
	/**
	 * Decorate the data with whatever is needed from the original query and the response from the handleQuery promise 
	 */
	decorate: function (context) {
		return this.delegate.decorate(context);
	}
});



/**
 * ProviderV1 Delegate Interface
 * 
 * @typedef {Object} ProviderDelegate
 * @property {function} willDecorate  
 * @property {function} promiseData 
 * @property (function) decorate
 */
var Schema = require('./schema');
var ProviderDelegateClass = require('./delegateBuilder')({
	"willDecorate": Schema.FUNCTION,
	"promiseData": Schema.FUNCTION,
	"decorate": Schema.FUNCTION
});

ProviderDelegateClass.prototype.getProvider = function () {
	return new Provider(this);
};


Provider.delegate = function (options) {
	return new ProviderDelegateClass(options);
};