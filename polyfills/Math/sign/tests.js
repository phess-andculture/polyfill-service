/* eslint-env mocha, browser*/
/* global proclaim, it */

it('is a function', function () {
	proclaim.isFunction(Math.sign);
});

it('has correct argument length', function () {
	proclaim.strictEqual(Math.sign.length, 1);
});

it('has correct name', function() {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(Math.sign.name, 'sign');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(Math.sign), 'sign');
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
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Math.sign));
});

it('works as expected when called with no arguments', function () {
	proclaim.strictEqual(Math.sign(), NaN);
});

it('works as expected when called with undefined', function () {
	proclaim.isTrue(isNaN(Math.sign(undefined)));
});

it('works as expected when called with Infinity', function () {
	proclaim.strictEqual(Math.sign(Infinity), 1);
});

it('works as expected when called with -Infinity', function () {
	proclaim.strictEqual(Math.sign(-Infinity), -1);
});

it('works as expected when called with NaN', function () {
	proclaim.isTrue(isNaN(Math.sign(NaN)));
});

it('works as expected when called with 0', function () {
	proclaim.strictEqual(Math.sign(0), 0);
});

it('works as expected when called with -0', function () {
	proclaim.strictEqual(Math.sign(-0), -0);
});

it('works as expected when called with positive integers', function () {
	proclaim.strictEqual(Math.sign(1), 1);
});

it('works as expected when called with positive real numbers', function () {
	proclaim.strictEqual(Math.sign(0.5), 1);
});

it('works as expected when called with negative integers', function () {
	proclaim.strictEqual(Math.sign(-1), -1);
});

it('works as expected when called with negative real numbers', function () {
	proclaim.strictEqual(Math.sign(-0.5), -1);
});
