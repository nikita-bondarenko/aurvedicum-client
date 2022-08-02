<template>
  <div class="content__top">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link :to="{ name: 'adminMenu' }" class="breadcrumbs__link">
          Меню
        </router-link>
      </li>

      <li class="breadcrumbs__item">
        <span class="breadcrumbs__link" disabled> Заказы </span>
      </li>
    </ul>
  </div>

  <div class="content__catalog order data-base">
    <div class="settings">
      <BaseSearch v-model="config.name"></BaseSearch>
      <OrderFilter v-model:settings="config"></OrderFilter>
    </div>

    <section class="catalog">
      <router-link :to="{ name: 'order' }" class="data-base__button-add">
        Добавить заказ</router-link
      >
      <BaseSpinner v-if="store.isLoading"></BaseSpinner>
      <p
        class="data-base__empty-message"
        v-if="items.length === 0 && !store.isLoading"
      >
        Список пуст
      </p>
      <ul class="data-base__list order__list">
        <ListItem
          v-for="item in items"
          :key="item.id"
          :id="item.id"
          v-model:items="items"
          v-model:pagination="pagination"
        ></ListItem>
      </ul>
      <PaginationBase
        v-if="pagination.pages > 1"
        class="catalog__pagination"
        v-model:config="config"
        :pagination="pagination"
      />
    </section>
  </div>
</template>
<script setup>
import BaseSearch from '@/components/BaseSearch.vue'
import BaseSpinner from '@/components/small/BaseSpinner.vue'
import { watch, ref } from 'vue'
import useApi from '@/hooks/useApi'
import { store } from '@/store/store'
import PaginationBase from '@/components/small/PaginationBase.vue'
import ListItem from '@/components/admin/orders/ListItem.vue'
import OrderFilter from '@/components/admin/orders/OrderFilter.vue'
const { fetchWithParams } = useApi()
const config = ref({ page: 1, limit: 6 })
const items = ref([])
const pagination = ref({})
const getData = (obj = {}) => {
  fetchWithParams(
    'get',
    'api/order',
    Object.assign({}, config.value, obj)
  ).then((res) => {
    items.value = res.data.items
    pagination.value = res.data.pagination
  })
}
watch(
  () => config.value,
  () => getData(),
  { deep: true }
)
watch(
  () => config.value,
  (value) => {
    if (value.status) config.value.statusId = value.status.id

    if (value.lowBorder) {
      config.value.lowBorderParse = Date.parse(
        new Date(value.lowBorder + 'T00:00:00')
      )
    }
    if (value.highBorder) {
      config.value.highBorderParse = Date.parse(
        new Date(value.highBorder + 'T23:59:59')
      )
    }
  },
  { deep: true }
)
getData()
</script>
<style lang="scss">
@import '@/styles/data.scss';
</style>
