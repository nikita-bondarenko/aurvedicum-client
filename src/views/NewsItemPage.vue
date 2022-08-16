<template>
  <main class="container content">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'news' }" class="breadcrumbs__link">
            Новости
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link" disabled> "{{ data.header }}" </span>
        </li>
      </ul>
    </div>
    <BaseSpinner v-if="store.isLoading"></BaseSpinner>
    <BasePageItem v-else :data="data"></BasePageItem>
  </main>
</template>
<script>
import { defineComponent } from 'vue'
import { newsItem } from '@/hooks/useContent'
export default defineComponent(newsItem)
</script>
<style lang="scss">
@import '@/styles/page.scss';
</style>
