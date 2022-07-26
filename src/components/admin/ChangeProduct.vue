<template>
  <BaseSpinner v-if="store.isLoading"></BaseSpinner>

  <AdminForm
    v-else
    :text="'сохранить изменения'"
    v-model:data="data"
    @submit="save"
    :formError="error"
  >
  </AdminForm>
</template>
<script setup>
import AdminForm from './AdminForm.vue'
import { ref } from 'vue'
import useApi from '@/hooks/useApi'
import router from '@/router'
import { useRoute } from 'vue-router'
import { store } from '@/store/store'
import BaseSpinner from '../small/BaseSpinner.vue'
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
  ]
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
  console.log(body)
  fetch('patch', `api/products/${id}`, body, 'SaveLoading')
    .then(() => {
      router.push({ name: 'adminProducts' })
    })
    .catch((err) => {
      console.log(err)
      error.value = err.response.data
      data.value.description.forEach((item) => {
        if (item.content.length === 1) return
        item.content = item.content.filter((item) => !!item.paragraph)
      })
    })
}
fetch('get', `api/products/${id}`)
  .then((res) => (data.value = res.data))
  .catch(() => router.push({ path: 'adminNotFound' }))
</script>
