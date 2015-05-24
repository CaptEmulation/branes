describe('Provider test suite', function () {
	
	var expect = require('chai').expect;
	
	var Provider = require('../../store/provider');
	
	describe('sanity test', function () {
		
		it('can be instantiated', function () {
			expect(new Provider).to.be.an.instanceof(Provider);
		});
	});
	
});