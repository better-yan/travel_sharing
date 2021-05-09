import Vue from 'vue'
import App from './App'
import router from './router'
// 导入全局样式表
import './assets/css/global.css'
import '../theme/index.css'
//fontawesome
import 'font-awesome/css/font-awesome.css'
import publicMethod from './assets/js/common.js'
import axios from 'axios'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
//其对应样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// 表格
import * as echarts from 'echarts'

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueQuillEditor)

Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;

Vue.prototype.publicMethod = publicMethod;
Vue.filter('dateFormat', function (originVal) {
  const date = new Date(originVal)
  var y = date.getFullYear()
  var m = (date.getMonth() + "").padStart(2, '0')
  var d = (date.getDate() + "").padStart(2, '0')
  var hh = (date.getHours() + "").padStart(2, '0')
  var mm = (date.getMinutes() + "").padStart(2, '0')
  var ss = (date.getSeconds() + "").padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
Vue.filter('filterAvatar', function (originVal) {
  if (originVal) {
    var avatar = originVal.split("\\")[2];
    return require("../uploads/" + avatar);
  }
  return originVal
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
