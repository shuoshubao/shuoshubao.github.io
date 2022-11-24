import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './views/Index.vue'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/app.scss'

Vue.use(ElementUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
