"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSharedCompute = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var sharedComputes = {};

var createSharedCompute = function createSharedCompute(name, fn, isEqual) {
  if (_typeof(sharedComputes[name]) !== undefined) {
    throw new Error("compute \"".concat(name, "\" has been defined, please use another name!"));
  }

  var firstCompute = true;

  function sharedCompute() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (firstCompute) {
      firstCompute = false;
      sharedCompute._deps = args;
      return sharedCompute._value = fn.apply(void 0, args);
    }

    if (typeof isEqual === 'function' && isEqual(sharedCompute._deps, args)) {
      return sharedCompute._value;
    }

    if (sharedCompute._deps.some(function (v, idx) {
      return v !== args[idx];
    })) {
      sharedCompute._deps = args;
      sharedCompute._value = fn.apply(void 0, args);
    }

    return sharedCompute._value;
  }

  return sharedComputes[name] = sharedCompute;
};

exports.createSharedCompute = createSharedCompute;