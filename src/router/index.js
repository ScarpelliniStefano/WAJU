import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import StaticTree from '../views/StaticTree.vue'
import Wizard from '../components/wizard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/static',
    name: 'StaticTree',
    component: StaticTree
  },
  {
    path: '/wizard',
    name: 'Wizard',
    component: Wizard
  }
]

const router = new VueRouter({
  mode : 'history',
  routes
})

export default router
