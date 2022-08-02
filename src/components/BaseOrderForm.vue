<template>
  <main class="content container">
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
              :error-text="error.name"
            />
            <FormInput
              v-model="formData.address"
              :placeholder-text="'Введите ваш адрес'"
              :label-text="'Адрес доставки *'"
              :error-text="error.address"
            />
            <FormInput
              v-model="formData.phone"
              :placeholder-text="'Введите ваш телефон'"
              :label-text="'Телефон *'"
              :error-text="error.phone"
            />
            <FormInput
              v-model="formData.email"
              :placeholder-text="'Введи ваш Email'"
              :label-text="'Email *'"
              :error-text="error.email"
            />
            <FormTextarea
              class="order__comment"
              v-model="formData.comment"
              :placeholder-text="'Ваши пожелания'"
              :label-text="'Комментарий к заказу'"
              :error-text="error.comment"
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

        <div class="cart__block" :class="{ indent: config.pages > 1 }">
          <PaginationBase
            v-if="config.pages > 1"
            v-model:config="config"
            :pagination="config"
          ></PaginationBase>

          <ul class="cart__orders">
            <OrderBasketItem
              v-for="item in store.basketItems"
              :key="item.id"
              :item="item"
            ></OrderBasketItem>
            <button
              @click.prevent="$emit('change')"
              class="cart__change-button button--second button"
              :class="{ 'small-button-spinner': store.isChangeLoading }"
            >
              Редактировать корзину
            </button>
          </ul>
<span v-if="store.basketItems.length === 0" >В корзине пусто</span>
          <div v-else class="cart__total">
            <p>
              Доставка: <b>{{ deliveryPriceText(formData.deliveryPrice) }} </b>
            </p>
            <p>
              Итого: {{ pluralizeProductAmount(store.basketItemsQuantity) }} на
              сумму
              <b>{{ editNumberFormat(price) }}&nbsp;₽</b>
            </p>
          </div>

          <button
            v-if="store.basketItems.length > 0"
            class="cart__button button button--primery"
            :class="{
              'spinner-button-small': store.isOrderLoading
            }"
            type="submit"
          >
            {{ primeBtnText }}
          </button>
        </div>
        <div
          v-if="Object.keys(error).length > 0"
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
import { computed, ref, watch, defineProps, defineEmits } from 'vue'
import OrderBasketItem from '@/components/order/OrderBasketItem.vue'
import PaginationBase from '@/components/small/PaginationBase.vue'
import FormTextarea from '@/components/form/FormTextarea.vue'
import FormInput from '@/components/form/FormInput.vue'
import useEditors from '@/hooks/useEditors'
import useApi from '@/hooks/useApi'
import { store } from '@/store/store'
const props = defineProps(['data', 'error', 'primeBtnText'])
const emit = defineEmits(['update:data', 'change'])

const formData = computed({
  get() {
    return props.data
  },
  set(value) {
    emit('update:data', value)
  }
})

const { pluralizeProductAmount, editNumberFormat, deliveryPriceText } =
  useEditors()
const { getDeliveries } = useApi()
const deliveries = ref([])
const isDeliveryLoading = ref(true)

getDeliveries().then((res) => {
  deliveries.value = res.data.items
  isDeliveryLoading.value = false
})

const findCurrentPrice = (arr) =>
  arr.find(
    (item) =>
      (!item.min || item.min <= store.basketTotalPrice) &&
      (!item.max || item.max >= store.basketTotalPrice)
  ).value

const computePrice = (arr) => {
  return findCurrentPrice(arr)
}

watch(
  () => formData.value.delivery,
  (value) => {
    if (value.price) {
      formData.value.deliveryPrice = findCurrentPrice(value.price)
      return
    }

    formData.value.deliveryPrice = 0
  },
  { deep: true }
)
const config = ref({ limit: 5, page: 1, pages: 1 })

const price = computed(() => {
  const value = store.basketTotalPrice + formData.value.deliveryPrice
  return value
})

watch(
  () => price.value,
  (value) => (formData.value.price = value)
)
</script>
<style lang="scss">
@import '@/styles/order.scss';
</style>
