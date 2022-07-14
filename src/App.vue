<template>
  <BaseHeader></BaseHeader>
  <router-view></router-view>

  <BaseFooter></BaseFooter>
  <div id="teleport-target"></div>
</template>
<script setup>
import BaseHeader from './components/BaseHeader.vue'
import BaseFooter from './components/BaseFooter.vue'
</script>
<style lang="scss">
@import '@/styles/style.scss';

.disabled {
  pointer-events: none;
  position: relative;
  &::after {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: white;
    opacity: 0.5;
  }
}

.container {
  padding-left: 50px;
  padding-right: 50px;
  max-width: 1400px;
}

img {
  width: 100% !important;
  height: 100% !important;
}

.container {
  width: auto;
  max-width: 1200px;
}

.footer__data {
  grid-template-columns: auto;
  justify-content: end;
  li {
    text-align: end;
  }
}

.button--primery {
  background-color: $red;
}

.footer__link:focus,
.footer__link:hover {
  border-color: $red;
}

.filter__button-wrapper {
  margin-top: 20px;
  display: none;
}

@media (max-width: 1220px) {
  .catalog__list {
    grid-template-columns: repeat(2, 1fr);
  }
  .header__wrapper {
    grid-template-columns: 1fr 140px 1fr 25px;
  }

  .footer__wrapper {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 920px) {
  .catalog__list {
    grid-gap: 25px 15px;
  }

  .catalog__volume {
    grid-template-columns: repeat(2, 1fr) !important;
  }

  .catalog__pic {
    width: auto;
    height: auto;
  }

  .footer__wrapper {
    grid-template-columns: auto;

    span,
    ul,
    p {
      grid-column: 1;
      grid-row: auto;
    }
  }
}

@media (max-width: 720px) {
  .header__wrapper {
    grid-column-gap: 20px;
  }

  .container {
    padding-left: 30px;
    padding-right: 30px;
  }
  .content__catalog {
    grid-template-columns: auto;

    flex-direction: column;
  }

  .content__row {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .subprice__item {
    width: 30px !important;
    height: 30px !important;
    font-size: 10px !important;
  }

  .filter__button-wrapper {
    display: block;
  }

  .filter__form {
    padding-bottom: 0;
  }

  .filter__wrapper {
    overflow: hidden;
    height: 0;
    transition: height 1s ease-in-out;
    .form {
      transform: translateY(-100%);
      transition: transform 1s ease-in-out;
    }
    &--open {
      height: 555px;
      .form {
        transform: translateY(0);
      }
    }
  }
}

@media (max-width: 500px) {
  .item__title {
    font-size: 28px;
  }

  // .item__price {
  //   font-size: 20px;
  // }
  // .item__subprice {
  //   font-size: 16px !important;
  // }

  .header__info,
  .header__tel {
    display: none;
  }
  .header__wrapper {
    grid-template-columns: auto 25px;
    grid-template-rows: auto;
  }

  .header__logo {
    grid-column: 1/3;
    grid-row: 1/3;
  }

  .header__cart {
    z-index: 100;
    grid-column: 2/3;
    grid-row: 2;
  }

  .content__info {
    margin: 0;
  }

  .pagination__link {
    height: 30px;
    min-width: 30px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .previous-arrow-icon {
      transform: translate(-1px, 1px);
    }
    .next-arrow-icon {
      transform: translate(1px, 1px);
    }
  }
}

@media (max-width: 350px) {
  .item {
    grid-template-rows: 400px 700px 1fr !important;
  }

  // .item__row {
  //   grid-template-columns: 1fr !important;
  // }
  .form__counter {
    margin: auto;
  }
}
</style>
