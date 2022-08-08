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
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminPage.vue'),
    children: [
      {
        path: '/admin',
        name: 'adminMenu',
        component: () => import('@/components/admin/MenuPage.vue')
      },
      {
        path: '/admin/products',
        name: 'adminProducts',
        component: () => import('@/components/admin/products/ListPage.vue')
      },
      {
        path: '/admin/products/:id',
        name: 'adminChangeProduct',
        component: () => import('@/components/admin/products/ChangeItem.vue')
      },
      {
        path: '/admin/products/add',
        name: 'adminAddProduct',
        component: () => import('@/components/admin/products/AddItem.vue')
      },

      {
        path: '/admin/contacts',
        name: 'adminContacts',
        component: () => import('@/components/admin/contacts/ListPage.vue')
      },
      {
        path: '/admin/contacts/add',
        name: 'adminAddContact',
        component: () => import('@/components/admin/contacts/AddItem.vue')
      },
      {
        path: '/admin/contacts/:id',
        name: 'adminChangeContact',
        component: () => import('@/components/admin/contacts/ChangeItem.vue')
      },
      {
        path: '/admin/orders',
        name: 'adminOrders',
        component: () => import('@/components/admin/orders/ListPage.vue')
      },
      {
        path: '/admin/orders/:id',
        name: 'adminChangeOrder',
        component: () => import('@/components/admin/orders/ChangeItem.vue')
      },
      {
        path: '/admin/orders/info',
        name: 'adminOrderInfo',
        component: () => import('@/views/OrderInfoPage.vue')
      },
      {
        path: '/admin/orders/add',
        name: 'adminOrderAdd',
        component: () => import('@/views/OrderPage.vue')
      },
      {
        path: '/admin/orders/catalog',
        name: 'adminCatalog',
        component: () => import('@/views/CatalogPage.vue')
      },
      {
        path: '/admin/orders/catalog/:id',
        name: 'adminItem',
        component: () => import('@/views/ItemPage.vue')
      },
      {
        path: '/admin/orders/basket',
        name: 'adminBasket',
        component: () => import('@/views/BasketPage.vue')
      },
      {
        path: '/admin/articles',
        name: 'adminArticles',
        component: () => import('@/components/admin/articles/ListPage.vue')
      },
      {
        path: '/admin/articles/add',
        name: 'adminAddArticle',
        component: () => import('@/components/admin/articles/AddItem.vue')
      },
      {
        path: '/admin/news',
        name: 'adminNews',
        component: () => import('@/components/admin/news/ListPage.vue')
      },
      {
        path: '/admin/news/add',
        name: 'adminAddNew',
        component: () => import('@/components/admin/news/AddItem.vue')
      },
      {
        path: '/admin/news/:id',
        name: 'adminChangeNew',
        component: () => import('@/components/admin/news/ChangeItem.vue')
      },
      {
        path: '/admin/articles/:id',
        name: 'adminChangeArticle',
        component: () => import('@/components/admin/articles/ChangeItem.vue')
      },

      {
        path: '/admin/additions',
        name: 'adminAdditions',
        component: () => import('@/components/admin/additions/ListPage.vue')
      },
      {
        path: '/admin/additions/:id',
        name: 'adminChangeAddition',
        component: () => import('@/components/admin/additions/ChangeItem.vue')
      },
      {
        path: '/admin/additions/add',
        name: 'adminAddAddition',
        component: () => import('@/components/admin/additions/AddItem.vue')
      },
      {
        path: 'admin/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('@/views/NotFound.vue')
      }

    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
