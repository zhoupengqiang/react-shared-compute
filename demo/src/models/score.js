export const score = {
  state: 0, // initial state
  reducers: {
    setScore(state, payload) {
      return payload
    },
  },
  effects: {
    async queryScore() {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.setScore(Math.random() * 150 | 0)
    },
  },
}