export function createSharedCompute<
  T extends (...args: any[]) => any, 
  U extends (...args: any[]) => boolean
>(fn: T, areEqual?: U): (...args: Parameters<T>) => ReturnType<T> {
  let _deps: undefined | Parameters<T>;
  let _value: ReturnType<T>;

  function sharedCompute(...args: Parameters<T>): ReturnType<T> {
    if (typeof _deps === "undefined") {
      _deps = args;
      return (_value = fn(...args));
    }

    if (typeof areEqual === "function" && areEqual(_deps, args)) {
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
