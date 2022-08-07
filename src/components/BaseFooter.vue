<template>
  <footer class="footer container">
    <div class="footer__wrapper">
      <p class="footer__desc">
        Все права на&nbsp;материалы, находящиеся на&nbsp;сайте, охраняются
        в&nbsp;соответствии с&nbsp;законодательством&nbsp;РФ, в&nbsp;том числе
        об&nbsp;авторском праве и&nbsp;смежных правах.
      </p>

      <ul class="footer__data">
        <!-- <li>
          <a
            class="footer__link"
            href="#"
            target="_blank"
            rel="noopener"
            type="application/pdf"
          >
            Политика конфиденциальности
          </a>
        </li> -->
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
      </ul>

      <span class="footer__copyright"> © 2022 Aurvedicum </span>
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
.footer__wrapper {
  min-height: 340px !important;
}

.footer__link {
  color: $w;
}
</style>
