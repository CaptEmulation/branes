



var Provider = module.exports = function (options) {
	this.options = options;
};


Provider.prototype = Object.create({
	/**
	 * Check the query object to determine if a network request is required.  Return a promise which is resolved with the
	 * backing data
	 * 
	 * @returns {Promise}
	 */
	handleQuery: function (/*query*/) {
		
	},
	
	/**
	 * Decorate the data with whatever is needed from the original query and the response from the handleQuery promise 
	 */
	decorateData: function (/*data, query, response*/) {
		
	}
});