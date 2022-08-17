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
        :src="IMAGE_STORE + product.images[0].filename"
        width="120"
        height="120"
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
import { defineProps, computed, ref, watch, toRef, onBeforeUnmount } from 'vue'
import { IMAGE_STORE } from '@/config'
import useEditors from '@/hooks/useEditors'
import useApi from '@/hooks/useApi'
import BaseCounter from '@/components/small/BaseCounter.vue'
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

const intervalId = setInterval(() => {
  isDataLoadingFailed.value = false
  getProductData(props.item.productId)
    .then((res) => {
      product.value = res
    })
    .catch(() => (isDataLoadingFailed.value = true))
}, 100)

onBeforeUnmount(() => clearInterval(intervalId))

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
@import '@/styles/style.scss';
</style>
