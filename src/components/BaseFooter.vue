<template>
  <footer class="footer container">
    <div class="footer__wrapper">
      <div class="footer__left">
        <div class="footer__logo">
          <img
            src="@/../public/img/logo.png"
            alt="Логотип интернет-магазина Aurvedicum"
          />
        </div>
        <p class="footer__desc">
          Все права на&nbsp;материалы, находящиеся на&nbsp;сайте, охраняются
          в&nbsp;соответствии с&nbsp;законодательством&nbsp;РФ, в&nbsp;том числе
          об&nbsp;авторском праве и&nbsp;смежных правах.
        </p>
      </div>

      <ul class="footer__data">
        <li>
          <router-link class="footer__link" :to="{ name: 'agreement' }">
            Соглашение пользователя
          </router-link>
        </li>

        <li>
          <router-link class="footer__link" :to="{ name: 'politic' }">
            Политика конфиденц.
          </router-link>
        </li>

        <li>
          <router-link
            v-if="isAdmin"
            class="footer__link"
            @click="goOut"
            :to="{ name: 'catalog' }"
          >
            Вернуться к каталогу
          </router-link>

          <router-link v-else class="footer__link" :to="{ name: 'admin' }">
            Я администратор
          </router-link>
        </li>

        <li>
          <router-link class="footer__link" :to="{ name: 'contacts' }">
            Контакты
          </router-link>
        </li>
        <li>
          <span class="footer__copyright"> © 2022 Aurvedicum </span>
        </li>
      </ul>
    </div>
  </footer>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '@/store/store'
const route = useRoute()
const isAdmin = computed(() => {
  if (!route.name) return false
  return route.name.includes('admin') || store.isOrderedBasket
})

const goOut = () => {
  localStorage.setItem('userAccessKey', '')
  store.clearBasketData()
}
</script>
<style lang="scss">
@import '@/styles/style.scss';

.footer {
  &__wrapper {
    min-height: 340px !important;
    grid-template-columns: 1fr 1fr;
  }

  &__left {
    grid-column: 1/2;
    margin-right: auto;
  }

  &__data {
    margin-top: auto;
    margin-bottom: 0;
    grid-column: 2/3;
    grid-row: 1/2;
    margin-left: auto;
    li:not(:last-child) {
      margin-bottom: 15px;
    }
  }

  &__link {
    color: $w;
  }

  &__logo {
    width: 215px;
    margin-right: auto;
    margin-top: -30px;
    margin-bottom: -30px;
    margin-left: -18px;
  }

  &__desc {
    margin-top: 10px !important;
    width: 215px;
    margin-bottom: 0 !important;
  }
}

@media (max-width: 700px) {
  .footer {
    &__wrapper {
      grid-template-columns: 1fr;
    }
    &__logo {
      margin-left: 0 !important;
    }
    &__desc {
      padding-left: 17px;
    }
    &__left {
      grid-column: 1/2;
      grid-row: 1/2;
      margin-right: auto;
      margin-left: auto;
    }
    &__data {
      margin-top: 50px;
      margin-left: auto;
      margin-right: auto;
      grid-column: 1/2;
      grid-row: 2/3;
      justify-content: center !important;
      li {
        text-align: center !important;
      }
    }
  }
}
</style>
