/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(String.prototype.startsWith);
});

it('has correct argument length', function () {
	proclaim.strictEqual(String.prototype.startsWith.length, 1);
});

it('has correct name', function () {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(String.prototype.startsWith.name, 'startsWith');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(String.prototype.startsWith), 'startsWith');
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
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(String.prototype.startsWith));
});

it('works as expected', function () {
	proclaim.ok('undefined'.startsWith());
	proclaim.ok(!'undefined'.startsWith(null));
	proclaim.ok('abc'.startsWith(''));
	proclaim.ok('abc'.startsWith('a'));
	proclaim.ok('abc'.startsWith('ab'));
	proclaim.ok(!'abc'.startsWith('bc'));
	proclaim.ok('abc'.startsWith('', NaN));
	proclaim.ok('abc'.startsWith('a', -1));
	proclaim.ok(!'abc'.startsWith('a', 1));
	proclaim.ok(!'abc'.startsWith('a', Infinity));
	proclaim.ok('abc'.startsWith('b', true));
	proclaim.ok('abc'.startsWith('a', 'x'));
	var supportsStrictModeTests = (function () {
		'use strict';

		return this === undefined;
	}).call(undefined);

	if (supportsStrictModeTests) {
		proclaim.throws(function () {
			String.prototype.startsWith.call(null, '.');
		}, TypeError);
		proclaim.throws(function () {
			String.prototype.startsWith.call(undefined, '.');
		}, TypeError);
	}
	proclaim.throws(function(){
		'/./'.startsWith(/./);
	}, TypeError);
	proclaim.ok((function(){
		try {
			return '[object Object]'.startsWith({});
		} catch (e) {
			return false;
		}
	}()));
});
