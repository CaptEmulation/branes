describe('Factory test suite', function () {
	var expect = require('chai').expect;
	var sinon = require('sinon');
	
	var factory = require('../../lib/factory');
	
	afterEach(function () {
		factory().reset();
	});
	
	it('install and load it', function () {
		factory('foo', function (factory) {
			return 'foo';
		});
		expect(factory.foo).to.equal('foo');
	});
	
	it('multiple installations', function () {
		factory('foo', function (factory) {
			return 'foo';
		});
		factory('bar', function (factory) {
			return 'bar';
		});
		expect(factory.foo).to.equal('foo');
		expect(factory.bar).to.equal('bar');
	});
	
	it('dependent installations', function () {
		factory('foo', function (factory) {
			return 'foo' + factory.bar;
		});
		factory('bar', function (factory) {
			return 'bar';
		});
		expect(factory.foo).to.equal('foobar');
	});
	
	it('deep installations', function () {
		factory('meta.foo', function (factory) {
			return 'foo' + factory.obo.bar;
		});
		factory('obo.bar', function (factory) {
			return 'bar';
		});
		expect(factory.meta.foo).to.equal('foobar');
	});
	
	
	it('circular dependency', function () {
		factory('a', function (factory) {
			return 'a' + factory.b;
		});
		factory('b', function (factory) {
			return 'b' + factory.c;
		});
		factory('c', function (factory) {
			return 'c' + factory.a;
		});
		
		expect(function () {
			return factory.a;
		}).to.throw('Circular dependency');
	});
	
});