
var _ = require('lodash');
var Q = require('q');

var MultiProvider = module.exports = function () {
	this._delegates = [];
};

MultiProvider.prototype = Object.create(null);
_(MultiProvider.prototype).extend({
	handleQuery: function (context) {
		var activeDelegates = [];
		this._delegates.forEach(function (delegate) {
			if (delegate.willDecorate(context)) {
				activeDelegates.push(delegate);
			}
		});
		
		var dataPromises = [];
		activeDelegates.forEach(function (delegate) {
			dataPromises.push(delegate.promiseData(context));
		});
		context._activeDelegates = activeDelegates;
		
		return Q.all(dataPromises);
	},
	decorate: function (context) {
		context._activeDelegates.forEach(function (delegate) {
			delegate.decoarte(context);
		});
	}
});