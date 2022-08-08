<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item">
      <router-link :to="{ name: 'adminMenu' }" class="breadcrumbs__link">
        Меню
      </router-link>
    </li>
    <li class="breadcrumbs__item">
      <router-link :to="{ name: 'adminNews' }" class="breadcrumbs__link">
        Новости
      </router-link>
    </li>
    <li class="breadcrumbs__item">
      <span class="breadcrumbs__link" disabled> Создание новости </span>
    </li>
  </ul>
  <ItemForm
    :btn-prime-text="'сохранить новость'"
    v-model:data="data"
    @submit="save"
    :error="error"
  ></ItemForm>
</template>
<script>
import ItemForm from './ItemForm.vue'

import { addArticle } from '@/hooks/useData'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { ItemForm },
  setup() {
    return addArticle('new')
  }
})
</script>
