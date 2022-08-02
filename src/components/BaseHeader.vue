<template>
  <header class="header container">
    <div class="header__wrapper">
      <span
        v-if="!route.path.split('/').includes('admin') && !store.isAuth"
        class="header__info"
        >{{ pageTitle }}</span
      >

      <router-link
        to="/"
        @click="store.setCatalogPathName"
        class="header__logo"
        href="#"
      >
        <img
          src="@/../public/img/logo.png"
          alt="Логотип интернет-магазина Aurvedicum"
        />
      </router-link>

      <a
        v-if="!route.path.split('/').includes('admin') && !store.isAuth"
        class="header__tel"
      >
      </a>
      <div class="header__admin" v-if="store.isAuth">
        <button @click.prevent="logout">
          Выйти
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 320.002 320.002"
            style="enable-background: new 0 0 320.002 320.002"
            xml:space="preserve"
          >
            <g id="XMLID_6_">
              <path
                id="XMLID_7_"
                d="M51.213,175.001h173.785c8.284,0,15-6.716,15-15c0-8.284-6.716-15-15-15H51.213l19.394-19.394c5.858-5.858,5.858-15.355,0-21.213c-5.857-5.858-15.355-5.858-21.213,0L4.396,149.393c-0.351,0.351-0.683,0.719-0.997,1.103c-0.137,0.167-0.256,0.344-0.385,0.515c-0.165,0.22-0.335,0.435-0.488,0.664c-0.14,0.209-0.261,0.426-0.389,0.64c-0.123,0.206-0.252,0.407-0.365,0.619c-0.118,0.22-0.217,0.446-0.323,0.67c-0.104,0.219-0.213,0.435-0.306,0.659c-0.09,0.219-0.164,0.442-0.243,0.664c-0.087,0.24-0.179,0.477-0.253,0.722c-0.067,0.222-0.116,0.447-0.172,0.672c-0.063,0.249-0.133,0.497-0.183,0.751c-0.051,0.259-0.082,0.521-0.119,0.782c-0.032,0.223-0.075,0.443-0.097,0.669c-0.048,0.484-0.073,0.971-0.074,1.457c0,0.007-0.001,0.015-0.001,0.022c0,0.007,0.001,0.015,0.001,0.022c0.001,0.487,0.026,0.973,0.074,1.458c0.022,0.223,0.064,0.44,0.095,0.661c0.038,0.264,0.069,0.528,0.121,0.79c0.05,0.252,0.119,0.496,0.182,0.743c0.057,0.227,0.107,0.456,0.175,0.681c0.073,0.241,0.164,0.474,0.248,0.71c0.081,0.226,0.155,0.453,0.247,0.675c0.091,0.22,0.198,0.431,0.3,0.646c0.108,0.229,0.21,0.46,0.33,0.685c0.11,0.205,0.235,0.4,0.354,0.599c0.131,0.221,0.256,0.444,0.4,0.659c0.146,0.219,0.309,0.424,0.466,0.635c0.136,0.181,0.262,0.368,0.407,0.544c0.299,0.364,0.616,0.713,0.947,1.048c0.016,0.016,0.029,0.034,0.045,0.05l45,45.001c2.93,2.929,6.768,4.394,10.607,4.394c3.838-0.001,7.678-1.465,10.606-4.393c5.858-5.858,5.858-15.355,0.001-21.213L51.213,175.001z"
              />
              <path
                id="XMLID_8_"
                d="M305.002,25h-190c-8.284,0-15,6.716-15,15v60c0,8.284,6.716,15,15,15s15-6.716,15-15V55h160v210.001h-160v-45.001c0-8.284-6.716-15-15-15s-15,6.716-15,15v60.001c0,8.284,6.716,15,15,15h190c8.284,0,15-6.716,15-15V40C320.002,31.716,313.286,25,305.002,25z"
              />
            </g>
          </svg>
        </button>
        <span>Админ</span>
      </div>
      <router-link
        v-if="!route.path.split('/').includes('admin')"
        :to="{ name: 'basket' }"
        class="header__cart"
        :class="{ 'spinner-small': basketCounterLoading }"
        aria-label="Корзина с товарами"
      >
        <svg viewBox="0 0 19 24">
          <path
            fill="#000"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.895.752c-2.6 0-4.779 1.955-4.779 4.45v.684H4.094a2.5 2.5 0 00-2.497 2.372l-.65 12.686a2.5 2.5 0 002.496 2.628h12.903a2.5 2.5 0 002.497-2.628l-.65-12.686a2.5 2.5 0 00-2.497-2.372h-1.023v-.685c0-2.494-2.178-4.45-4.778-4.45zm4.778 8.362a.854.854 0 01-.5 1.55.856.856 0 01-.5-1.55V6.886H6.116v2.228a.855.855 0 01-.5 1.55.856.856 0 01-.5-1.55V6.886H4.094a1.5 1.5 0 00-1.499 1.423l-.65 12.686a1.5 1.5 0 001.498 1.577h12.903a1.5 1.5 0 001.498-1.577l-.65-12.686a1.5 1.5 0 00-1.498-1.423h-1.023v2.228zm-1-3.228v-.685c0-1.868-1.653-3.45-3.778-3.45-2.126 0-3.779 1.582-3.779 3.45v.685h7.557z"
          ></path>
        </svg>
        <span
          v-if="basketItemsQuantity > 0"
          class="header__count"
          aria-label="Количество товаров"
          >{{ store.basketItemsQuantity }}</span
        >
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

