export const createSharedCompute = (fn, isEqual) => {
  
  function sharedCompute(...args){
    if(typeof sharedCompute._deps === 'undefined'){
      sharedCompute._deps = args
      return sharedCompute._value = fn(...args)
    }

    if(typeof isEqual === 'function' && isEqual(sharedCompute._deps, args)){
      return sharedCompute._value
    }

    if(sharedCompute._deps.some((v, idx) => v !== args[idx])){
      sharedCompute._deps = args
      sharedCompute._value = fn(...args)
    }
    return sharedCompute._value
  }

  return sharedCompute
}