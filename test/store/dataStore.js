describe('DataStore test suite', function () {
	var expect = require('chai').expect;
	var sinon = require('sinon');
	
	var DataStore = require('../../store/dataStore');
	
	describe('sanity', function() {
		
		it('can be created', function () {
			expect(new DataStore).to.be.an.instanceof(DataStore);
		});
	});
	
	describe('providers', function () {
		
		it('providers can be installed', function () {
			var ds = new DataStore;
			var installer = ds.installer();
			installer.installProvider({});
			expect(ds._providers).to.have.length(1);
		});
		
		it('can request data from provider', function () {
			var ds = new DataStore;
			var installer = ds.installer();
			var stubProvider = {
				handleQuery: sinon.stub(),
				decorateData: sinon.stub()
			};
			installer.installProvider(stubProvider);
			ds.query({});
			expect(stubProvider.handleQuery.calledOnce).to.equal(true);
			expect(stubProvider.decorateData.calledOnce).to.equal(false);
		});
		
	});
	
});