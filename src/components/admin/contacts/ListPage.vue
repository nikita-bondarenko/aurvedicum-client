<template>
  <div class="content__top">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link :to="{ name: 'adminMenu' }" class="breadcrumbs__link">
          Меню
        </router-link>
      </li>

      <li class="breadcrumbs__item">
        <span class="breadcrumbs__link" disabled> Контакты </span>
      </li>
    </ul>
  </div>
  <section class="catalog content__catalog contact">
    <router-link
      :to="{ name: 'adminAddContact' }"
      class="data-base__button-add"
    >
      Добавить</router-link
    >
    <BaseSpinner v-if="store.isLoading"></BaseSpinner>

    <ul v-else class="data-base__list">
      <li v-for="item in items" :key="item.id" class="data-base__item">
        <div class="data-base__contact">
          <h3 class="contact__header">{{ item.header }}</h3>
          <div class="contact__info">
            <ul class="contact__list">
              <li
                v-show="limb.value"
                v-for="(limb, index) in item.body"
                :key="index"
                class="contact__item"
              >
                <span class="contact__title">{{ limb.name }}:</span>
                <span class="contact__value">{{ limb.value }}</span>
              </li>
            </ul>
          </div>
          <span class="contact__phone">{{ item.phone }}</span>
          <router-link
            class="data-base__change-button"
            :to="{ name: 'adminChangeContact', params: { id: item.id } }"
            >Изменить</router-link
          >
          <button
            class="data-base__button-del button-del"
            type="button"
            aria-label="Удалить товар"
            @click.prevent="deleteItem(item.id)"
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
    </ul>
    <PaginationBase
      v-if="pagination.pages > 1"
      class="catalog__pagination"
      v-model:config="config"
      :pagination="pagination"
    />
  </section>
</template>
<script setup>
import { ref, watch } from 'vue'
import useApi from '@/hooks/useApi'
import { store } from '@/store/store'
import BaseSpinner from '@/components/small/BaseSpinner.vue'
import PaginationBase from '@/components/small/PaginationBase.vue'
const { fetchWithParams, fetch } = useApi()
const config = ref({
  limit: 6,
  page: 1
})
const pagination = ref({})
const items = ref([])
const getData = () => {
  fetchWithParams('get', 'api/contacts', config.value).then((res) => {
    pagination.value = res.data.pagination
    items.value = res.data.items
    console.log(res.data)
  })
}

const deleteItem = (id) => {
  fetch('delete', `api/contacts/${id}`, {}, '').then(() => getData())
}

watch(
  () => config.value,
  () => getData(),
  { deep: true, immediate: true }
)
</script>
<style lang="scss">
@import '@/styles/data.scss';
</style>
