import Vue from 'vue'
import router from './router'
import {common} from './common'
import store from './store'
import Lin from './components/component'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(common);
Vue.use(Lin);
Vue.use(ElementUI);

//网页挂载点
const Layout = () => import('./pages/others/layout.vue');

new Vue({
    router,
    store,
    render: h => h(Layout)
}).$mount('#app');
