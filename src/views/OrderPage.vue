<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'catalog' }">
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

      <div class="content__row">
        <h1 class="content__title">Оформление заказа</h1>
      </div>
    </div>

    <section class="cart">
      <form
        @submit.prevent="sendOrder"
        class="cart__form form"
        action="#"
        method="POST"
      >
        <div class="cart__field">
          <div class="cart__data">
            <FormInput
              v-model="formData.name"
              :placeholder-text="'Введите ваше полное имя'"
              :label-text="'ФИО *'"
              :error-text="formError.name"
            />
            <FormInput
              v-model="formData.address"
              :placeholder-text="'Введите ваш адрес'"
              :label-text="'Адрес доставки *'"
              :error-text="formError.address"
            />
            <FormInput
              v-model="formData.phone"
              :placeholder-text="'Введите ваш телефон'"
              :label-text="'Телефон *'"
              :error-text="formError.phone"
            />
            <FormInput
              v-model="formData.email"
              :placeholder-text="'Введи ваш Email'"
              :label-text="'Email *'"
              :error-text="formError.email"
            />
            <FormTextarea
              v-model="formData.comment"
              :placeholder-text="'Ваши пожелания'"
              :label-text="'Комментарий к заказу'"
              :error-text="formError.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul
              class="cart__options options"
              :class="{ 'spinner-small': isDeliveryLoading }"
            >
              <li
                class="options__item"
                v-for="item in deliveries"
                :key="item.id"
              >
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    :value="item"
                    v-model="formData.delivery"
                  />
                  <span class="options__value">
                    {{ item.title }}
                    <b>{{ deliveryPriceText(computePrice(item.price)) }}</b>
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="cart__block"
          :class="{ indent: basketPagination.pages > 1 }"
        >
          <PaginationBase
            v-if="basketPagination.pages > 1"
            v-model:config="config"
            :pagination="basketPagination"
          ></PaginationBase>

          <ul class="cart__orders">
            <OrderBasketItem
              v-for="item in basketItems"
              :key="item.id"
              :item="item"
            ></OrderBasketItem>
          </ul>

          <div class="cart__total">
            <p>
              Доставка: <b>{{ deliveryPriceText(formData.deliveryPrice) }} </b>
            </p>
            <p>
              Итого: {{ pluralizeProductAmount(basketItemsQuantity) }} на сумму
              <b>{{ editNumberFormat(price) }}&nbsp;₽</b>
            </p>
          </div>

          <button
            class="cart__button button button--primery"
            :class="{
              'spinner-small': isOrderSending
            }"
            type="submit"
          >
            Оформить заказ
          </button>
        </div>
        <div
          v-if="Object.keys(formError).length > 0"
          class="cart__error form__error-block"
        >
          <h4>Заказ не отправлен!</h4>
          <p>Заполните все необходимые поля и попробуйте еще раз.</p>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup>
import { toRefs, computed, ref, watch, reactive } from 'vue'
import { store } from '@/store/store'
import { useRouter } from 'vue-router'
import OrderBasketItem from '@/components/order/OrderBasketItem.vue'
import PaginationBase from '@/components/small/PaginationBase.vue'
import FormTextarea from '@/components/form/FormTextarea.vue'
import FormInput from '@/components/form/FormInput.vue'
import useEditors from '@/hooks/useEditors'
import useApi from '@/hooks/useApi'
const router = useRouter()
const formData = reactive(
  localStorage.getItem('orderData')
    ? JSON.parse(localStorage.getItem('orderData'))
    : { delivery: {}, deliveryPrice: 0 }
)
const formError = ref({})
const {
  basketItems,
  basketPagination,
  basketPaginationConfig,
  basketItemsQuantity,
  basketTotalPrice
} = toRefs(store)
if (basketItemsQuantity.value === 0) router.push({ name: 'catalog' })
const config = computed({
  get() {
    return basketPaginationConfig.value
  },
  set(value) {
    store.updateProp('basketPaginationConfig', value)
  }
})
const { pluralizeProductAmount, editNumberFormat, deliveryPriceText } =
  useEditors()
const { getDeliveries, postOrder } = useApi()
const deliveries = ref([])
const isDeliveryLoading = ref(true)
getDeliveries().then((res) => {
  deliveries.value = res.data.items
  isDeliveryLoading.value = false
  if (res.data.items.length > 0 && !formData.delivery.created) {
    formData.delivery = res.data.items[0]
  }
})

const price = computed(() => {
  return basketTotalPrice.value + formData.deliveryPrice
})
const findCurrentPrice = (arr) =>
  arr.find(
    (item) =>
      (!item.min || item.min <= basketTotalPrice.value) &&
      (!item.max || item.max >= basketTotalPrice.value)
  ).value

const computePrice = (arr) => {
  return findCurrentPrice(arr)
}

watch(
  () => formData.delivery,
  (value) => {
    if (value.price) {
      formData.deliveryPrice = findCurrentPrice(value.price)
      return
    }

    formData.deliveryPrice = 0
  },
  { immediate: true, deep: true }
)

watch(
  () => formData,
  (value) => {
    localStorage.setItem('orderData', JSON.stringify(value))
  },
  { deep: true }
)

const isOrderSending = ref(false)
const isOrderSendingFailed = ref(false)
const sendOrder = () => {
  formError.value = {}
  isOrderSending.value = true
  isOrderSendingFailed.value = false
  postOrder(Object.assign({}, formData, { price: price.value }))
    .then((res) => {
      router.push({ name: 'orderInfo' })
      localStorage.setItem('orderId', res.data.orderId)
    })

    .catch((error) => {
      formError.value = error.response.data
      isOrderSendingFailed.value = true
    })
    .then(() => (isOrderSending.value = false))
}
</script>
<style lang="scss">
@import '@/styles/order.scss';
</style>
