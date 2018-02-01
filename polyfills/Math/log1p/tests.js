/* eslint-env mocha, browser*/
/* global proclaim, it */

it('is a function', function () {
	proclaim.isFunction(Math.log1p);
});

it('has correct argument length', function () {
	proclaim.strictEqual(Math.log1p.length, 1);
});

it('has correct name', function() {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(Math.log1p.name, 'log1p');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(Math.log1p), 'log1p');
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
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Math.log1p));
});

it('works as expected when called with no arguments', function () {
	proclaim.isTrue(isNaN(Math.log1p()));
});

it('works as expected when called with undefined', function () {
	proclaim.isTrue(isNaN(Math.log1p(undefined)));
});

it('works as expected when called with string arguments', function () {
	proclaim.strictEqual(Math.log1p(''), Math.log1p(0));
});

it('works as expected when called with Infinity', function () {
	proclaim.strictEqual(Math.log1p(Infinity), Infinity);
});

it('works as expected when called with NaN', function () {
	proclaim.isTrue(isNaN(Math.log1p(NaN)));
});

it('works as expected when called with 0', function () {
	proclaim.strictEqual(Math.log1p(0), 0);
});

it('works as expected when called with -0', function () {
	proclaim.strictEqual(Math.log1p(-0), -0);
});

it('works as expected when called with positive integers', function () {
	proclaim.strictEqual(Math.log1p(1), 0.6931471805599453);
	proclaim.strictEqual(Math.log1p(5), 1.791759469228055);
	proclaim.strictEqual(Math.log1p(50), 3.9318256327243257);
	proclaim.strictEqual(Math.log1p(1000), 6.90875477931522);
});

it('works as expected when called with positive real numbers', function () {
	proclaim.strictEqual(Math.log1p(0.5), 0.4054651081081644);
	proclaim.strictEqual(Math.log1p(1.5), 0.9162907318741551);
});

it('works as expected when called with negative integers', function () {
	proclaim.strictEqual(Math.log1p(-1), -Infinity);
	proclaim.isTrue(isNaN(Math.log1p(-2)));
});

it('works as expected when called with negative real numbers', function () {
	proclaim.strictEqual(Math.log1p(-0.5), -0.6931471805599453);
	proclaim.isTrue(isNaN(Math.log1p(-1.5)));
	// TODO: Make polyfill pass this test
	// proclaim.strictEqual(Math.log1p(-0.1), -0.10536051565782631);
});

