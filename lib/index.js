(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.DPR = factory());
}(this, (function () { 'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var EventDispatcher_1 = createCommonjsModule(function (module) {
var EventDispatcher = function () {
	this.addEventListener = EventDispatcher.prototype.addEventListener;
	this.hasEventListener = EventDispatcher.prototype.hasEventListener;
	this.removeEventListener = EventDispatcher.prototype.removeEventListener;
	this.dispatchEvent = EventDispatcher.prototype.dispatchEvent;
};
EventDispatcher.prototype = {
	constructor: EventDispatcher,
	addEventListener: function ( type, listener ) {
		if ( this._listeners === undefined ) { this._listeners = {}; }
		var listeners = this._listeners;
		if ( listeners[ type ] === undefined ) {
			listeners[ type ] = [];
		}
		if ( listeners[ type ].indexOf( listener ) === - 1 ) {
			listeners[ type ].push( listener );
		}
	},
	hasEventListener: function ( type, listener ) {
		if ( this._listeners === undefined ) { return false; }
		var listeners = this._listeners;
		if ( listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1 ) {
			return true;
		}
		return false;
	},
	removeEventListener: function ( type, listener ) {
		if ( this._listeners === undefined ) { return; }
		var listeners = this._listeners;
		var index = listeners[ type ].indexOf( listener );
		if ( index !== - 1 ) {
			listeners[ type ].splice( index, 1 );
		}
	},
	dispatchEvent: function ( event ) {
		var this$1 = this;
		if ( this._listeners === undefined ) { return; }
		var listeners = this._listeners;
		var listenerArray = listeners[ event.type ];
		if ( listenerArray !== undefined ) {
			event.target = this;
			for ( var i = 0, l = listenerArray.length; i < l; i ++ ) {
				listenerArray[ i ].call( this$1, event );
			}
		}
	}
};
try {
module.exports = EventDispatcher;
} catch( e ) {
}
});

var MAX_SAFE_INTEGER = 9007199254740991;
var argsTag = '[object Arguments]';
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var reIsUint = /^(?:0|[1-9]\d*)$/;
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var objectToString = objectProto.toString;
var propertyIsEnumerable = objectProto.propertyIsEnumerable;
var nativeKeys = overArg(Object.keys, Object);
var nativeMax = Math.max;
var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');
function arrayLikeKeys(value, inherited) {
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];
  var length = result.length,
      skipIndexes = !!length;
  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}
function copyObject(source, props, object, customizer) {
  object || (object = {});
  var index = -1,
      length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;
    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;
    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
  return value === proto;
}
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}
function isArguments(value) {
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}
var isArray = Array.isArray;
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
function isFunction(value) {
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}
var assign = createAssigner(function(object, source) {
  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
var index$1 = assign;

var version = "0.1.0";

var DPR = index$1({
  VERSION: version,
  DELAY: 500
}, EventDispatcher_1.prototype);
var _dpr = window.devicePixelRatio;
var _timeout;
function _debounce (fn) {
  window.clearTimeout(_timeout);
  _timeout = window.setTimeout(fn, DPR.DELAY);
}
function _handleResize () {
  var devicePixelRatio = window.devicePixelRatio;
  if (_dpr !== devicePixelRatio) {
    _dpr = devicePixelRatio;
    DPR.dispatchEvent({
      devicePixelRatio: devicePixelRatio ,
      type: 'change'
    });
  }
}
window.addEventListener('resize', _debounce.bind(null, _handleResize));

return DPR;

})));
