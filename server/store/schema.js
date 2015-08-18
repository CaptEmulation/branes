// InterfaceDefinition

var _ = require('lodash');

module.exports = {
	'FUNCTION': {
		check: _.isFunction,
		name: 'function',
		safe: function () { 
			return function () {};
		}
	},
	'OBJECT': {
		check: _.isObject,
		name: 'object',
		safe: function () { 
			return {}; 
		}
	}
};