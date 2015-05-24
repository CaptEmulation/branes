describe('DataStore test suite', function () {
	var expect = require('chai').expect;
	var sinon = require('sinon');
	
	var _ = require('lodash');
	var Promise = require('bluebird');
	
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
		
		describe('Simplest Provider', function () {
			
			var TestProvider = function (backingData) {
				this._backingData = backingData;
			};
			
			TestProvider.prototype = Object.create(Object.prototype);
			_(TestProvider.prototype).extend({
				handleQuery: function (/*query*/) {
					var selfie = this;
					return new Promise(function (resolve /*, reject*/) {
						resolve(selfie._backingData);
					});
				},
				decorateData: function (data/*, query*/, request) {
					_(data).extend(request);
				}
			});
				
			it('install', function () {
				var ds = new DataStore;
				var testProvider = new TestProvider({});
				ds.installer().installProvider(testProvider);
				expect(ds._providers).to.have.length(1);
			});
			
		});
	});
	
});