import {createSharedCompute} from '../src/index'

describe('test createSharedCompute!', ()=>{  

  test('same compute only be called once', ()=>{
    const mockCompute = jest.fn()
    const sharedCompute = createSharedCompute(mockCompute)
    const args = ['a', 1, {c: 'c', d: 2}]
    sharedCompute(...args)
    sharedCompute(...args)

    expect(mockCompute.mock.calls.length).toBe(1)
  })

  test('different args cause recomputation', ()=>{
    const mockCompute = jest.fn()
    const sharedCompute = createSharedCompute(mockCompute)
    sharedCompute('a', 1, {c: 'c', d: 2})
    sharedCompute('a', 1, {c: 'c', d: 2})

    expect(mockCompute.mock.calls.length).toBe(2)
  })

  test('compute only be called once When isEqual works', ()=>{
    const mockCompute = jest.fn()
    const isEqual = function(oldArgs, newArgs){
      const [oldKey, oldObj] = oldArgs
      const [newKey, newObj] = newArgs
      if(oldObj[oldKey] === newObj[newKey]) return true
      return false
    }
    const sharedCompute = createSharedCompute(mockCompute, isEqual)
    sharedCompute('id', {id: '123'})
    sharedCompute('orderId', {orderId: '123'})

    expect(mockCompute.mock.calls.length).toBe(1)
  })

})