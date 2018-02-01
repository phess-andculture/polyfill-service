/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Number.isSafeInteger);
});

it('has correct argument length', function () {
	proclaim.strictEqual(Number.isSafeInteger.length, 1);
});

it('has correct name', function () {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(Number.isSafeInteger.name, 'isSafeInteger');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(Number.isSafeInteger), 'isSafeInteger');
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
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Number.isSafeInteger));
});

it('returns false if argument is not a number literal', function () {
	proclaim.isFalse(Number.isSafeInteger("1"));
	proclaim.isFalse(Number.isSafeInteger([1]));
	proclaim.isFalse(Number.isSafeInteger(new Number(42)));
	proclaim.isFalse(Number.isSafeInteger(false));
	proclaim.isFalse(Number.isSafeInteger(true));
	proclaim.isFalse(Number.isSafeInteger(undefined));
	proclaim.isFalse(Number.isSafeInteger(null));
	proclaim.isFalse(Number.isSafeInteger());
});

it('returns false if argument is an Infinity', function () {
	proclaim.isFalse(Number.isSafeInteger(Infinity));
	proclaim.isFalse(Number.isSafeInteger(-Infinity));
});

it('returns false if argument is NaN', function () {
	proclaim.isFalse(Number.isSafeInteger(NaN));
});

it('returns false if argument is a number which is not an integer', function () {
	proclaim.isFalse(Number.isSafeInteger(1.1));
	proclaim.isFalse(Number.isSafeInteger(0.000001));
	proclaim.isFalse(Number.isSafeInteger(-0.000001));
	proclaim.isFalse(Number.isSafeInteger(11e-1));
});

it('returns false if argument is an unsafe integer', function () {
	proclaim.isFalse(Number.isSafeInteger(Math.pow(2, 53)));
	proclaim.isFalse(Number.isSafeInteger(-Math.pow(2, 53)));
});

it('returns true if argument is a safe integer', function () {
	proclaim.isTrue(Number.isSafeInteger(1), '1');
	proclaim.isTrue(Number.isSafeInteger(-1), '-1');
	proclaim.isTrue(Number.isSafeInteger(0), '0');
	proclaim.isTrue(Number.isSafeInteger(-0), '-0');
	proclaim.isTrue(Number.isSafeInteger(Math.pow(2, 52) - 1), 'Math.pow(2, 52) - 1');
	proclaim.isTrue(Number.isSafeInteger(-Math.pow(2, 52) + 1), '-Math.pow(2, 52) + 1');
});

it('is writable', function () {
	var NumberisSafeInteger = Number.isSafeInteger;
	Number.isSafeInteger = 1;
	proclaim.notEqual(Number.isSafeInteger, NumberisSafeInteger);
	proclaim.strictEqual(Number.isSafeInteger, 1);
});
