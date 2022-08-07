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
        <span class="breadcrumbs__link" disabled>
          Редактирование контакта
        </span>
      </li>
    </ul>
  </div>
  <ItemForm
    :btn-prime-text="'cохранить изменения'"
    v-model:data="data"
    @submit="save"
    :error="error"
  ></ItemForm>
</template>
<script>
import { changeContact } from '@/hooks/useData'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

import ItemForm from '@/components/admin/contacts/ItemForm.vue'
export default defineComponent({
  components: { ItemForm },
  setup() {
    const route = useRoute()

    return changeContact(route.params.id)
  }
})
</script>
