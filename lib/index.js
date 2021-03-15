"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSharedCompute = void 0;

var createSharedCompute = function createSharedCompute(fn, isEqual) {
  var _deps;

  var _value;

  function sharedCompute() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (typeof _deps === "undefined") {
      _deps = args;
      return _value = fn.apply(void 0, args);
    }

    if (typeof isEqual === "function" && isEqual(_deps, args)) {
      return _value;
    }

    if (_deps.some(function (v, idx) {
      return v !== args[idx];
    })) {
      _deps = args;
      _value = fn.apply(void 0, args);
    }

    return _value;
  }

  return sharedCompute;
};

exports.createSharedCompute = createSharedCompute;