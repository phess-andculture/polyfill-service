/* eslint-env mocha, browser*/
/* global proclaim, it */

proclaim.arity = function (fn, expected) {
	proclaim.isFunction(fn);
	proclaim.strictEqual(fn.length, expected);
};
function name (fn, expected) {
	var functionsHaveNames = (function foo() { }).name === 'foo';
	if (functionsHaveNames) {
		proclaim.strictEqual(fn.name, expected);
	} else {
		proclaim.equal(Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1], expected);
	}
};
proclaim.nonEnumerable = function (obj, prop) {
	var arePropertyDescriptorsSupported = function () {
		var obj = {};
		try {
			Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
					/* eslint-disable no-unused-vars, no-restricted-syntax */
					for (var _ in obj) { return false; }
					/* eslint-enable no-unused-vars, no-restricted-syntax */
			return obj.x === obj;
		} catch (e) { // this is IE 8.
			return false;
		}
	};
	if (Object.defineProperty && arePropertyDescriptorsSupported()) {
		proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(obj[prop]));
	}
};
it('is a function', function () {
	proclaim.isFunction(String.prototype.padEnd);
});

it('has correct arity', function () {
	proclaim.arity(String.prototype.padEnd, 1);
});

it('has correct name', function() {
	name(String.prototype.padEnd, 'padEnd');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(String.prototype, 'padEnd');
});

it('works as expected', function () {
	proclaim.strictEqual('a'.padEnd(), 'a');
	proclaim.strictEqual('a'.padEnd(-1, 'a'), 'a');
	proclaim.strictEqual('a'.padEnd(0, 'a'), 'a');
	proclaim.strictEqual('a'.padEnd(1, 'a'), 'a');
	proclaim.strictEqual('a'.padEnd(2, 'bc'), 'ab');
	proclaim.strictEqual('a'.padEnd(5, ''), 'a');
	proclaim.strictEqual('a'.padEnd(5, 'a'), 'aaaaa');
	proclaim.strictEqual('a'.padEnd(5, 'bc'), 'abcbc');
	proclaim.strictEqual('a'.padEnd(5, 'bcdef'), 'abcde');
	proclaim.strictEqual('a'.padEnd(5, 5), 'a5555');
	proclaim.strictEqual('a'.padEnd(5, { nil: 0 }), 'a[obj');
	proclaim.strictEqual('a'.padEnd(5, [0, 1, 2]), 'a0,1,');
	proclaim.strictEqual('a'.padEnd(10, [0, "hello!", 2]), 'a0,hello!,');
	proclaim.strictEqual('a'.padEnd(10), 'a         ');

	var supportsStrictModeTests = (function () {
		'use strict';

		return this === undefined;
	}).call(undefined);

	if (supportsStrictModeTests) {
		proclaim.throws(function () {
			String.prototype.padEnd.call(null, 0);
		}, TypeError);
		proclaim.throws(function () {
			String.prototype.padEnd.call(void 8, 0);
		}, TypeError);
	}
});
