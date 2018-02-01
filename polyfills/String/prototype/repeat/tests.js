/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(String.prototype.repeat);
});

it('has correct argument length', function () {
	proclaim.strictEqual(String.prototype.repeat.length, 1);
});

it('has correct name', function () {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(String.prototype.repeat.name, 'repeat');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(String.prototype.repeat), 'repeat');
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
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(String.prototype.repeat));
});

// excellent tests provided by https://github.com/mathiasbynens/String.prototype.repeat

it('works with strings', function () {
	proclaim.equal('abc'.repeat(), '');
	proclaim.equal('abc'.repeat(undefined), '');
	proclaim.equal('abc'.repeat(null), '');
	proclaim.equal('abc'.repeat(false), '');
	proclaim.equal('abc'.repeat(NaN), '');
	proclaim.equal('abc'.repeat('abc'), '');
	proclaim.equal('abc'.repeat(-0), '');
	proclaim.equal('abc'.repeat(+0), '');
	proclaim.equal('abc'.repeat(1), 'abc');
	proclaim.equal('abc'.repeat(2), 'abcabc');
	proclaim.equal('abc'.repeat(3), 'abcabcabc');
	proclaim.equal('abc'.repeat(4), 'abcabcabcabc');
});

it('throws invalid counts', function () {
	proclaim.throws(function () {
		'abc'.repeat(-Infinity);
	}, RangeError);

	proclaim.throws(function () {
		'abc'.repeat(-1);
	}, RangeError);

	proclaim.throws(function() {
		'abc'.repeat(+Infinity);
	}, RangeError);
});

it('works with coercible objects', function () {
	proclaim.equal(String.prototype.repeat.call(42, 4), '42424242');

	proclaim.equal(String.prototype.repeat.call({
		toString: function () {
			return 'abc';
		}
	}, 2), 'abcabc');

	proclaim.equal(String.prototype.repeat.apply(42, [4]), '42424242');

	proclaim.equal(String.prototype.repeat.apply({
		toString: function () {
			return 'abc';
		}
	}, [2]), 'abcabc');
});

var supportsStrictModeTests = (function () {
	'use strict';

	return this === undefined;
}).call(undefined);

if (supportsStrictModeTests) {
	it('throws incoercible objects', function () {
		proclaim.throws(function () {
			String.prototype.repeat.call(undefined);
		});

		proclaim.throws(function () {
			String.prototype.repeat.call(undefined, 4);
		});

		proclaim.throws(function () {
			String.prototype.repeat.call(null);
		});

		proclaim.throws(function () {
			String.prototype.repeat.call(null, 4);
		});

		proclaim.throws(function () {
			String.prototype.repeat.apply(undefined);
		});

		proclaim.throws(function () {
			String.prototype.repeat.apply(undefined, [4]);
		});

		proclaim.throws(function () {
			String.prototype.repeat.apply(null);
		});

		proclaim.throws(function () {
			String.prototype.repeat.apply(null, [4]);
		});
	});
}
