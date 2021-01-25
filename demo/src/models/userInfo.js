export const userInfo = {
  state: {}, // initial state
  reducers: {
    setUserInfo(state, payload) {
      return payload
    },
  },
  effects: {
    async queryUserInfo() {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.setUserInfo({
        name: ['aaa', 'bbb', 'ccc', 'ddd'][Math.random()*4 | 0],
        age: Math.random() * 100 | 0
      })
    },
  },
}