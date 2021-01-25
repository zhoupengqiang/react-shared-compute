"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSharedCompute = void 0;
var sharedComputes = {};

var createSharedCompute = function createSharedCompute(name, fn, isEqual) {
  if (typeof sharedComputes[name] !== "undefined") {
    var _module, _module$hot;

    if (((_module = module) === null || _module === void 0 ? void 0 : (_module$hot = _module.hot) === null || _module$hot === void 0 ? void 0 : _module$hot.status()) !== 'apply') {
      throw new Error("compute \"".concat(name, "\" has been defined, please use another name!"));
    }
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