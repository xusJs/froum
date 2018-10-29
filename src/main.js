import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/index"
import filter from "./filter/index"

/*element*/
import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

/**
 *
 * 富文本编辑器
 * */
import mavonEditor from "mavon-editor"
import "mavon-editor/dist/css/index.css"

/**
 * 多语言
 * */
import VueI18n from 'vue-i18n'
import langEn from "./lang/en"
import langZh from "./lang/zh"


Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'en': langEn,
    'zh': langZh,
  }
})

Vue.use(Element)
Vue.use(mavonEditor)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
