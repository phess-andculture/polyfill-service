/* eslint-env mocha, browser*/
/* global proclaim, it */

it('is a function', function () {
	proclaim.isFunction(Math.sinh);
});

it('has correct argument length', function () {
	proclaim.strictEqual(Math.sinh.length, 1);
});

it('has correct name', function() {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(Math.sinh.name, 'sinh');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(Math.sinh), 'sinh');
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
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Math.sinh));
});

it('works as expected when called with no arguments', function () {
	proclaim.isTrue(isNaN(Math.sinh()));
});

it('works as expected when called with undefined', function () {
	proclaim.isTrue(isNaN(Math.sinh(undefined)));
});

it('works as expected when called with Infinity', function () {
	proclaim.strictEqual(Math.sinh(Infinity), Infinity);
});

it('works as expected when called with -Infinity', function () {
	proclaim.strictEqual(Math.sinh(-Infinity), -Infinity);
});

it('works as expected when called with NaN', function () {
	proclaim.isTrue(isNaN(Math.sinh(NaN)));
});

it('works as expected when called with 0', function () {
	proclaim.strictEqual(Math.sinh(0), 0);
});

it('works as expected when called with -0', function () {
	proclaim.strictEqual(Math.sinh(-0), -0);
});

it('works as expected when called with positive integers', function () {
	proclaim.strictEqual(Math.sinh(1), 1.1752011936438014);
});

it('works as expected when called with positive real numbers', function () {
	proclaim.strictEqual(Math.sinh(0.5), 0.5210953054937474);
});

it('works as expected when called with negative integers', function () {
	proclaim.strictEqual(Math.sinh(-1), -1.1752011936438014);
});

it('works as expected when called with negative real numbers', function () {
	proclaim.strictEqual(Math.sinh(-0.5), -0.5210953054937474);
	proclaim.strictEqual(Math.sinh(-2e-17), -2e-17);
});
