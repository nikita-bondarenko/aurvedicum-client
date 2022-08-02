<template>
  <div class="content__top">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link :to="{ name: 'adminMenu' }" class="breadcrumbs__link">
          Меню
        </router-link>
      </li>

      <li class="breadcrumbs__item">
        <span class="breadcrumbs__link" disabled> Товары </span>
      </li>
    </ul>
  </div>

  <div class="content__catalog data-base">
    <div class="settings">
      <BaseFilter @submit="getData()" v-model:settings="config"></BaseFilter>
    </div>

    <section class="catalog">
      <router-link
        :to="{ name: 'adminAddProduct' }"
        class="data-base__button-add"
        >Добавить</router-link
      >
      <BaseSpinner v-if="store.isLoading"></BaseSpinner>

      <ul class="data-base__list">
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
import BaseFilter from '@/components/BaseFilter.vue'
import BaseSpinner from '@/components/small/BaseSpinner.vue'
import { watch, ref } from 'vue'
import useApi from '@/hooks/useApi'
import { store } from '@/store/store'
import PaginationBase from '@/components/small/PaginationBase.vue'
import ListItem from '@/components/admin/products/ListItem.vue'
const { fetchWithParams } = useApi()
const config = ref({ page: 1, limit: 6 })
const items = ref([])
const pagination = ref({})
const getData = (obj = {}) => {
  fetchWithParams(
    'get',
    'api/products',
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
getData()
// const intervalId = setInterval(() => {
//   fetchWithParams('get', 'api/products', config.value, '').then((res) => {
//     items.value = res.data.items
//     pagination.value = res.data.pagination
//   })
// }, 100)
// onBeforeUnmount(() => clearInterval(intervalId))
</script>
<style lang="scss">
@import '@/styles/data.scss';

@import '@/styles/style.scss';
</style>
