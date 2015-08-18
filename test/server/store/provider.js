describe('Provider test suite', function () {
	
	var expect = require('chai').expect;
	var sinon = require('sinon');
	
	var _ = require('lodash');
	var Promise = require('bluebird');
	
	var Provider = require('../../../server/store/provider');
	var DataStore = require('../../../server/store/dataStore');
	
	describe('sanity test', function () {
		
		it('can be instantiated', function () {
			expect(new Provider).to.be.an.instanceof(Provider);
		});
		
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
			ds.installer().addProvider(testProvider);
			expect(ds._providers).to.have.length(1);
		});
		
	});
	
	describe('Default delegate provider', function () {
		var def;
		
		beforeEach(function () {
			def = {
				willDecorate: sinon.stub(),
				promiseData: sinon.stub(),
				decorate: sinon.stub()
			};
		});
		
		it('#handleQuery does not handle', function () {
			var p = Provider.delegate(def).getProvider();
			p.handleQuery();
			expect(def.willDecorate.calledOnce).to.equal(true);
			expect(def.promiseData.calledOnce).to.equal(false);
		});
		
		it('#handleQuery does handle', function () {
			var p = Provider.delegate(def).getProvider();
			def.willDecorate.returns(true);
			p.handleQuery();
			expect(def.willDecorate.calledOnce).to.equal(true);
			expect(def.promiseData.calledOnce).to.equal(true);
		});
		
		it('#decorate', function () {
			var p = Provider.delegate(def).getProvider();
			p.decorate();
			expect(def.decorate.calledOnce).to.equal(true);
		});
	});
	
	describe('#delegate', function () {
		it('using the DSL builder', function () {
			var def = {
				willDecorate: sinon.stub(),
				promiseData: sinon.stub(),
				decorate: sinon.stub()
			};
			var dsl = Provider.delegate()
				.withWillDecorate(def.willDecorate)
				.withPromiseData(def.promiseData)
				.withDecorate(def.decorate);
			expect(dsl.willDecorate).to.be.a('function').and.equal(def.willDecorate);
			expect(dsl.promiseData).to.be.a('function').and.equal(def.promiseData);
			expect(dsl.decorate).to.be.a('function').and.equal(def.decorate);
		});
		
		it('using the constructor', function () {
			var def = {
				willDecorate: sinon.stub(),
				promiseData: sinon.stub(),
				decorate: sinon.stub()
			};
			var dsl = Provider.delegate(def);
			expect(dsl.willDecorate, 'willDecorate').to.be.a('function').and.equal(def.willDecorate);
			expect(dsl.promiseData, 'promiseData').to.be.a('function').and.equal(def.promiseData);
			expect(dsl.decorate, 'decorate').to.be.a('function').and.equal(def.decorate);
		});
		
		it('has an export', function () {
			expect(Provider.delegate()).to.be.not.equal(undefined);
		});
	});

	
});