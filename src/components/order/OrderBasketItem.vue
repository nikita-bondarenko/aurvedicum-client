<template>
  <li
    class="cart__order"
    :class="{ 'spinner-small': isLoading, 'loading-error': isLoadingFailed }"
  >
    <h3>{{ product.name }}</h3>
    <b>{{ editNumberFormat(item.price) }}&nbsp;₽</b>
    <span>Объем/вес:&nbsp; {{ volume }}</span>
    <span
      >Колличество:&nbsp;{{ editNumberFormat(item.quantity) }}&nbsp;шт.</span
    >
  </li>
</template>
<script setup>
import { ref, defineProps, computed } from 'vue'
import useEditors from '@/hooks/useEditors'
import useApi from '@/hooks/useApi'
const { getProduct } = useApi()
const props = defineProps(['item'])
const product = ref({})
const { editVolumeFormat, editNumberFormat } = useEditors()
const isLoading = ref(true)
const isLoadingFailed = ref(false)
getProduct({ id: props.item.productId })
  .then((res) => {
    product.value = res.data
  })
  .catch(() => (isLoadingFailed.value = true))
  .then(() => (isLoading.value = false))

const volume = computed(() => {
  if (product.value.volumes) {
    return editVolumeFormat(
      product.value.volumes.find((item) => item.id === props.item.volumeId)
        .volume
    )
  } else {
    return ''
  }
})
</script>
<style lang="scss">
@import '@/styles/style.scss';
.spinner-small::after {
  @include basketItemSpinner;
}
</style>
