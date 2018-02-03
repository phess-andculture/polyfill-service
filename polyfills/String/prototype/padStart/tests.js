/* eslint-env mocha, browser*/
/* global proclaim, it */

proclaim.arity = function (fn, expected) {
	proclaim.isFunction(fn);
	proclaim.strictEqual(fn.length, expected);
};
proclaim.name = function (fn, expected) {
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
	proclaim.isFunction(String.prototype.padStart);
});

it('has correct arity', function () {
	proclaim.arity(String.prototype.padStart.length, 1);
});

it('has correct name', function() {
	proclaim.name(String.prototype.padStart.name, 'padStart');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(String.prototype, 'padStart');
});

it('works as expected', function () {
	proclaim.strictEqual('a'.padStart(), 'a');
	proclaim.strictEqual('a'.padStart(-1, 'a'), 'a');
	proclaim.strictEqual('a'.padStart(0, 'a'), 'a');
	proclaim.strictEqual('a'.padStart(1, 'a'), 'a');
	proclaim.strictEqual('a'.padStart(5, ''), 'a');
	proclaim.strictEqual('a'.padStart(5, 'a'), 'aaaaa');
	proclaim.strictEqual('a'.padStart(5, 'bc'), 'bcbca');
	proclaim.strictEqual('a'.padStart(5, 'bcdef'), 'bcdea');
	proclaim.strictEqual('a'.padStart(5, 5), '5555a');
	proclaim.strictEqual('a'.padStart(5, { nil: 0 }), '[obja'); // String(x:Object) = [object Object]
	proclaim.strictEqual('a'.padStart(5, [0, 1, 2]), '0,1,a'); // String(x:Array)  = x.toString()
	proclaim.strictEqual('a'.padStart(10, [0, "hello!", 2]), '0,hello!,a');
	proclaim.strictEqual('a'.padStart(10), '         a');

	var supportsStrictModeTests = (function () {
		'use strict';

		return this === undefined;
	}).call(undefined);

	if (supportsStrictModeTests) {
		proclaim.throws(function(){
			String.prototype.padStart.call(null, 0);
		}, TypeError);
		proclaim.throws(function(){
			String.prototype.padStart.call(void 8, 0);
		}, TypeError);
	}
});
