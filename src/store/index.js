import Vue from "vue"
import Vuex from "vuex"
import index from "./store"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    index
  }
})

export default store
