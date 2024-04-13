import { createRouter, createWebHistory } from 'vue-router'
import ProductView from '@/views/ProductView.vue'

const routes = [
  {
    path: '/',
    name: 'Products',
    component: ProductView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
