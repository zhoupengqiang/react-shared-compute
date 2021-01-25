
import React, { useCallback, useState } from "react";
import { useDispatch } from 'react-redux'
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux'
import store from './store'
import { useUserWithScore } from './hooks/useUserWithScore'

function WithSharedComputeData() {
  const {name, age, score} = useUserWithScore()
  return <div>{`name: ${name}, age: ${age}, score: ${score}`}</div>
}

function App(props) {
  const [num, setNum] = useState(1)
  const arr = new Array(num).fill(num)
  const dispatch = useDispatch()
  const changeDeps = useCallback(()=>{
    console.log('------- change userInfo and score ------')
    dispatch.score.setScore(Math.random() * 150 | 0)
    dispatch.userInfo.setUserInfo({
      name: ['aaa', 'bbb', 'ccc', 'ddd'][Math.random()*4 | 0],
      age: Math.random() * 100 | 0
    })
  }, [])

  return (
    <div>
      <input 
        type="number" min="0" step="1" value={num} 
        onChange={e=>setNum(Number(e.currentTarget.value))} 
      />
      <button onClick={changeDeps}>change compute deps</button>
      <div>
        {arr.map((e,idx)=><WithSharedComputeData key={idx} />)}
      </div>
    </div>
  );
}

function ReduxApp(){
  return <Provider store={store}><App /></Provider>
}

export default hot(ReduxApp);
