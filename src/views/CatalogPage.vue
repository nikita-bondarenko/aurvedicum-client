<template>
  <main class="content container">
    <div v-if="store.isOrderedBasket" class="content__top">
      <ul class="breadcrumbs">
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
          <router-link :to="store.page" class="breadcrumbs__link">
            Изменение заказа
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link"> Каталог </span>
        </li>
      </ul>
    </div>
    <div v-if="isAdmin" class="content__top">
      <ul class="breadcrumbs">
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
          <router-link
            :to="{ name: 'adminOrderAdd' }"
            class="breadcrumbs__link"
          >
            Оформление заказа
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link"> Каталог </span>
        </li>
      </ul>
    </div>

    <div class="content__catalog">
      <section class="settings">
        <BaseSearch v-model="searchValue"></BaseSearch>
        <BaseFilter v-model:settings="config"></BaseFilter>
      </section>

      <section id="catalog" class="catalog">
        <BaseSpinner v-if="isLoading"></BaseSpinner>
        <CatalogItems :is-admin="isAdmin" v-else :items="items"></CatalogItems>
        <PaginationBase
          v-if="pagination.pages > 1"
          class="catalog__pagination"
          v-model:config="config"
          :pagination="pagination"
        />
      </section>
    </div>
  </main>
</template>
<script setup>
import BaseFilter from '@/components/BaseFilter.vue'
import CatalogItems from '@/components/catalog/CatalogItems.vue'
import PaginationBase from '@/components/small/PaginationBase.vue'
import useApi from '@/hooks/useApi'
import { ref, watch, computed } from 'vue'
import BaseSpinner from '../components/small/BaseSpinner.vue'
import { useRoute, useRouter } from 'vue-router'
import BaseSearch from '@/components/BaseSearch.vue'
import { store } from '@/store/store'
if (localStorage.getItem('pathname')) {
  useRouter().push(localStorage.getItem('pathname'))
}

const isAdmin = computed(() => {
  if (!useRoute().name) return false
  return useRoute().name === 'adminCatalog'
})
const categoryId = useRoute().params.categoryId || ''
const { getProducts } = useApi()
const isLoading = ref(true)
const isLoadingFailed = ref(false)
const items = ref([])
const pagination = ref({ pages: 1 })
const config = ref({
  categoryId,

  page: 1,
  limit: 6
})
const getData = async (obj = {}) => {
  isLoading.value = true
  isLoadingFailed.value = false
  try {
    const res = await getProducts(Object.assign({}, config.value, obj))
    items.value = res.data.items
    pagination.value = res.data.pagination
    if (res.data.items) {
      isLoading.value = false
    }
  } catch {
    isLoadingFailed.value = true
    isLoading.value = false
  }
}
getData()
watch(
  () => config.value,
  () => {
    searchValue.value = config.value.name

    getData()
  },
  { deep: true }
)

const searchValue = ref(null)

watch(
  () => searchValue.value,
  (value) => (config.value.name = value)
)
</script>
<style lang="scss">
@import '@/styles/style.scss';
</style>
