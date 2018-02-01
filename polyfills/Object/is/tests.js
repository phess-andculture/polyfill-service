/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Object.is);
});

it('has correct argument length', function () {
	proclaim.strictEqual(Object.is.length, 2);
});

it('has correct name', function () {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(Object.is.name, 'is');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(Object.is), 'is');
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
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Object.is));
});

it('works as expected', function () {
	proclaim.isTrue(Object.is(1, 1));
	proclaim.isTrue(Object.is(NaN, NaN));
	proclaim.isFalse(Object.is(0, -0));
	proclaim.isFalse(Object.is({}, {}));
});
