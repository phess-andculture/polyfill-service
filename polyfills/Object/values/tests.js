/* eslint-env mocha, browser*/
/* global proclaim, it */

proclaim.arity = function (fn, expected) {
	this.isFunction(fn);
	this.strictEqual(fn.length, expected);
};
proclaim.name = function (fn, expected) {
	var functionsHaveNames = (function foo() { }).name === 'foo';
	if (functionsHaveNames) {
		this.strictEqual(fn.name, expected);
	} else {
		this.equal(Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1], expected);
	}
};
proclaim.nonEnumerable = function (obj, prop) {
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
	if (Object.defineProperty && arePropertyDescriptorsSupported()) {
		this.isFalse(Object.prototype.propertyIsEnumerable.call(obj[prop]));
	}
};
it('is a function', function () {
	proclaim.isFunction(Object.values);
});

it('has correct arity', function () {
	proclaim.arity(Object.values.length, 1);
});

it('has correct name', function() {
	proclaim.name(Object.values.name, 'values');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Object, 'values');
});

it('works as expected', function () {
	proclaim.equal(Object.values({}).length, 0);

	proclaim.equal(Object.values({
		foo: true
	}).length, 1);

	proclaim.equal(Object.values({
		foo: true,
		bar: false
	}).length, 2);
	proclaim.deepEqual(Object.values(new String('qwe')), ['q', 'w', 'e']);
	proclaim.deepEqual(Object.values({
		q: 1,
		w: 2,
		e: 3
	}), [1, 2, 3]);
	proclaim.equal(Object.values({
		toString: function () {}
	}).length, 1);

	proclaim.equal(Object.values({
		constructor: 0,
		hasOwnProperty: 0,
		isPrototypeOf: 0,
		propertyIsEnumerable: 0,
		toString: 0,
		toLocaleString: 0,
		valueOf: 0
	}).length, 7);

	if ('assign' in Object && 'create' in Object) {
		proclaim.deepEqual(Object.values(Object.assign(Object.create({
			q: 1,
			w: 2,
			e: 3
		}), {
				a: 4,
				s: 5,
				d: 6
			})), [4, 5, 6]);
	}
	try {
		proclaim.deepEqual(Function('return Object.values({a: 1, get b(){delete this.c;return 2},c: 3})')(), [1, 2]);
	} catch (e$) { }
	try {
		proclaim.deepEqual(Function('return Object.values({a: 1, get b(){Object.defineProperty(this, "c", {value:4,enumerable:false});return 2},c: 3})')(), [1, 2]);
	} catch (e$) { }
});
