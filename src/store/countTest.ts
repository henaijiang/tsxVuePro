export default {
  state: {
    count: 5
  },
  mutations: {
    changeCount(state: any, num: number) {
      state.count = num || 0;
    }
  },
  actions: {
    achangeCount({ commit }: {commit: any}, num: number) {
      setTimeout(() => {
        commit('changeCount', num)
      }, 100)
    }
  },
  getters: {
    getCount(state: any) {
      return state.count
    }
  }
}