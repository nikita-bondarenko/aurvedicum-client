<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item">
      <router-link :to="{ name: 'adminMenu' }" class="breadcrumbs__link">
        Меню
      </router-link>
    </li>
    <li class="breadcrumbs__item">
      <router-link :to="{ name: 'adminAdditions' }" class="breadcrumbs__link">
        Разное
      </router-link>
    </li>
    <li class="breadcrumbs__item">
      <span class="breadcrumbs__link" disabled> Редактирование контента </span>
    </li>
  </ul>
  <BaseSpinner v-if="store.isLoading"></BaseSpinner>

  <ItemForm
    v-else
    :btn-prime-text="'сохранить изменения'"
    v-model:data="data"
    @submit="save"
    :error="error"
  ></ItemForm>
</template>
<script>
import ItemForm from './ItemForm.vue'
import { changeArticle } from '@/hooks/useData'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '@/store/store'
import BaseSpinner from '@/components/small/BaseSpinner.vue'
export default defineComponent({
  components: { ItemForm, BaseSpinner },
  data() {
    return {
      store
    }
  },
  setup() {
    const route = useRoute()

    return changeArticle('addition', route.params.id)
  }
})
</script>
