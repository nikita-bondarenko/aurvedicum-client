<template>
  <div class="content__top">
    <ul class="breadcrumbs">
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
        <span class="breadcrumbs__link" disabled> Изменение заказа </span>
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
    :prime-btn-text="'Сохранить изменения'"
  ></BaseOrderForm>
</template>
<script setup>
import BaseOrderForm from '@/components/BaseOrderForm.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store } from '@/store/store'
import useApi from '@/hooks/useApi'
import BaseSpinner from '@/components/small/BaseSpinner.vue'
const route = useRoute()
const router = useRouter()
const { fetch } = useApi()
const url = `api/order/${route.params.id}`
const data = ref({})
const error = ref({})

fetch('get', url, {}).then((res) => {
  data.value = res.data
  if (store.isOrderedBasket) return
  store.updateProp('basketTotalPrice', res.data.basket.totalPrice)
  store.updateProp('basketItems', res.data.basket.items)
  store.updateProp('basketItemsQuantity', res.data.basket.itemsQuantity)
})
const save = () => {
  const basket = Object.assign({}, data.value.basket, {
    items: store.basketItems,
    itemsQuantity: store.basketItemsQuantity,
    totalPrice: store.basketTotalPrice
  })
  fetch('patch', url, Object.assign({}, data.value, { basket }), 'OrderLoading')
    .then(() => {
      router.push({ name: 'adminOrderInfo' })
      localStorage.setItem('orderId', route.params.id)
      localStorage.setItem('userAccessKey', '')
    })
    .catch((res) => (error.value = res.response.data))
}

const changeCart = () => {
  fetch(
    'post',
    'api/basket/fromOrder',
    data.value.basket,
    'ChangeLoading'
  ).then((res) => {
    localStorage.setItem('userAccessKey', res.data)
    localStorage.setItem('orderedBasketId', data.value.basket.id)
    router.push({ name: 'basket' })
  })
}
</script>
