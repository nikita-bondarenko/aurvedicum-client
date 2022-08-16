<template>
  <main class="container content info">
    <BaseSpinner v-if="store.isLoading" />
    <p v-if="data.items.length === 0 && !store.isLoading" class="empty-error">
      Список пуст
    </p>
    <ul class="info__list">
      <li v-for="item in data.items" :key="item.id" class="info__item">
        <router-link :to="{ name: 'articlesItem', params: { id: item.id } }"
          ><img
            :src="IMAGE_STORE + item.filename"
            alt="Иллюстрация"
            class="info__image"
          />
          <h4 class="info__title">{{ item.header }}</h4>
        </router-link>
        <span class="info__pub"
          >Опубликованно: <b>{{ editors.editDate(item.created) }} </b></span
        >
      </li>
    </ul>
    <PaginationBase
      v-if="data.pagination.pages > 1"
      class="info__pagination"
      v-model:config="config"
      :pagination="data.pagination"
    />
  </main>
</template>
<script>
import { defineComponent } from 'vue'
import { articles } from '@/hooks/useContent'
export default defineComponent(articles)
</script>
<style lang="scss">
@import '@/styles/info.scss';
</style>
