/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Number.parseFloat);
});

it('has correct argument length', function () {
	proclaim.strictEqual(Number.parseFloat.length, 1);
});

it('has correct name', function () {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(Number.parseFloat.name, 'parseFloat');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(Number.parseFloat), 'parseFloat');
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
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Number.parseFloat));
});

it('returns NaN with NaN values', function () {
	proclaim.equal(Number.parseFloat('Hello').toString(), NaN.toString());
	proclaim.equal(Number.parseFloat('H546').toString(), NaN.toString());
});

it('returns 15 for valid numbers and non-number data types', function () {
	proclaim.equal(Number.parseFloat(15.45), 15.45);
  proclaim.equal(Number.parseFloat("15"), 15);
  proclaim.equal(Number.parseFloat("150e-1"), 15);
  proclaim.equal(Number.parseFloat("0.150e+2"), 15);
  proclaim.equal(Number.parseFloat("15.1px"), 15.1);
  proclaim.equal(Number.parseFloat("15.2"), 15.2);
});

it('works as expected', function () {
	proclaim.equal(Number.parseFloat, window.parseFloat);
	proclaim.equal(Number.parseFloat('0'), 0);
	proclaim.equal(Number.parseFloat(' 0'), 0);
	proclaim.equal(Number.parseFloat('+0'), 0);
	proclaim.equal(Number.parseFloat(' +0'), 0);
	proclaim.equal(Number.parseFloat('-0'), -0);
	proclaim.equal(Number.parseFloat(' -0'), -0);
	var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
	proclaim.equal(Number.parseFloat(ws + '+0'), 0);
	proclaim.equal(Number.parseFloat(ws + '-0'), -0);
	proclaim.equal(Number.parseFloat(null), NaN);
	proclaim.equal(Number.parseFloat(void 8), NaN);
});
