<template>
  <div class="container content">
    <div class="content__top">
      <ul v-if="route.name === 'adminOrderAdd'" class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'adminMenu' }" class="breadcrumbs__link">
            Меню
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'adminOrders' }" class="breadcrumbs__link">
            Заказы
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link"> Оформление заказа </span>
        </li>
      </ul>

      <ul v-else class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link
            @click="store.setCatalogPathName"
            class="breadcrumbs__link"
            :to="{ name: 'catalog' }"
          >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'basket' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>
    </div>

    <BaseSpinner v-if="store.isLoading"></BaseSpinner>
    <BaseOrderForm
      v-else
      @submit="save"
      @change="changeCart"
      v-model:data="data"
      :error="error"
      :prime-btn-text="'Оформить заказ'"
    ></BaseOrderForm>
  </div>
</template>
<script setup>
import BaseOrderForm from '@/components/BaseOrderForm.vue'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store } from '@/store/store'
import useApi from '@/hooks/useApi'
import BaseSpinner from '@/components/small/BaseSpinner.vue'
const route = useRoute()
const router = useRouter()
const { fetch } = useApi()
const data = ref(
  localStorage.getItem('orderData')
    ? JSON.parse(localStorage.getItem('orderData'))
    : { delivery: {}, deliveryPrice: 0 }
)
const error = ref({})
watch(
  () => data.value,
  () => {
    localStorage.setItem('orderData', JSON.stringify(data.value))
  },
  { deep: true }
)

const save = () => {
  const basket = Object.assign({}, data.value.basket, {
    items: store.basketItems,
    itemsQuantity: store.basketItemsQuantity,
    totalPrice: store.basketTotalPrice
  })
  fetch(
    'post',
    'api/order',
    Object.assign(
      {},
      data.value,
      { basket },
      { basketId: localStorage.getItem('userAccessKey') }
    ),
    'OrderLoading'
  )
    .then((res) => {
      localStorage.setItem('orderId', res.data.orderId)
      localStorage.setItem('userAccessKey', '')

      router.push({ name: 'orderInfo' })
    })
    .catch((res) => (error.value = res.response.data))
}

const changeCart = () => {
  router.push({ name: 'basket' })
}
</script>
