
var _ = require('lodash');
var Q = require('q');

var MultiProvider = module.exports = function () {
	this._delegates = [];
};

MultiProvider.prototype = Object.create(null);
_(MultiProvider.prototype).extend({
	handleQuery: function (context) {
		context._activeDelegates = [];

		this._delegates.forEach(function (delegate) {
			if (delegate.willDecorate(context)) {
				context._activeDelegates.push(delegate.promiseData(context));
			}
		});
		
		return Q.all(context._activeDelegates);
	},
	decorate: function (context) {
		context._activeDelegates.forEach(function (delegate) {
			delegate.decoarte(context);
		});
	}
});