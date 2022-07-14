<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info">
          {{ pluralizeProductAmount(pagination.total) }}
        </span>
      </div>
    </div>

    <div class="content__catalog">
      <CatalogFilter
        v-model:search="searchValue"
        v-model:settings="config"
      ></CatalogFilter>
      <section class="catalog">
        <BaseSpinner v-if="isLoading"></BaseSpinner>
        <CatalogItems v-else :items="items"></CatalogItems>
        <PaginationBase v-model:config="config" :pagination="pagination" />
      </section>
    </div>
  </main>
</template>
<script setup>
/* eslint-disable */
import CatalogFilter from '@/components/catalog/CatalogFilter.vue'
import CatalogItems from '@/components/catalog/CatalogItems.vue'
import PaginationBase from '@/components/PaginationBase.vue'
import useApi from '@/hooks/useApi'
import { ref, watch, computed } from 'vue'
import BaseSpinner from '../components/BaseSpinner.vue'
import useEditors from '@/hooks/useEditors'
import { useRoute } from 'vue-router'
const categoryId = useRoute().params.categoryId || ''

const { pluralizeProductAmount } = useEditors()
const { getProducts } = useApi()
const isLoading = ref(true)
const isLoadingFailed = ref(false)
const items = ref([])
const pagination = ref({ pages: 1 })
const config = ref({
  categoryId,

  page: 1,
  limit: 12
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
  (value) => {
    getData()
  },
  { deep: true }
)

const searchValue = computed({
  get() {
    return ''
  },
  set(value) {
    config.value.name = value
  }
})

const configUpdated = computed({
  get() {
    return config.value
  },
  set(value) {
    Object.assign(config.value, value)
  }
})
</script>
<style lang="scss">
@import '@/styles/style.scss';

.search {
  position: relative;

  .form__input {
    padding-top: 13px;
    padding-right: 65px;
  }

  &__button {
    position: absolute;
    top: 0;
    right: 0;
    width: 65px;
    height: 100%;
    background: none;
    border: none;
    padding: 20px;
    margin: 0;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    svg path {
      fill: $light;
      transition: fill 0.2s ease-in-out;
    }

    &:hover {
      background-color: $light;

      svg path {
        fill: white;
      }
    }
  }
}

.filter__reset {
  width: 100%;
  font-size: 12px;
}
</style>
