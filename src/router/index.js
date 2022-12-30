import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardChart from '../views/DashboardChart.vue'
import BrokenProduct from '../views/BrokenProduct.vue'
import ProductStatus from '../views/ProductStatus.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardChart
  },
  {
    path: '/brokenProduct',
    name: 'BrokenProduct',
    component: BrokenProduct
  },
  {
    path: '/ward',
    name: 'ward',
    component: ProductStatus
  }, 
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
