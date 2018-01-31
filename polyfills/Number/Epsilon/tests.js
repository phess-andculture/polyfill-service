/* eslint-env mocha, browser*/
/* global proclaim, it */

it('is correct type', function () {
	proclaim.isTypeOf(Number.EPSILON, 'number');
});

it('is 2^-52', function () {
	proclaim.equal(Number.EPSILON, 2.2204460492503130808472633361816e-16);
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
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Number.EPSILON));
});

it('1 is not equal to 1 + EPSILON', function () {
	proclaim.notStrictEqual(1, 1 + EPSILON);
});

it('1 is equal to 1 + EPSILON / 2', function () {
	proclaim.strictEqual(1, 1 + EPSILON / 2);
});
