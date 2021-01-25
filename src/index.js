const sharedComputes = {}

export const createSharedCompute = (name, fn, isEqual) => {
  if(typeof sharedComputes[name] !== "undefined"){
    if(module?.hot?.status() !== 'apply'){
      throw new Error(`compute "${name}" has been defined, please use another name!`)
    }
  }
  let firstCompute = true

  function sharedCompute(...args){
    if(firstCompute){
      firstCompute = false
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

  return sharedComputes[name] = sharedCompute
}