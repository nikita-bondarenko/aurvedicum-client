<template>
  <AdminForm
    :text="'добавить товар'"
    v-model:data="data"
    @submit="create"
    :formError="error"
  >
  </AdminForm>
</template>
<script setup>
import AdminForm from './AdminForm.vue'
import { ref, watch } from 'vue'
import useApi from '@/hooks/useApi'
import router from '@/router'
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
    ]
  }
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
  console.log(body)
  fetch('post', 'api/products', body, 'CreateLoading')
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
    console.log(value)
  },
  { deep: true, immediate: true }
)
</script>
