<template>
  <main class="content container">
    <div class="content__top">
      <ul v-if="route.name === 'adminOrderInfo'" class="breadcrumbs">
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
          <span class="breadcrumbs__link"> Информация о заказе </span>
        </li>
      </ul>

      <ul v-else class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link
            @click="store.setCatalogPathName"
            :to="{ name: 'catalog' }"
            class="breadcrumbs__link"
          >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'basket' }" class="breadcrumbs__link">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link"> Оформление заказа </span>
        </li>
      </ul>

      <h1 v-if="route.name === 'adminOrderInfo'" class="content__title">
        Заказ изменен
      </h1>

      <h1 v-else class="content__title">Заказ оформлен</h1>
    </div>

    <section class="cart">
      <BaseSpinner v-if="isLoading"></BaseSpinner>
      <div v-else-if="!isLoading && isLoadingFailed" class="loading-error">
        Не удалось получить информацию о заказе.
      </div>
      <form
        v-else-if="!isLoading && !isLoadingFailed"
        class="cart__form form"
        action="#"
        method="POST"
      >
        <div class="cart__field">
          <p v-if="!route.name === 'adminOrderInfo'" class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. Наши менеджеры свяжутся
            с&nbsp;Вами в&nbsp;течение одного рабочего дня для уточнения деталей
            доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key"> Получатель </span>
              <span class="dictionary__value">
                {{ orderData.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Адрес доставки </span>
              <span class="dictionary__value">
                {{ orderData.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Телефон </span>
              <span class="dictionary__value">{{ orderData.phone }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Email </span>
              <span class="dictionary__value"> {{ orderData.email }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Способ доставки </span>
              <span class="dictionary__value">
                {{ orderData.delivery.title }}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block" :class="{ indent: config.pages > 1 }">
          <PaginationBase
            v-if="config.pages > 1"
            v-model:config="config"
            :pagination="config"
          ></PaginationBase>

          <ul class="cart__orders">
            <OrderBasketItem
              v-for="item in items"
              :key="item.id"
              :item="item"
            ></OrderBasketItem>
          </ul>

          <div class="cart__total">
            <p>
              Доставка: <b>{{ deliveryPriceText(orderData.deliveryPrice) }} </b>
            </p>
            <p>
              Итого:
              {{ pluralizeProductAmount(orderData.basket.itemsQuantity) }} на
              сумму
              <b>{{ editNumberFormat(orderData.price) }}&nbsp;₽</b>
            </p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { store } from '@/store/store'
import useApi from '@/hooks/useApi'
import BaseSpinner from '@/components/small/BaseSpinner.vue'
import PaginationBase from '@/components/small/PaginationBase.vue'
import OrderBasketItem from '@/components/order/OrderBasketItem.vue'
import useEditors from '@/hooks/useEditors'
const { deliveryPriceText, pluralizeProductAmount, editNumberFormat } =
  useEditors()
const { getOrder } = useApi()
const router = useRouter()
const route = useRoute()
const orderId = localStorage.getItem('orderId')
if (!orderId) {
  router.push({ name: 'catalog' })
  store.setCatalogPathName()
}

const isLoading = ref(true)
const isLoadingFailed = ref(false)
const orderData = ref({})
const config = ref({
  limit: 5,
  page: 1,
  pages: 1
})
getOrder(orderId)
  .then((res) => {
    orderData.value = res.data
    config.value.pages = Math.ceil(
      orderData.value.basket.items.length / config.value.limit
    )
  })
  .catch(() => (isLoadingFailed.value = true))
  .then(() => (isLoading.value = false))

const items = computed(() => {
  return orderData.value.basket.items.slice(
    config.value.limit * (config.value.page - 1),
    config.value.limit * config.value.page
  )
})
</script>
<style lang="scss">
@import '@/styles/order.scss';
.loading-error::after {
  display: none;
}
@media (max-width: 910px) {
  .cart__form {
    grid-template-columns: 1fr;
    grid-gap: 50px;
  }
}
</style>
