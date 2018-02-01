/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Object.setPrototypeOf);
});

it('has correct argument length', function () {
	proclaim.strictEqual(Object.setPrototypeOf.length, 2);
});

it('has correct name', function () {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(Object.setPrototypeOf.name, 'setPrototypeOf');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(Object.setPrototypeOf), 'setPrototypeOf');
	}
});

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', {
			enumerable: false,
			value: obj
		});
		/* eslint-disable no-unused-vars, no-restricted-syntax */
		for (var _ in obj) {
			return false;
		}
		/* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { // this is IE 8.
		return false;
	}
};
var ifSupportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported() ? it : xit;

ifSupportsDescriptors('property is not enumerable', function () {
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Object.setPrototypeOf));
});

it('changes prototype to null objects', function() {
	var obj = {a: 123};
	proclaim.equal(obj instanceof Object, true);
	// sham requires assignment to work cross browser
	obj = Object.setPrototypeOf(obj, null);
	proclaim.equal(obj instanceof Object, false);
	proclaim.equal(obj.a, 123);
});

it('changes prototype to regular simple objects', function() {
	var obj = Object.create(null);
	obj.a = 456;
	proclaim.equal(obj instanceof Object, false);
	proclaim.equal(obj.a, 456);
	// sham requires assignment to work cross browser
	obj = Object.setPrototypeOf(obj, {});
	proclaim.equal(obj instanceof Object, true);
	proclaim.equal(obj.a, 456);
});

// Our polyfill requires reassignment of the same object, meaning external, non own objects, might not be upgraded if the engine was not compatible.
// https://github.com/paulmillr/es6-shim/pull/281#issue-39995975
it.skip('changes prototype to regular complex objects, with mutation', function() {
	var Child = function () {};
	var Parent = {a: 123};
	var child = new Child();
	Object.setPrototypeOf(child, Parent);
	proclaim.equal(child.a, 123);
});


it('changes prototype to regular complex objects, with return', function() {
	var Child = function () {};
	var Parent = {a: 123};
	var child = new Child();
	child = Object.setPrototypeOf(child, Parent);
	proclaim.equal(child.a, 123);
});
