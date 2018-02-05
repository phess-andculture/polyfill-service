/* eslint-env mocha, browser */
/* global proclaim */

proclaim.arity = function (fn, expected) {
	proclaim.isFunction(fn);
	proclaim.strictEqual(fn.length, expected);
};
proclaim.hasName = function (fn, expected) {
	var functionsHaveNames = (function foo() { }).name === 'foo';
	if (functionsHaveNames) {
		proclaim.strictEqual(fn.name, expected);
	} else {
		proclaim.equal(Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\s*\(/)[1], expected);
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
		proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(obj[prop]));
	}
};

it('is a function', function () {
	proclaim.isFunction(WeakMap);
});

it('has correct argument length', function () {
	proclaim.strictEqual(WeakMap.length, 0);
});

it('has correct name', function() {
	proclaim.hasName(WeakMap, 'WeakMap');
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
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(window, WeakMap));
});

it("has valid constructor", function () {
	proclaim.isInstanceOf(new WeakMap, WeakMap);
	proclaim.isInstanceOf(new WeakMap(), WeakMap);
	proclaim.equal((new WeakMap()).constructor, WeakMap);
	proclaim.equal((new WeakMap()).constructor.name, "WeakMap");
	if ("__proto__" in {}) {
		proclaim.equal((new WeakMap).__proto__.isPrototypeOf(new WeakMap()), true);
		proclaim.equal((new WeakMap).__proto__ === WeakMap.prototype, true);
	}

	proclaim.throws(function () {
		WeakMap();
	}, TypeError);
});

it('has get, set, delete, and has functions', function() {
	proclaim.isFunction(WeakMap.prototype['get']);
	proclaim.isFunction(WeakMap.prototype['set']);
	proclaim.isFunction(WeakMap.prototype['delete']);
	proclaim.isFunction(WeakMap.prototype['has']);
});
it('does not have clear function', function () {
	proclaim.isUndefined(WeakMap.prototype.clear);
});
it('should perform as expected', function() {
	var wm = new WeakMap();
	var o1 = {};
	var o2 = function(){};
	var o3 = window;
	wm.set(o1, 37);
	proclaim.equal(wm.get(o1), 37);

	wm.set(o1, o2);
	wm.set(o3, undefined);
	proclaim.deepEqual(wm.get(o1), o2);

	// `wm.get({})` should return undefined, because there is no value for the object on wm
	proclaim.equal(wm.get({}), undefined);

	// `wm.get(o3)` should return undefined, because that is the set value
	proclaim.equal(wm.get(o3), undefined);

	proclaim.equal(wm.has(o1), true);
	proclaim.equal(wm.has({}), false);

	// Ensure that delete returns true/false indicating if the value was removed
	proclaim.equal(wm['delete'](o1), true);
	proclaim.equal(wm['delete']({}), false);

	proclaim.equal(wm.get(o1), undefined);
	proclaim.equal(wm.has(o1), false);
});

// Fails in IE11, supported in the polyfill
it('should be chainable', function() {
	var wm = new WeakMap();
	var o1 = {};
	var o2 = function(){};
	wm.set(o1, 37).set(o2, 'aoeui');
	proclaim.equal(wm.get(o2), 'aoeui');
});

// Ealy native implementations do not support this, polyfill does
it('should be possible to prepopulate the map', function() {
	var o1 = {};
	var wm = new WeakMap([
		[o1, 12],
		[function(){}, 'foo'],
		[window]
	]);

	proclaim.equal(wm.get(window), undefined);
	proclaim.equal(wm.get(o1), 12);
});

if ('freeze' in Object) {
	it('supports frozen objects', function () {
		var f = Object.freeze({});
		var map = new WeakMap();
		map.set(f, 42);
		proclaim.isTrue(map.has(f));
		proclaim.strictEqual(map.get(f), 42);
		map['delete'](f);
    proclaim.strictEqual(map.has(f), false);
    proclaim.strictEqual(map.get(f), void 8);
	});
}

if ('Symbol' in window && 'iterator' in Symbol && typeof [][Symbol.iterator] === 'function') {
	it('supports iterables', function () {
		var a = [];
		var done = false;
		a[Symbol.iterator] = function () {
			done = true;
			return [][Symbol.iterator].call(this);
		};
		new WeakMap(a);
		proclaim.isTrue(done);
	});
}

