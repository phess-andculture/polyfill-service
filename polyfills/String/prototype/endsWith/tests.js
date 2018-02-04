/* eslint-env mocha, browser*/
/* global proclaim, it */

it('is a function', function () {
	proclaim.isFunction(String.prototype.endsWith);
});

it('has correct argument length', function () {
	proclaim.strictEqual(String.prototype.endsWith.length, 1);
});

it('has correct name', function() {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(String.prototype.endsWith.name, 'endsWith');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(String.prototype.endsWith), 'endsWith');
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
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(String.prototype.endsWith));
});

it('works as expected', function () {
	proclaim.equal('a'.endsWith('aa'), false);
	proclaim.equal('a'.endsWith('ab'), false);
	proclaim.equal('aa'.endsWith('a'), true);
	proclaim.equal('ab'.endsWith('a'), false);
	proclaim.equal('ab'.endsWith('ab'), true);
	proclaim.equal('ab'.endsWith('b'), true);

	var re, O;
	proclaim.ok('undefined'.endsWith());
	proclaim.ok(!'undefined'.endsWith(null));
	proclaim.ok('abc'.endsWith(''));
	proclaim.ok('abc'.endsWith('c'));
	proclaim.ok('abc'.endsWith('bc'));
	proclaim.ok(!'abc'.endsWith('ab'));
	proclaim.ok('abc'.endsWith('', NaN));
	proclaim.ok(!'abc'.endsWith('c', -1));
	proclaim.ok('abc'.endsWith('a', 1));
	proclaim.ok('abc'.endsWith('c', Infinity));
	proclaim.ok('abc'.endsWith('a', true));
	proclaim.ok(!'abc'.endsWith('c', 'x'));
	proclaim.ok(!'abc'.endsWith('a', 'x'));
	var supportsStrictModeTests = (function () {
		'use strict';

		return this === undefined;
	}).call(undefined);

	if (supportsStrictModeTests) {
		proclaim.throws(function () {
			String.prototype.endsWith.call(null, '.');
		}, TypeError);
		proclaim.throws(function () {
			String.prototype.endsWith.call(void 8, '.');
		}, TypeError);
	}
	re = /./;
	proclaim.throws(function () {
		'/./'.endsWith(re);
	}, TypeError);
	re[typeof Symbol != 'undefined' && Symbol !== null ? Symbol.match : void 8] = false;
	proclaim.ok((function () {
		try {
			return '/./'.endsWith(re);
		} catch (e$) {
			e = e$;
			return false;
		}
	}()));
	O = {};
	proclaim.ok((function () {
		try {
			return '[object Object]'.endsWith(O);
		} catch (e$) {
			e = e$;
			return false;
		}
	}()));
	O[typeof Symbol != 'undefined' && Symbol !== null ? Symbol.match : void 8] = true;
	proclaim.throws(function () {
		'[object Object]'.endsWith(O);
	}, TypeError);
});

