/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Number.isInteger);
});

it('has correct argument length', function () {
	proclaim.strictEqual(Number.isInteger.length, 1);
});

it('has correct name', function () {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(Number.isInteger.name, 'isInteger');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(Number.isInteger), 'isInteger');
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
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Number.isInteger));
});

it('returns true with integer values', function () {
	proclaim.isTrue(Number.isInteger(0));
	proclaim.isTrue(Number.isInteger(1));
	proclaim.isTrue(Number.isInteger(-100000));
	proclaim.isTrue(Number.isInteger(-1));
	proclaim.isTrue(Number.isInteger(Math.pow(2, 16)));
	proclaim.isTrue(Number.isInteger(Math.pow(2, 16) - 1));
	proclaim.isTrue(Number.isInteger(Math.pow(2, 31)));
	proclaim.isTrue(Number.isInteger(Math.pow(2, 31) - 1));
	proclaim.isTrue(Number.isInteger(Math.pow(2, 32)));
	proclaim.isTrue(Number.isInteger(Math.pow(2, 32) - 1));
	proclaim.isTrue(Number.isInteger(-0));
});

it('returns false for non integer values', function () {
	proclaim.isFalse(Number.isInteger(0.1));
	proclaim.isFalse(Number.isInteger(Math.PI));
	proclaim.isFalse(Number.isInteger(Infinity));
	proclaim.isFalse(Number.isInteger(-Infinity));
	proclaim.isFalse(Number.isInteger("10"));
	proclaim.isFalse(Number.isInteger(true));
	proclaim.isFalse(Number.isInteger(false));
	proclaim.isFalse(Number.isInteger([1]));
	proclaim.isFalse(Number.isInteger(NaN));
	proclaim.isFalse(Number.isInteger('NaN'));
	proclaim.isFalse(Number.isInteger('5'));
	proclaim.isFalse(Number.isInteger(new Number(NaN)));
	proclaim.isFalse(Number.isInteger(new Number(Infinity)));
	proclaim.isFalse(Number.isInteger(new Number(5)));
	proclaim.isFalse(Number.isInteger(new Number(0.1)));
	proclaim.isFalse(Number.isInteger(undefined));
	proclaim.isFalse(Number.isInteger(null));
	proclaim.isFalse(Number.isInteger({}));
	proclaim.isFalse(Number.isInteger(function () {}));
	proclaim.isFalse(Number.isInteger(Object.create(null)));
});
