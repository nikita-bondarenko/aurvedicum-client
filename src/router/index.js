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
  },
  {
    path: '/order',
    name: 'order',

    component: () => import('../views/OrderPage.vue')
  },
  {
    path: '/orderInfo',
    name: 'orderInfo',
    component: () => import('../views/OrderInfoPage.vue')
  },
  {
    path: '/admin/',
    name: 'admin',
    component: () => import('../views/AdminPage.vue'),
    children: [
      {
        path: '/admin/products',
        name: 'adminProducts',
        component: () => import('@/components/admin/AdminProducts.vue')
      },
      {
        path: '/admin/contacts',
        name: 'adminContacts',
        component: () => import('@/components/admin/AdminContacts.vue')
      },
      {
        path: '/admin/orders',
        name: 'adminOrders',
        component: () => import('@/components/admin/AdminOrders.vue')
      },
      {
        path: '/admin/politics',
        name: 'adminPolitics',
        component: () => import('@/components/admin/AdminPolitics.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
