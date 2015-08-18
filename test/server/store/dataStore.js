describe('DataStore test suite', function () {
	var expect = require('chai').expect;
	var sinon = require('sinon');
	
	var DataStore = require('../../../server/store/dataStore');
	
	describe('sanity', function() {
		
		it('can be created', function () {
			expect(new DataStore).to.be.an.instanceof(DataStore);
		});
	});
	
	describe('providers', function () {
		
		it('providers can be installed', function () {
			var ds = new DataStore;
			var installer = ds.installer();
			installer.addProvider({});
			expect(ds._providers).to.have.length(1);
		});
		
		it('can request data from provider', function () {
			var ds = new DataStore;
			var installer = ds.installer();
			var stubProvider = {
				handleQuery: sinon.stub(),
				decorateData: sinon.stub()
			};
			installer.addProvider(stubProvider);
			ds.query({});
			expect(stubProvider.handleQuery.calledOnce).to.equal(true);
			expect(stubProvider.decorateData.calledOnce).to.equal(false);
		});
		
	});
	
	describe('install and get data', function () {
		
		
		var ds;
		var Provider = require('../../../server/store/delegateProvider');
		
		beforeEach(function () {
			ds = new DataStore;
			var installer = ds.installer();
			installer.addProvider(Provider.delegate({
//				willDecorate: function (context) {
//					
//				},
//				handlePromise: function (context) {
//					
//				},
//				decorate: function (context) {
//					
//				}
			}));
		});
	});
	
});