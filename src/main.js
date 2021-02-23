import Vue from 'vue'
import App from './App.vue'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Notifications from 'vue-notification'
Vue.use(Notifications)

import Login from './components/login.vue'
Vue.component(Login)

import Register from './components/register.vue'
Vue.component(Register)

import Home from './components/home.vue'
Vue.component(Home)

import Chart from './components/chart.vue'
Vue.component(Chart)

import Admin from './components/admin.vue'
Vue.component(Admin)

import Test from './components/test.vue'
Vue.component(Test)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/chart', name: 'chart', component: Chart },
  { path: '/admin', name: 'admin', component: Admin },
  { path: '/register', name: 'register', component: Register },
  { path: '/test', name: 'test', component: Test }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
