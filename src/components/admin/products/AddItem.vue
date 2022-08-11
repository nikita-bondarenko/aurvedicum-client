<template>
  <div class="content__top">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link :to="{ name: 'adminMenu' }" class="breadcrumbs__link">
          Меню
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <router-link :to="{ name: 'adminProducts' }" class="breadcrumbs__link">
          Товары
        </router-link>
      </li>

      <li class="breadcrumbs__item">
        <span class="breadcrumbs__link" disabled> Добавление товара </span>
      </li>
    </ul>
  </div>

  <ItemForm
    :text="'добавить товар'"
    v-model:data="data"
    @submit="create"
    :formError="error"
  >
  </ItemForm>
</template>
<script setup>
import ItemForm from '@/components/admin/products/ItemForm.vue'
import { ref, watch, onBeforeUnmount } from 'vue'
import useApi from '@/hooks/useApi'
import router from '@/router'
import { store } from '@/store/store'
const { fetch } = useApi()
const data = ref(
  JSON.parse(localStorage.getItem('createData')) || {
    volumes: [],
    categories: [],
    brands: [],
    images: [],
    description: [
      {
        header: 'Полезные свойства',
        content: [],
        id: 1
      },
      { header: 'Преминение', content: [], id: 2 },
      { header: 'Противопоказания', content: [], id: 3 },
      { header: 'Состав', content: [], id: 4 }
    ],
    recomend: { ids: [], brands: [], categories: [] }
  }
)

store.updateProp('recomendIds', data.value.recomend.ids)
watch(
  () => store.recomendIds,
  (value) => {
    data.value.recomend.ids = value
  }
)

watch(
  () => data.value,
  (value) => {
    store.updateProp('recomendBrands', value.recomend.brands)
    store.updateProp('recomendCategories', value.recomend.categories)
  },
  { deep: true, immediate: true }
)

const error = ref({})
const create = () => {
  const body = JSON.parse(localStorage.getItem('createData'))
  body.description = body.description.filter((item) =>
    item.content.some((obj) => !!obj.paragraph)
  )
  if (body.description) {
    body.description.forEach((item) => {
      item.content = item.content.filter((item) => !!item.paragraph)
    })
  }
  fetch('post', 'api/products', body, 'SaveLoading')
    .then(() => {
      localStorage.removeItem('createData')
      router.push({ name: 'adminProducts' })
    })
    .catch((err) => {
      error.value = err.response.data
      data.value.description.forEach((item) => {
        if (item.content.length === 1) return
        item.content = item.content.filter((item) => !!item.paragraph)
      })
    })
}

watch(
  () => data.value,
  (value) => {
    localStorage.setItem('createData', JSON.stringify(value))
  },
  { deep: true, immediate: true }
)

onBeforeUnmount(() => store.updateProp('recomendIds', []))
</script>
