export const createSharedCompute = (fn, isEqual) => {
  let _deps;
  let _value;

  function sharedCompute(...args) {
    if (typeof _deps === "undefined") {
      _deps = args;
      return (_value = fn(...args));
    }

    if (typeof isEqual === "function" && isEqual(_deps, args)) {
      return _value;
    }

    if (_deps.some((v, idx) => v !== args[idx])) {
      _deps = args;
      _value = fn(...args);
    }
    return _value;
  }

  return sharedCompute;
};
