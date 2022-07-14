<template>
  <li
    class="cart__item product"
    :class="{
      'spinner-small': isDataLoading || isDeleteLoading,
      'loading-error': isDataLoadingFailed
    }"
  >
    <div class="product__pic">
      <img
        v-if="product.images"
        :src="product.images[0].url"
        width="120"
        height="120"
        srcset="img/product-square-4@2x.jpg 2x"
        alt="Название товара"
      />
    </div>
    <h3 class="product__title">{{ product.name }}</h3>
    <p class="product__info">
      Объем/вес:
      <span> {{ volume }} </span>
    </p>
    <span class="product__code"> {{ volumeQuantity }} в наличии</span>

    <BaseCounter
      :class="{ disabled: isCounterLoading }"
      class="product__counter"
      v-model:quantity="quantity"
      :volume="volumeItem"
    ></BaseCounter>

    <b class="product__price">
      {{ editNumberFormat(volumeItem.price) }}&nbsp;₽
    </b>

    <button
      @click.prevent="deleteItem"
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
    >
      <svg width="20" height="20" fill="currentColor">
        <path d="M17 1L1 17m16 0L1 1" stroke="#9D9D9D" stroke-width=".8"></path>
      </svg>
    </button>
  </li>
</template>
<script setup>
import { defineProps, computed, ref, watch, toRef } from 'vue'
import useEditors from '@/hooks/useEditors'
import useApi from '@/hooks/useApi'
import BaseCounter from '@/components/BaseCounter.vue'
const { getProductData, updateBasketItemQuantity, deleteBasketItem } = useApi()
const { editVolumeFormat, pluralizeProductAmount, editNumberFormat } =
  useEditors()
const props = defineProps(['item'])
const product = ref({})
const isCounterLoading = ref(false)
const isDataLoading = ref(true)
const isDataLoadingFailed = ref(false)
const volumeItem = computed(() => {
  return product.value.volumes
    ? product.value.volumes.find((volume) => volume.id === props.item.volumeId)
    : {}
})
const volumeQuantity = computed(() => {
  return pluralizeProductAmount(volumeItem.value.quantity)
})
const volume = computed(() => {
  return editVolumeFormat(volumeItem.value.volume)
})
const quantity = toRef(props.item, 'quantity')
getProductData(props.item.productId)
  .then((res) => {
    product.value = res
    isDataLoading.value = false
  })
  .catch(() => (isDataLoadingFailed.value = true))

setInterval(() => {
  isDataLoadingFailed.value = false

  getProductData(props.item.productId)
    .then((res) => {
      product.value = res
    })
    .catch(() => (isDataLoadingFailed.value = true))
}, 100)

watch(
  () => quantity.value,
  (value, oldValue) => {
    isCounterLoading.value = true
    const difference = oldValue - value
    const isAdd = difference < 0
    updateBasketItemQuantity({
      itemId: props.item.id,
      quantity: Math.abs(difference),
      isAdd
    }).then(() => (isCounterLoading.value = false))
  }
)
const isDeleteLoading = ref(false)
const deleteItem = () => {
  isDeleteLoading.value = true
  const res = deleteBasketItem({ itemId: props.item.id })
  if (res.data) {
    isDeleteLoading.value = false
  }
}
</script>
<style lang="scss">
@mixin disabled {
  &::before {
    z-index: 100;
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    opacity: 0.7;
    background: white;
  }
}

@mixin spinner {
  &::after {
    z-index: 1000;
    position: absolute;
    content: '';
    left: calc(50% - 50px);
    top: calc(50% - 50px);
    width: 100px;
    height: 100px;
    border: 10px solid transparent;
    border-top-color: $red;
    border-radius: 50%;
    animation: circle 1s infinite;
    transform-origin: center;
  }
}
@import '@/styles/style.scss';
.spinner-small {
  pointer-events: none;
  position: relative;
  @include disabled;
  @include spinner;
}

.loading-error {
  position: relative;
  @include disabled;
  &::after {
    z-index: 10000;
    position: absolute;
    content: 'Не удалось загрузить товар';
    color: $red;
    text-align: center;
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    max-width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

@keyframes circle {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
