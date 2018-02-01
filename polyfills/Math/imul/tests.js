/* eslint-env mocha, browser*/
/* global proclaim, it */

it('is a function', function () {
	proclaim.isFunction(Math.imul);
});

it('has correct argument length', function () {
	proclaim.strictEqual(Math.imul.length, 2);
});

it('has correct name', function() {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(Math.imul.name, 'imul');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(Math.imul), 'imul');
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
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Math.imul));
});

it('works as expected when called with no arguments', function () {
	proclaim.strictEqual(Math.imul(), 0);
});

it('works as expected when called with one argument', function () {
	proclaim.strictEqual(Math.imul(1), 0);
});

it('works as expected when called with undefined arguments', function () {
	proclaim.strictEqual(Math.imul(undefined, undefined), 0);
});

it('works as expected when called with undefined and a number', function () {
	proclaim.strictEqual(Math.imul(undefined, 1), 0);
	proclaim.strictEqual(Math.imul(1, undefined), 0);
});

it('works as expected when called with boolean arguments', function () {
	proclaim.strictEqual(Math.imul(false, 1), 0);
	proclaim.strictEqual(Math.imul(1, false), 0);
	proclaim.strictEqual(Math.imul(false, false), 0);
	proclaim.strictEqual(Math.imul(true, 1), 1);
	proclaim.strictEqual(Math.imul(1, true), 1);
	proclaim.strictEqual(Math.imul(true, true), 1);
});

it('works as expected when called with string arguments', function () {
	proclaim.strictEqual(Math.imul('str', 1), 0);
	proclaim.strictEqual(Math.imul(1, 'str'), 0);
});

it('works as expected when called with array arguments', function () {
	proclaim.strictEqual(Math.imul([], 1), 0);
	proclaim.strictEqual(Math.imul(1, []), 0);
});

it('works as expected when called with object arguments', function () {
	proclaim.strictEqual(Math.imul({}, 1), 0);
	proclaim.strictEqual(Math.imul(1, {}), 0);
});

it('works as expected when first argument is larger than 2^31', function () {
	proclaim.strictEqual(Math.imul(Math.pow(2, 32) - 1, 1), -1);
	proclaim.strictEqual(Math.imul(Math.pow(2, 32) - 2, 1), -2);
});

it('works as expected when called with positive integers', function () {
	proclaim.strictEqual(Math.imul(0, 0), 0);
	proclaim.strictEqual(Math.imul(2, 4), 8);
	proclaim.strictEqual(Math.imul(123, 456), 56088);
	proclaim.strictEqual(Math.imul(19088743, 4275878552), 602016552); // TODO: Make polyfill pass this test
});

it('works as expected when called with positive real numbers', function () {
	proclaim.strictEqual(Math.imul(0.1, 7), 0);
	proclaim.strictEqual(Math.imul(7, 0.1), 0);
	proclaim.strictEqual(Math.imul(0.9, 7), 0);
	proclaim.strictEqual(Math.imul(7, 0.9), 0);
	proclaim.strictEqual(Math.imul(1.1, 7), 7);
	proclaim.strictEqual(Math.imul(7, 1.1), 7);
	proclaim.strictEqual(Math.imul(1.9, 7), 7);
	proclaim.strictEqual(Math.imul(7, 1.9), 7);
});

it('works as expected when called with negative integers', function () {
	proclaim.strictEqual(Math.imul(-123, 456), -56088);
	proclaim.strictEqual(Math.imul(123, -456), -56088);
	proclaim.strictEqual(Math.imul(-1, 8), -8);
	proclaim.strictEqual(Math.imul(-2, -2), 4); // TODO: Make polyfill pass this test
	proclaim.strictEqual(Math.imul(-0, 7), 0);
	proclaim.strictEqual(Math.imul(7, -0), 0);
});

it('works as expected when called with negative real numbers', function () {
	proclaim.strictEqual(Math.imul(-0.1, 7), 0);
	proclaim.strictEqual(Math.imul(7, -0.1), 0);
	proclaim.strictEqual(Math.imul(-0.9, 7), 0);
	proclaim.strictEqual(Math.imul(7, -0.9), 0);
	proclaim.strictEqual(Math.imul(-1.1, 7), -7);
	proclaim.strictEqual(Math.imul(7, -1.1), -7);
	proclaim.strictEqual(Math.imul(-1.9, 7), -7);
	proclaim.strictEqual(Math.imul(7, -1.9), -7);
});
