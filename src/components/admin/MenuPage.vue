<template>
  <nav class="menu">
    <ul class="menu__list">
      <li class="menu__item">
        <router-link class="menu__link" :to="{ name: 'adminNews' }"
          >Новости
        </router-link>
      </li>

      <li class="menu__item">
        <router-link class="menu__link" :to="{ name: 'adminArticles' }"
          >Статьи
        </router-link>
      </li>

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
        <router-link class="menu__link" :to="{ name: 'adminAdditions' }"
          >Разное
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<script setup></script>
<style lang="scss">
@import '@/styles/menu.scss';
</style>
