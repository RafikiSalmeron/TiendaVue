import Vue from 'vue'
import App from './App.vue'

import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Notifications from 'vue-notification'
Vue.use(Notifications)

import Login from './components/login.vue'
Vue.component(Login)

import Home from './components/home.vue'
Vue.component(Home)

import Chart from './components/chart.vue'
Vue.component(Chart)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/chart', name: 'chart', component: Chart }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
