describe('MultiProvider test stuite', function () {
	
	var expect = require('chai').expect;
	//var sinon = require('sinon');
	
	var MultiProvider = require('../../../server/store/multiProvider');
	
	describe('sanity', function () {
	
		it('can be instantiated', function () {
			expect(new MultiProvider).to.not.equal(undefined);		
		});
	});
});