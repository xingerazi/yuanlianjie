import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import MyLove from '../views/MyLove'
import MyOwn from '../views/MyOwn'
import Login from '../views/Login'
import Info from '../views/Info'

import Effect from '../views/Effect'

Vue.use(VueRouter)


//创建路由组件
const routes = [
    //主路由
    {
        path: '/',
        name: 'Main',
        component: Main,
        redirect: '/home',//重定向
        children: [
            { path: '/home', name: 'home', component: Home, meta: { label: '首页' }, },//首页
            { path: '/user', name: 'user', component: User, meta: { label: '用户管理' }, },//用户管理
            { path: '/mall', name: 'mall', component: Mall, meta: { label: '商品交易' }, },//商品管理
            { path: '/own', name: 'own', component: MyOwn, meta: { label: '我的商品' }, },
            { path: '/love', name: 'love', component: MyLove, meta: { label: '我的关注' }, },
            { path: '/info', name: 'info', component: Info, meta: { label: '信息' }, },
        ]
    },

    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { label: '登录' },
    },

    {
        path: '/effect',
        name: 'effect',
        component: Effect,
        meta: { label: '效果' },
    },

]

const router = new VueRouter({
    routes
})

export default router

