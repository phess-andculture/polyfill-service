/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Number.isNaN);
});

it('has correct argument length', function () {
	proclaim.strictEqual(Number.isNaN.length, 1);
});

it('has correct name', function () {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(Number.isNaN.name, 'isNaN');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(Number.isNaN), 'isNaN');
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
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Number.isNaN));
});

it('returns true with NaN values', function () {
	proclaim.isTrue(Number.isNaN(NaN));
	proclaim.isTrue(Number.isNaN(Number.NaN));
	proclaim.isTrue(Number.isNaN(0 / 0));
});

it('retuns false for valid numbers and non-number data types', function () {
	proclaim.isFalse(Number.isNaN("NaN"));
	proclaim.isFalse(Number.isNaN(undefined));
	proclaim.isFalse(Number.isNaN({}));
	proclaim.isFalse(Number.isNaN("blabla"));
	proclaim.isFalse(Number.isNaN(true));
	proclaim.isFalse(Number.isNaN(37));
	proclaim.isFalse(Number.isNaN("37"));
	proclaim.isFalse(Number.isNaN(1));
	proclaim.isFalse(Number.isNaN(0.1));
	proclaim.isFalse(Number.isNaN(-1));
	proclaim.isFalse(Number.isNaN(Math.pow(2, 16)));
	proclaim.isFalse(Number.isNaN(Math.pow(2, 16) - 1));
	proclaim.isFalse(Number.isNaN(Math.pow(2, 31)));
	proclaim.isFalse(Number.isNaN(Math.pow(2, 31) - 1));
	proclaim.isFalse(Number.isNaN(Math.pow(2, 32)));
	proclaim.isFalse(Number.isNaN(Math.pow(2, 32) - 1));
	proclaim.isFalse(Number.isNaN(-0));
	proclaim.isFalse(Number.isNaN(Infinity));
	proclaim.isFalse(Number.isNaN('5'));
	proclaim.isFalse(Number.isNaN(false));
	proclaim.isFalse(Number.isNaN(new Number(NaN)));
	proclaim.isFalse(Number.isNaN(new Number(Infinity)));
	proclaim.isFalse(Number.isNaN(new Number(5)));
	proclaim.isFalse(Number.isNaN(new Number(0.1)));
	proclaim.isFalse(Number.isNaN(null));
	proclaim.isFalse(Number.isNaN(function () {}));
	if ('create' in Object) {
		proclaim.isFalse(Number.isNaN(Object.create(null)));
	}
});
