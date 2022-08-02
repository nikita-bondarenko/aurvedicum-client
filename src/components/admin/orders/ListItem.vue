<template>
  <li class="data-base__item" :class="{ 'spinner-small': store.isItemLoading }">
    <div class="order__body">
      <h3 class="order__name data-base__name">{{ item.name }}</h3>
      <span class="order__phone">{{ item.phone }}</span>
      <span class="order__address">{{ item.address }}</span>
      <OrderSelect
        class="order__select"
        :items="statuses"
        v-model:item="status"
        @submit="patch"
      ></OrderSelect>
      <span class="order__created data-base__created"
        >Создан: {{ editors.editDate(item.created) }}</span
      >
      <span class="order__changed data-base__changed"
        >Изменен: {{ editors.editDate(item.changed) }}</span
      >
      <router-link
        class="order__change-button data-base__change-button"
        :to="{ name: 'adminChangeOrder', params: { id } }"
        >Изменить</router-link
      >
      <button
        class="data-base__button-del button-del order__button-del"
        type="button"
        aria-label="Удалить товар"
        @click.prevent="deleteItem"
      >
        <svg width="20" height="20" fill="currentColor">
          <path
            d="M17 1L1 17m16 0L1 1"
            stroke="#9D9D9D"
            stroke-width=".8"
          ></path>
        </svg>
      </button>
    </div>
  </li>
</template>
<script setup>
import { defineProps, defineEmits, ref, onBeforeUnmount } from 'vue'
import useApi from '@/hooks/useApi'
import { store } from '@/store/store'
import useEditors from '@/hooks/useEditors'
import OrderSelect from '@/components/admin/orders/OrderSelect.vue'

const { fetch, fetchWithParams } = useApi()
const editors = useEditors()
const props = defineProps(['id', 'pagination'])
const emit = defineEmits(['update:items', 'update:pagination'])
const url = `api/order/${props.id}`
const item = ref({})
const statuses = ref([])
const status = ref({})

const patch = () => {
  fetch('patch', url, { status: status.value }, '')
}
fetch('get', 'api/status').then((res) => {
  statuses.value = res.data.items
})

fetch('get', url, {}, 'ItemLoading').then((res) => {
  item.value = res.data
  status.value = res.data.status
})

const intervalId = setInterval(() => {
  fetch('get', url, {}, '').then((res) => {
    item.value = res.data
  })
}, 1000)

onBeforeUnmount(() => {
  clearInterval(intervalId)
})

const deleteItem = () => {
  fetchWithParams('delete', url, props.pagination, 'ItemLoading').then(
    (res) => {
      emit('update:pagination', res.data.pagination)
      emit('update:items', res.data.items)
      clearInterval(intervalId)
    }
  )
}
</script>
<style lang="scss">
@import '@/styles/data.scss';
@import '@/styles/order.scss';
</style>
