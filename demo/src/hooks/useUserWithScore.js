import { useState } from 'react'
import { useSelector } from 'react-redux'
import { createSharedCompute } from '../../../src/index'

const getUserWithScore = createSharedCompute((score, userInfo)=>{
  console.log('+++++++ compute userWithScore ++++++')
  return {...userInfo, score}
})

export const useUserWithScore = ()=>{
  const score = useSelector(state=>state.score)
  const userInfo = useSelector(state=>state.userInfo)
  return getUserWithScore(score, userInfo)
}