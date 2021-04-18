import Vue from 'vue'
import App from './App'
import router from './router'
// 导入全局样式表
import './assets/css/global.css'
import '../theme/index.css'
import publicMethod from './assets/js/common.js'
import axios from 'axios'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
//其对应样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueQuillEditor)

Vue.prototype.$http = axios;
Vue.prototype.publicMethod = publicMethod;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})