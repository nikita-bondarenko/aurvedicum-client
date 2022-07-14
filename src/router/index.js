import { createRouter, createWebHistory } from 'vue-router'
import CatalogPage from '@/views/CatalogPage.vue'
const routes = [
  {
    path: '/',
    name: 'catalog',
    component: CatalogPage
  },
  {
    path: '/:id',
    name: 'item',

    component: () => import('../views/ItemPage.vue')
  },

  {
    path: '/basket',
    name: 'basket',

    component: () => import('../views/BasketPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
