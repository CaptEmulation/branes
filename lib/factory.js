var _ = require('lodash');
_.mixin(require('lodash-deep'));

var findParent = function (object, path, callback) {
	var parent = object;
	var key = path;
		var keys = path.split('.');
	if (keys.length > 1) {
		for (var i = 0, length = keys.length - 1; i < length; i++) {
			parent = parent[keys[i]] || (parent[keys[i]] = {});
			key = keys[i + 1];
		}	
	}
	callback(parent, key);
};

// Tracks dependency loading to trap circular dependencies
var modulesBeingLoaded = [];

/**
 * Export both a function to define new modules as well as the factory registry itself.
 * 
 * @usage:
 *   require('factory')('module', function (factory) {
 *     
 *     return {
 *       foo: function () { return factory.bar; } // bar is loaded lazily
 *     };
 *   })
 */
var app = module.exports = function (path, module) {
	if (path && module) {
		// First see if module exists
		var candidate = _.deepGet(app, path);
		if ((_.isNull(candidate) && _.isUndefined(candidate))) {
			throw new Error('Module ' + path + ' already exists');
		}
	
		
		findParent(app, path, function (factory, key) {
			// This closure contains private vars for factory registration
			var instance;
			
			Object.defineProperty(factory, key, {
				get: function () {
					// Circular Dependency check
					if (modulesBeingLoaded.indexOf(path) !== -1) {
						throw new Error('Circular dependency.  ' + path + ' is still being loaded');
					}
					if (!instance) {
						// Mark path as being loaded
						modulesBeingLoaded.push(path);
						// Load module
						instance = module(app);
						// Done loading, remove path
						modulesBeingLoaded.splice(modulesBeingLoaded.indexOf(path), 1);
					}
					
					return instance;
				},
				enumerable: true,
				configurable: true
			});
			
		});
	}
		
	var dsl = {
	// Return helper methods
		reset: function () {
			for (var key in app) {
				delete app[key];
			}
		}
	};
		
	return dsl;
};