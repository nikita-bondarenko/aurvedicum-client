<template>
  <div class="content__top">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link :to="{ name: 'adminMenu' }" class="breadcrumbs__link">
          Меню
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <router-link :to="{ name: 'adminContacts' }" class="breadcrumbs__link">
          Контакты
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <span class="breadcrumbs__link" disabled> Создание контакта </span>
      </li>
    </ul>
  </div>
  <ItemForm
    :btn-prime-text="'добавить контакт'"
    v-model:data="data"
    @submit="save"
    :error="error"
  ></ItemForm>
</template>
<script>
import { addContact } from '@/hooks/useData'
import { defineComponent } from 'vue'
import ItemForm from './ItemForm.vue'

export default defineComponent({
  components: { ItemForm },
  setup() {
    return addContact()
  }
})
</script>
