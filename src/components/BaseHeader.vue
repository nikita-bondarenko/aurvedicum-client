<template>
  <header class="header container">
    <div class="header__wrapper">
      <span class="header__info">{{ pageTitle }}</span>

      <a class="header__logo" href="#">
        <img src="img/logo.png" alt="Логотип интернет-магазина Aurvedicum" />
      </a>

      <a class="header__tel"> Контакты </a>

      <router-link
        :to="{ name: 'basket' }"
        class="header__cart"
        href="cart.html"
        aria-label="Корзина с товарами"
      >
        <svg width="19" height="24">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span class="header__count" aria-label="Количество товаров">{{
          store.basketItemsQuantity
        }}</span>
      </router-link>
    </div>
  </header>
</template>
<script setup>
import { computed, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '@/store/store'
import useApi from '@/hooks/useApi'
const route = useRoute()

const { getBasket } = useApi()
const { basketPaginationConfig } = toRefs(store)
const pageTitle = computed(() => {
  if (route.name === 'item') {
    return 'Страница товара'
  }
  if (route.name === 'basket') {
    return 'Корзина'
  }

  return 'Каталог'
})
watch(
  () => basketPaginationConfig.value,
  (value) => {
    getBasket(value)
  },
  { deep: true }
)
getBasket(basketPaginationConfig.value)
</script>
<style lang="scss">
.header__logo {
  height: auto;
  grid-row: 1/3;
  grid-column: 1/5;
  z-index: 0;
  margin-top: -47px;
  margin-bottom: -37px;
  img {
    height: auto !important;
  }
}
.header__info {
  grid-column: 1/2;
  grid-row: 2/3;
}

.header__cart {
  grid-column: 4/5;
  grid-row: 2/3;
}

.header__tel {
  grid-row: 2/3;

  grid-column: 3/4;
}
</style>
