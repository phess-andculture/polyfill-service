/* eslint-env mocha, browser*/
/* global proclaim, it */

it('is a function', function () {
	proclaim.isFunction(Math.log2);
});

it('has correct argument length', function () {
	proclaim.strictEqual(Math.log2.length, 1);
});

it('has correct name', function() {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(Math.log2.name, 'log2');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(Math.log2), 'log2');
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
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Math.log2));
});

it('works as expected when called with no arguments', function () {
	proclaim.isTrue(isNaN(Math.log2()));
});

it('works as expected when called with undefined', function () {
	proclaim.isTrue(isNaN(Math.log2(undefined)));
});

it('works as expected when called with string arguments', function () {
	proclaim.strictEqual(Math.log2(''), Math.log2(0));
});

it('works as expected when called with Infinity', function () {
	proclaim.strictEqual(Math.log2(Infinity), Infinity);
});

it('works as expected when called with NaN', function () {
	proclaim.isTrue(isNaN(Math.log2(NaN)));
});

it('works as expected when called with 0', function () {
	proclaim.strictEqual(Math.log2(0), -Infinity);
});

it('works as expected when called with -0', function () {
	proclaim.strictEqual(Math.log2(-0), -Infinity);
});

it('works as expected when called with positive integers', function () {
	proclaim.strictEqual(Math.log2(1), 0);
	proclaim.strictEqual(Math.log2(5), 2.321928094887362);
	proclaim.strictEqual(Math.log2(50), 5.643856189774724);
	proclaim.strictEqual(Math.log2(1000), 9.965784284662087);
});

it('works as expected when called with positive real numbers', function () {
	proclaim.strictEqual(Math.log2(0.5), -1);
});

it('works as expected when called with negative integers', function () {
	proclaim.isTrue(isNaN(Math.log2(-1)));
});

it('works as expected when called with negative real numbers', function () {
	proclaim.isTrue(isNaN(Math.log2(-1.5)));
});
