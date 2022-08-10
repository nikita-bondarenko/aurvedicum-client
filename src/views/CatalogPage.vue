<template>
  <main class="content container">
    <div v-if="store.isOrderedBasket" class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'adminMenu' }" class="breadcrumbs__link">
            Меню
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'adminOrders' }" class="breadcrumbs__link">
            Заказы
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="store.page" class="breadcrumbs__link">
            Изменение заказа
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link"> Каталог </span>
        </li>
      </ul>
    </div>
    <CatalogVue class="recomend__catalog"></CatalogVue>
  </main>
</template>
<script setup>
import CatalogVue from '@/components/catalog/CatalogVue.vue'
import { store } from '@/store/store'
</script>
<style lang="scss">
@import '@/styles/style.scss';
</style>
