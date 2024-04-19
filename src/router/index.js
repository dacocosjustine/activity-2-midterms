import { createRouter, createWebHistory } from 'vue-router'
import ProductView from '@/views/ProductView.vue'
import AddView from '@/views/AddView.vue'
import DeleteView from '@/views/DeleteView.vue'



const routes = [
  {
    path: '/',
    name: 'Products',
    component: ProductView
  },
  {
    path: '/add',
    name: 'AddView',
    component: AddView
  },
  {
    path: '/delete',
    name: 'delete',
    component: DeleteView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
