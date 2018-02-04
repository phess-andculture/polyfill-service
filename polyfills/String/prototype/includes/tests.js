/* eslint-env mocha, browser*/
/* global proclaim, it */

it('is a function', function () {
	proclaim.isFunction(Object.assign);
});

it('has correct argument length', function () {
	proclaim.strictEqual(Object.assign.length, 2);
});

it('has correct name', function() {
	var functionsHaveNames = (function foo() {}).name === 'foo';
	if (functionsHaveNames) {
		proclaim.equal(Object.assign.name, 'assign');
	} else {
		function nameOf(fn) {
			return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1];
		}
		proclaim.equal(nameOf(Object.assign), 'assign');
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
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Object.assign));
});

it('works as expected', function(){
    var re, O;
    proclaim.ok(!'abc'.includes());
    proclaim.ok('aundefinedb'.includes());
    proclaim.ok('abcd'.includes('b', 1));
    proclaim.ok(!'abcd'.includes('b', 2));
    if (STRICT) {
      proclaim.throws(function(){
        String.prototype.includes.call(null, '.');
      }, TypeError);
      proclaim.throws(function(){
        String.prototype.includes.call(void 8, '.');
      }, TypeError);
    }
    re = /./;
    proclaim.throws(function(){
      '/./'.includes(re);
    }, TypeError);
    re[typeof Symbol != 'undefined' && Symbol !== null ? Symbol.match : void 8] = false;
    proclaim.ok((function(){
      try {
        return '/./'.includes(re);
      } catch (e$) {
        e = e$;
        return false;
      }
    }()));
    O = {};
    proclaim.ok((function(){
      try {
        return '[object Object]'.includes(O);
      } catch (e$) {
        e = e$;
        return false;
      }
    }()));
    O[typeof Symbol != 'undefined' && Symbol !== null ? Symbol.match : void 8] = true;
    proclaim.throws(function(){
      '[object Object]'.includes(O);
    }, TypeError);
});
