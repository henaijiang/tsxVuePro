import Vue from 'vue'
import Vuex from 'vuex'
import countTest from "./countTest"
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    countTest
  }
})
