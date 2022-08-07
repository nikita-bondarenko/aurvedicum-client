<template>
  <nav class="menu">
    <h1 class="menu__title">Меню</h1>

    <ul class="menu__list">
      <li class="menu__item">
        <router-link class="menu__link" :to="{ name: 'adminProducts' }"
          >Товары
        </router-link>
      </li>
      <li class="menu__item">
        <router-link class="menu__link" :to="{ name: 'adminOrders' }"
          >Заказы
        </router-link>
      </li>
      <li class="menu__item">
        <router-link class="menu__link" :to="{ name: 'adminContacts' }"
          >Контакты
        </router-link>
      </li>
      <li class="menu__item">
        <router-link class="menu__link" :to="{ name: 'adminPolitics' }"
          >Политика конф.
        </router-link>
      </li>
    </ul>
    <router-link
      v-if="route.name === 'adminProducts'"
      :to="{ name: 'adminAddProduct' }"
      class="data-base__add-button"
      >Добавить товар</router-link
    >
  </nav>
</template>
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<style lang="scss">
@import '@/styles/menu.scss';
</style>