const { getBasket, fetchWithParams } = useApi()
const { basketPaginationConfig, basketCounterLoading, basketItemsQuantity } =
  toRefs(store)
const pageTitle = computed(() => {
  if (route.name === 'item') {
    return 'Страница товара'
  }
  if (route.name === 'basket') {
    return 'Корзина'
  }

  if (route.name === 'order' || route.name === 'orderInfo') {
    return 'Оформление заказа'
  }

  if (route.name === 'admin') {
    return 'Аутентификация'
  }

  return 'Каталог'
})

const logout = () => {
  localStorage.removeItem('orderedBasketId')
  localStorage.setItem('userAccessKey', '')
  store.clearBasketData()
  fetchWithParams('get', 'admin/logout', {
    sessionId: localStorage.getItem('sessionId')
  })
    .then(() => store.updateProp('isAuth', false))
    .catch(() => store.updateProp('isAuth', false))
}

fetchWithParams('get', 'admin/', {
  sessionId: localStorage.getItem('sessionId') || ''
}).then((res) => {
  store.updateProp('isAuth', res.data)
})

watch(
  () => basketPaginationConfig.value,
  (value) => {
    getBasket(value)
  },
  { deep: true }
)

getBasket(basketPaginationConfig.value)
store.getBasketStatus()

watch(
  () => route.name,
  (value) => {
    store.getBasketStatus()
    if (value !== 'admin' && value.includes('admin')) {
      store.updateWithStorage('page', {
        name: route.name,
        params: { id: route.params.id }
      })
    }
    if (value === 'orderInfo') getBasket(basketPaginationConfig.value)
  }
)
</script>
<style lang="scss">
@import '@/styles/style.scss';

.header__admin {
  display: flex;
  justify-content: space-between;
  transform: translateY(2px);
  height: 100%;
  grid-column: 1/2;
  grid-row: 1/3;
  flex-direction: column-reverse;

  span {
    display: block;
    white-space: nowrap;
    opacity: 0.5;
  }
  button {
    line-height: 1;
    position: relative;
    margin-right: 20px;
    margin-left: -6px;
    background-color: transparent;
    border-color: transparent;
    cursor: pointer;
    text-transform: uppercase;
    width: fit-content;
    font-family: inherit;
    padding: 0 0 0 25px;
    transition: color 0.2s ease-in-out;
    svg {
      path {
        transition: fill 0.2s ease-in-out;
      }
      position: absolute;
      left: 0;
      bottom: 0;
      height: 20px;
    }

    &:hover {
      color: $red;
      svg path {
        fill: $red;
      }
    }
  }
}

#icon-cart {
  path {
    transition: stroke 0.2s ease-in-out;
  }
}

.header__cart {
  height: 33px;

  svg {
    width: 24px;
    height: 30px;
    path {
      transition: fill 0.2s ease-in-out;
    }
  }

  &:hover {
    svg path {
      fill: $green;
    }
  }
  &.spinner-small {
    &::after {
      left: calc(50% - 12px);
      top: calc(50% - 12px);
      width: 24px;
      height: 24px;
      border-width: 3px;
    }
    &::before {
      right: -20px;
      bottom: -20px;
    }
  }
}

.header__logo {
  width: auto !important;

  height: auto !important;
  grid-row: 1/3;
  grid-column: 1/5;
  z-index: 0;
  margin-top: -47px !important;
  margin-bottom: -37px !important;
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

@media (max-width: 920px) {
  .header__admin {
    button {
      margin: 10px 0 0 -7px;
    }
  }
}

@media (max-width: 600px) {
  .header__admin {
    max-width: 100px;
    span {
      white-space: break-spaces;
    }
  }
}

@media (max-width: 400px) {
  .header__admin {
    transform: translateY(0px);

    span {
      display: none;
    }
    button {
      svg {
        height: 100%;
      }
      font-size: 0;
      height: 30px;
    }
  }
}
</style>
