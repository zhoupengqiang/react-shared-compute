"use strict";
exports.__esModule = true;
exports.createSharedCompute = void 0;
function createSharedCompute(fn, areEqual) {
    var _deps;
    var _value;
    function sharedCompute() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (typeof _deps === "undefined") {
            _deps = args;
            return (_value = fn.apply(void 0, args));
        }
        if (typeof areEqual === "function" && areEqual(_deps, args)) {
            return _value;
        }
        if (_deps.some(function (v, idx) { return v !== args[idx]; })) {
            _deps = args;
            _value = fn.apply(void 0, args);
        }
        return _value;
    }
    return sharedCompute;
}
exports.createSharedCompute = createSharedCompute;
;
