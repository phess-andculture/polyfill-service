/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(String.prototype.trim);
});

it('has correct argument length', function () {
	proclaim.strictEqual(String.prototype.trim.length, 0);
});

it('has correct name', function () {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(String.prototype.trim.name, 'trim');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(String.prototype.trim), 'trim');
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
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(String.prototype.trim));
});

it('works as expected', function () {
	proclaim.strictEqual(' \n  q w e \n  '.trim(), 'q w e', 'removes whitespaces at left & right side of string');
	proclaim.strictEqual('\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'.trim(), '', 'removes all whitespaces');
	proclaim.strictEqual('\u200b\u0085'.trim(), '\u200b\u0085', "shouldn't remove this symbols");
	var supportsStrictModeTests = (function () {
		'use strict';

		return this === undefined;
	}).call(undefined);

	if (supportsStrictModeTests) {
		proclaim.throws(function () {
			String.prototype.trim.call(null, 0);
		}, TypeError);
		proclaim.throws(function () {
			String.prototype.trim.call(void 8, 0);
		}, TypeError);
	}
});