ifSupportsDescriptors('does not add anything enumerable into the Object prototype', function () {
	var o = {};
	new WeakMap().set(o, 1);
	var results = [];
	for (var key in o) {
		results.push(key);
	}
	proclaim.deepEqual(results, []);
	if ('keys' in Object) {
		proclaim.deepEqual(Object.keys(o), []);
	}
	if ('getOwnPropertyNames' in Object) {
		proclaim.deepEqual(Object.getOwnPropertyNames(o), []);
	}
	if ('getOwnPropertySymbols' in Object) {
		proclaim.deepEqual(Object.getOwnPropertySymbols(o), []);
	}
	if (typeof Reflect !== 'undefined' && 'ownKeys' in Reflect) {
		proclaim.deepEqual(Reflect.ownKeys(o), []);
	}
});

// TODO:
// ifSupportsSubclassing('subclassing works', function () {
// 	var C = nativeSubclass(WeakMap);
// 	proclaim.isInstanceOf(new C, C);
// 	proclaim.isInstanceOf(new C, WeakMap);
// 	var O = {};
// 	var c = new C();
// 	c.set(O, 2);
// 	proclaim.deepEqual(c.get(O), 2);
// });

// Generated by LiveScript 1.4.0
  it('WeakMap#delete', function(){
    var x$, M, a, b;
    // proclaim.hasName(WeakMap.prototype['delete'], 'delete');
    proclaim.arity(WeakMap.prototype['delete'], 1);
    proclaim.nonEnumerable(WeakMap.prototype, 'delete');
    x$ = M = new WeakMap();
    x$.set(a = {}, 42);
    x$.set(b = {}, 21);
    proclaim.ok(M.has(a) && M.has(b), 'WeakMap has values before .delete()');
    M['delete'](a);
    proclaim.ok(!M.has(a) && M.has(b), 'WeakMap hasn`t value after .delete()');
    proclaim.ok((function(){
      try {
        return !M['delete'](1);
      } catch (e$) {}
    }()), 'return false on primitive');
  });
  it('WeakMap#get', function(){
    var M, a;
    proclaim.isFunction(WeakMap.prototype.get);
    proclaim.hasName(WeakMap.prototype.get, 'get');
    proclaim.arity(WeakMap.prototype.get, 1);
    proclaim.nonEnumerable(WeakMap.prototype, 'get');
    M = new WeakMap();
    proclaim.strictEqual(M.get({}), void 8, 'WeakMap .get() before .set() return undefined');
    M.set(a = {}, 42);
    proclaim.strictEqual(M.get(a), 42, 'WeakMap .get() return value');
    M['delete'](a);
    proclaim.strictEqual(M.get(a), void 8, 'WeakMap .get() after .delete() return undefined');
    proclaim.ok((function(){
      try {
        return void 8 === M.get(1);
      } catch (e$) {}
    }()), 'return undefined on primitive');
  });
  it('WeakMap#has', function(){
    var M, a;
    proclaim.isFunction(WeakMap.prototype.has);
    proclaim.hasName(WeakMap.prototype.has, 'has');
    proclaim.arity(WeakMap.prototype.has, 1);
    proclaim.nonEnumerable(WeakMap.prototype, 'has');
    M = new WeakMap();
    proclaim.ok(!M.has({}), 'WeakMap .has() before .set() return false');
    M.set(a = {}, 42);
    proclaim.ok(M.has(a), 'WeakMap .has() return true');
    M['delete'](a);
    proclaim.ok(!M.has(a), 'WeakMap .has() after .delete() return false');
    proclaim.ok((function(){
      try {
        return !M.has(1);
      } catch (e$) {}
    }()), 'return false on primitive');
  });
  it('WeakMap#set', function(){
    var x$, a, wmap;
    proclaim.isFunction(WeakMap.prototype.set);
    proclaim.hasName(WeakMap.prototype.set, 'set');
    proclaim.arity(WeakMap.prototype.set, 2);
    proclaim.nonEnumerable(WeakMap.prototype, 'set');
    proclaim.deepEqual((x$ = new WeakMap(), x$.set(a = {}, 42), x$).get(a), 42, 'works with object as keys');
    proclaim.ok((function(){
      try {
        new WeakMap().set(42, 42);
        return false;
      } catch (e$) {
        return true;
      }
    }()), 'throws with primitive keys');
    wmap = new WeakMap();
    proclaim.deepEqual(wmap.set({}, 1), wmap, 'return this');
	});
if (typeof Symbol != 'undefined' && 'toStringTag' in Symbol) {
	it('WeakMap#@@toStringTag', function () {
		proclaim.strictEqual(WeakMap.prototype[Symbol.toStringTag], 'WeakMap');
	});
}
