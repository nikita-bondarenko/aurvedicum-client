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
        <span class="breadcrumbs__link" disabled> Изменение товара </span>
      </li>
    </ul>
  </div>
  <BaseSpinner v-if="store.isLoading"></BaseSpinner>

  <ItemForm
    v-else
    :text="'сохранить изменения'"
    v-model:data="data"
    @submit="save"
    :formError="error"
  >
  </ItemForm>
</template>
<script setup>
import ItemForm from '@/components/admin/products/ItemForm.vue'
import { ref } from 'vue'
import useApi from '@/hooks/useApi'
import router from '@/router'
import { useRoute } from 'vue-router'
import { store } from '@/store/store'
import BaseSpinner from '@/components/small/BaseSpinner.vue'
const { fetch } = useApi()
const data = ref({
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
})
const error = ref({})
const id = useRoute().params.id

const save = () => {
  const body = data.value
  body.description = body.description.filter((item) =>
    item.content.some((obj) => !!obj.paragraph)
  )
  if (body.description) {
    body.description.forEach((item) => {
      item.content = item.content.filter((item) => !!item.paragraph)
    })
  }
  fetch('patch', `api/products/${id}`, body, 'SaveLoading')
    .then(() => {
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
fetch('get', `api/products/${id}`)
  .then((res) => {
    data.value = res.data
    console.log(res.data.recomend.ids)
    store.updateProp('recomendIds', res.data.recomend.ids)
  })
  .catch(() => router.push({ path: 'adminNotFound' }))
</script>
