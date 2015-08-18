
var _ = require('lodash');
var sprintf = require('sprintf').sprintf;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = function (iDef) {
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
		}
	}, propertyDescriptor);
	
	return iDef.Class;
};

