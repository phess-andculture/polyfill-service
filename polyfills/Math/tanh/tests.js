/* eslint-env mocha, browser*/
/* global proclaim, it */

it('is a function', function () {
	proclaim.isFunction(Math.tanh);
});

it('has correct argument length', function () {
	proclaim.strictEqual(Math.tanh.length, 1);
});

it('has correct name', function() {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(Math.tanh.name, 'tanh');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(Math.tanh), 'tanh');
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
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Math.tanh));
});

it('works as expected when called with no arguments', function () {
	proclaim.isTrue(isNaN(Math.tanh()));
});

it('works as expected when called with undefined', function () {
	proclaim.isTrue(isNaN(Math.tanh(undefined)));
});

it('works as expected when called with Infinity', function () {
	proclaim.strictEqual(Math.tanh(Infinity), 1);
});

it('works as expected when called with -Infinity', function () {
	proclaim.strictEqual(Math.tanh(-Infinity), -1);
});

it('works as expected when called with NaN', function () {
	proclaim.isTrue(isNaN(Math.tanh(NaN)));
});

it('works as expected when called with 0', function () {
	proclaim.strictEqual(Math.tanh(0), 0);
});

it('works as expected when called with -0', function () {
	proclaim.strictEqual(Math.tanh(-0), -0);
});

it('works as expected when called with positive integers', function () {
	proclaim.strictEqual(Math.tanh(1), 0.7615941559557649);
	proclaim.strictEqual(Math.tanh(90), 1);

	// TODO: See if we can make this work.
	// assert.strictEqual(Math.tanh(710), 1);
});

it('works as expected when called with positive real numbers', function () {
	proclaim.strictEqual(Math.tanh(0.5), 0.46211715726000974);
});

it('works as expected when called with negative integers', function () {
	proclaim.strictEqual(Math.tanh(-1), -0.7615941559557649);
	proclaim.strictEqual(Math.tanh(-90), -1);
});

it('works as expected when called with negative real numbers', function () {
	proclaim.strictEqual(Math.tanh(-0.5), -0.46211715726000974);
	// TODO: Make polyfill pass this test
	// proclaim.strictEqual(Math.tanh(-2e-17), -2e-17);
});
