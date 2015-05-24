var _ = require('lodash');
var sprintf = require('sprintf').sprintf;

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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var createClassFromInterface = function (iDef) {
	// Create the constructor
	iDef.Class = function (options) {
		this.extend(options);
	};
	
	// Map each field in the interface definition to a hidden prototype method for configuring it
	var propertyDescriptor = /** @type: PropertyDescriptorMap */Object.keys(iDef).reduce(function (prev, key) {
		// Generate "with" method name for setting values
		var setter = "with" + capitalizeFirstLetter(key);
		
		prev[setter] = {
			enumerable: false,
			value: function (input) {
				// Delegate interfaces include a type check
				//  TODO: Disable in production
				if (iDef[key].check(input)) {
					this[key] = input;
				} else {
					// TODO: Return more information here, including the type expected
					throw new ReferenceError(sprintf("Invalid type for %s", key));
				}
				
				
				return this;
			}
		};
		
		// Also add a default implementation on the prototype, to keep the interface safe
		// FIXME: fails unit tests?!
//		prev[key] = {
//			configurable: true,
//			enumerable: true,
//			get: iDef[key].safe
//		};
		
		return prev;
	}, {});
	
	// Create our prototype
	iDef.Class.prototype = Object.create({
		extend:	function (options) {
			var selfie = _.extend(this, options);
			return selfie;
		},
		getProvider: function () {
			return new Provider(this);
		}
	}, propertyDescriptor);
	
	return iDef.Class;
};

// InterfaceDefinition

var Schema = {
	'FUNCTION': {
		check: _.isFunction,
		name: 'function',
		safe: function () { return function () {};}
	},
	'OBJECT': {
		check: _.isObject,
		name: 'object',
		safe: function () { return {}; }
	}
};

/**
 * ProviderV1 Delegate Interface
 * 
 * @typedef {Object} ProviderDelegate
 * @property {function} willDecorate  
 * @property {function} promiseData 
 * @property (function) decorate
 */
 
 var ProviderDelegateClass = createClassFromInterface({
	"willDecorate": Schema.FUNCTION,
	"promiseData": Schema.FUNCTION,
	"decorate": Schema.FUNCTION
 });
 

Provider.delegate = function (options) {
	return new ProviderDelegateClass(options);
};