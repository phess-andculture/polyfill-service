/* eslint-env mocha, browser*/
/* global proclaim, it */

it('is a function', function () {
	proclaim.isFunction(Math.trunc);
});

it('has correct argument length', function () {
	proclaim.strictEqual(Math.trunc.length, 1);
});

it('has correct name', function() {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(Math.trunc.name, 'trunc');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(Math.trunc), 'trunc');
	}
});

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
var ifSupportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported() ? it : xit;

ifSupportsDescriptors('property is not enumerable', function () {
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Math.trunc));
});

it('works as expected when called with no arguments', function () {
	proclaim.isTrue(isNaN(Math.trunc()));
});

it('works as expected when called with undefined', function () {
	proclaim.isTrue(isNaN(Math.trunc(undefined)));
});

it('works as expected when called with Infinity', function () {
	proclaim.strictEqual(Math.trunc(Infinity), Infinity);
});

it('works as expected when called with -Infinity', function () {
	proclaim.strictEqual(Math.trunc(-Infinity), -Infinity);
});

it('works as expected when called with NaN', function () {
	proclaim.isTrue(isNaN(Math.trunc(NaN)));
});

it('works as expected when called with 0', function () {
	proclaim.strictEqual(Math.trunc(0), 0);
});

it('works as expected when called with -0', function () {
	proclaim.strictEqual(Math.trunc(-0), -0);
});

it('works as expected when called with positive integers', function () {
	proclaim.strictEqual(Math.trunc(1), 1);
});

it('works as expected when called with positive real numbers', function () {
	proclaim.strictEqual(Math.trunc(0.5), 0);
});

it('works as expected when called with negative integers', function () {
	proclaim.strictEqual(Math.trunc(-1), -1);
});

it('works as expected when called with negative real numbers', function () {
	proclaim.strictEqual(Math.trunc(-0.5), -0);
	proclaim.strictEqual(Math.trunc(-2e-17), -0);
});
