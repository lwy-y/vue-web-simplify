import Vue from 'vue';
import App from './App.vue';
import router from './router/routerIntercept';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import headline from './components/headline/index.js'
import 'babel-polyfill';
import store from './store'
import './mixin'

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(headline)
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//定义一个时间过滤器
Vue.filter("FormatDate", function (date, fmt) {
    return formatDate(date, fmt);
  });
new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');
