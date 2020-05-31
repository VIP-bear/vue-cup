import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/goods'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/goods',
                    component: () => import(/* webpackChunkName: "goods" */ '../components/page/Goods.vue'),
                    meta: { title: '商品' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/register',
            component: () => import(/* webpackChunkName: "register" */ '../components/page/Register.vue'),
            meta: { title: '注册' }
        },
        {
            path: '/publish',
            component: () => import(/* webpackChunkName: "publish" */ '../components/page/Publish.vue'),
            meta: { title: '发布商品' }
        },
        {
            path: '*',
            redirect: '/404'
        },
        {
            path: '/goods_detail',
            component: () => import(/* webpackChunkName: "goods" */ '../components/page/GoodsDetail.vue'),
            meta: { title: '商品详细信息' }
        },
        {
            path: '/cart',
            component: () => import(/* webpackChunkName: "goods" */ '../components/page/Cart.vue'),
            meta: { title: '购物车' }
        },
        {
            path: '/buysuccess',
            component: () => import(/* webpackChunkName: "goods" */ '../components/page/BuySuccess.vue'),
            meta: { title: '购买成功' }
        },
        {
            path: '/myorder',
            component: () => import(/* webpackChunkName: "goods" */ '../components/page/MyOrder.vue'),
            meta: { title: '我的订单' }
        },
        {
            path: '/admin/login',
            component: () => import(/* webpackChunkName: "goods" */ '../components/backstage/AdminLogin.vue'),
            meta: { title: '管理员登陆' }
        },
        {
            path: '/admin/user',
            component: () => import(/* webpackChunkName: "goods" */ '../components/backstage/UserManage.vue'),
            meta: { title: '用户管理' }
        },
        {
            path: '/admin/publish',
            component: () => import(/* webpackChunkName: "goods" */ '../components/backstage/PublishManage.vue'),
            meta: { title: '商品审核' }
        },
        {
            path: '/admin/goods',
            component: () => import(/* webpackChunkName: "goods" */ '../components/backstage/ProductManage.vue'),
            meta: { title: '商品管理' }
        },
    ]
});
