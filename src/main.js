import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueAxios from './plugins/axios'
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题

Vue.config.productionTip = false;
Vue.use(VueAxios);
Vue.use(ElementUI, {
    size: 'small'
});

//使用钩子函数对路由进行拦截
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-cup`;
    const role = localStorage.getItem('username');
    const adminName = localStorage.getItem('admin_username');
    if (!role && (to.path === '/publish' || to.path === '/goods_detail' || to.path === '/cart' 
        || to.path === '/buysuccess' || to.path === '/myorder')) {
        next('/login');
    } else if (!adminName && (to.path === '/admin/user' || to.path === '/admin/publish' || to.path === '/admin/goods')){
        next('/admin/login');
    } else {
        next();
    }
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
