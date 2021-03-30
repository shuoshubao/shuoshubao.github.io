import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './view/index/index.vue';
import 'element-ui/lib/theme-chalk/index.css';
import './style/app.scss';

Vue.use(ElementUI);

new Vue({
    render: (h) => h(App)
}).$mount('#app');
