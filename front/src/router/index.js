import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Books from '@/views/Books'
import Login from '@/views/Login'
import Signup from '@/views/Signup'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'books',
            component: Books,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: '/sign_up',
            name: 'signup',
            component: Signup,
            meta: {
                guest: true
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') == null) {
            next({
                path: '/login',
                params: {nextUrl: to.fullPath}
            })
        } else {
            store.dispatch("auth/FetchUser")
            next()
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('token') == null) {
            next()
        } else {
            next({name: 'books'})
        }
    } else {
        next()
    }
})

export default router