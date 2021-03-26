import Vue from 'vue';
import Router from 'vue-router';
import routerList from './devRouterList';
import testRouterList from './testRouterList';
import config from '../config/index';
Vue.use(Router);
let router = null;
if( config.devRouter === 0 ) {
    if (config.isOpenTest) {
        router = testRouterList
    }else {
        router = routerList
    }
}else {
    router = routerList
}
export default new Router({
    routes: router
});
