<template>
  <main class="content container">
    <div class="content__top">
      <ul v-if="isAdmin" class="breadcrumbs">
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
          <router-link
            :to="{ name: 'adminOrderAdd' }"
            class="breadcrumbs__link"
          >
            Оформление заказа
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link"> Корзина </span>
        </li>
      </ul>

      <ul v-if="store.isOrderedBasket" class="breadcrumbs">
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
          <span class="breadcrumbs__link"> Корзина </span>
        </li>
      </ul>

      <ul v-else class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'catalog' }" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link"> Корзина </span>
        </li>
      </ul>

      <span class="content__info">В корзине {{ total.toLowerCase() }} </span>
    </div>
    <BaseSpinner v-if="isBasketLoading && !isBasketLoadingFailed"></BaseSpinner>
    <div v-else-if="isBasketLoadingFailed" class="failed-loading">
      Не удалось загрузить информацию, попробуйте перезагрузить страницу.
    </div>

    <section v-else class="cart">
      <p style="text-align: center" v-if="basketItems.length === 0">
        Корзина пуста
      </p>
      <form v-else class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <router-link
            v-if="store.isOrderedBasket"
            :to="{ name: 'catalog' }"
            @click="store.setCatalogPathName"
            class="button button--second cart__catalog-link"
            >Добавить товар из каталога</router-link
          >
          <ul class="cart__list">
            <BasketItem
              v-for="item in basketItems"
              :item="item"
              :key="item.id"
            ></BasketItem>
          </ul>
          <PaginationBase
            v-if="basketPagination.pages > 1"
            v-model:config="config"
            :pagination="basketPagination"
          ></PaginationBase>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice }} &nbsp;₽</span>
          </p>
          <router-link
            v-if="store.isOrderedBasket"
            :to="store.page"
            v-show="isEmpty"
            class="cart__button button button--primery"
          >
            Перейти к заказу
          </router-link>

          <router-link
            v-else
            :to="{ name: isAdmin ? 'adminOrderAdd' : 'order' }"
            v-show="isEmpty"
            class="cart__button button button--primery"
            >Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import { computed, toRefs, defineComponent } from 'vue'
import useEditors from '@/hooks/useEditors'
import BasketItem from '@/components/basket/BasketItem.vue'
import BaseSpinner from '@/components/small/BaseSpinner.vue'
import PaginationBase from '@/components/small/PaginationBase.vue'
import { store } from '@/store/store'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: { BasketItem, BaseSpinner, PaginationBase },
  setup() {
    const isAdmin = computed(() => {
      if (!useRoute().name) return false
      return useRoute().name === 'adminBasket'
    })
    const { pluralizeProductAmount, editNumberFormat } = useEditors()
    const {
      basketItemsQuantity,
      basketTotalPrice,
      basketItems,
      isBasketLoading,
      isBasketLoadingFailed,
      basketPagination,
      basketPaginationConfig
    } = toRefs(store)

    const config = computed({
      get() {
        return basketPaginationConfig.value
      },
      set(value) {
        store.updateProp('basketPaginationConfig', value)
      }
    })

    const isEmpty = computed(() => {
      return basketItems.value.length > 0
    })
    const total = computed(() => {
      return pluralizeProductAmount(basketItemsQuantity.value)
    })

    const totalPrice = computed(() => {
      return editNumberFormat(basketTotalPrice.value)
    })
    return {
      isAdmin,
      config,
      basketPagination,
      store,
      isBasketLoading,
      basketItems,
      isBasketLoadingFailed,
      totalPrice,
      total,
      isEmpty
    }
  }
})
</script>
<style lang="scss">
@import '@/styles/style.scss';
.cart__catalog-link {
  margin-bottom: 40px;
}

.cart__button {
  display: block;
  text-align: center;
}

.product {
  grid-template-columns: 120px 280px 140px 65px 20px;
}

.product__del {
  cursor: pointer;

  svg path {
    transition: stroke 0.2s ease-in-out;
  }

  &:hover {
    svg path {
      stroke: $hover;
    }
  }
}

.cart__block {
  width: fit-content;
}

@media (max-width: 1200px) {
  .cart {
    &__form {
      grid-template-columns: auto;
      grid-template-rows: auto;
      grid-gap: 70px;
    }
  }
}

@media (max-width: 780px) {
  .product {
    grid-template-columns: 120px 280px 20px;

    &__pic {
      grid-row: 1/5;
    }

    &__counter {
      grid-column: 1/2;
      grid-row: 5/6;
    }

    &__price {
      grid-column: 2/3;
      grid-row: 2/3;
    }

    &__info {
      grid-row: 3/4;
    }

    &__code {
      grid-row: 4/5;
    }

    &__del {
      grid-column: 3/4;
    }
  }
}

@media (max-width: 510px) {
  .product {
    grid-template-columns: auto 30px;
    grid-template-rows: 30px auto;

    &__title {
      grid-column: 1/3;
      grid-row: 3/4;
    }

    &__pic {
      grid-column: 1/3;
      grid-row: 1/3;
      width: 100%;

      img {
        width: 100%;
      }
    }

    &__price {
      font-size: 24px;
      grid-column: 1/3;
      grid-row: 4/5;
      font-weight: 400;
    }

    &__info {
      grid-column: 1/3;
      grid-row: 5/6;
    }

    &__code {
      grid-column: 1/3;
      grid-row: 6/7;
    }

    &__counter {
      grid-column: 1/3;
      grid-row: 7/8;
    }

    &__del {
      grid-column: 2/3;
      grid-row: 1/2;
      margin: auto;
    }
  }

  .cart__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px 30px;
  }

  .cart__item:not(:last-child) {
    margin-bottom: 0;
  }
}

@media (max-width: 350px) {
  .cart__list {
    grid-gap: 30px 15px;
  }
}
</style>
