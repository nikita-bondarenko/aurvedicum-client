<template>
  <MenuModal></MenuModal>
  <BaseHeader></BaseHeader>
  <router-view></router-view>

  <BaseFooter></BaseFooter>
  <teleport to="#back">
    <div class="back__image"></div>
    <div class="back__shadow"></div>
  </teleport>
</template>
<script setup>
import BaseHeader from './components/BaseHeader.vue'
import BaseFooter from './components/BaseFooter.vue'
import MenuModal from '@/components/MenuModal.vue'
import { onMounted, nextTick } from 'vue'

onMounted(() => {
  const back = document.getElementById('back')
  nextTick(() => {
    back.style.width = `${document.body.clientWidth}px`
    back.style.height = `${screen.height}px`
  })
})
</script>
<style lang="scss">
@import '@/../public/css/style.min.css';

@import '@/styles/style.scss';

.form__error-block {
  border-color: $red;
  h4 {
    color: $red;
  }
}

:focus,
:focus-visible {
  outline: none !important;
}

@mixin parentSize {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.back {
  z-index: -10000;
  position: fixed;
  top: 0;
  left: 0;
  &__image {
    @include parentSize();
    background: no-repeat top left / cover url('../public/img/back.jpg') red;
    transform: rotate(180deg);
  }
  &__shadow {
    @include parentSize();

    background: rgba($color: #000000, $alpha: 0.6);
  }
}

.header,
.footer {
  color: $w !important;
}

.content {
  position: relative;
  &::before {
    z-index: -1000;
    @include back;
    position: absolute;
    content: '';
    background: $w;
  }
}

.settings {
  border-right: 1px solid $grey;
}

.form__legend {
  color: #c73f03;
  font-size: 24px;
  text-transform: uppercase;
}

.options__radio:checked ~ .options__value {
  background-color: $red;
  color: #fff;
}

.options__label:hover .options__value {
  background-color: lighten($red, 30%);
}

.catalog__error--empty {
  display: inline-block;
  margin: 20px auto 60px;
  text-align: center;
}

.form__legend {
  @include fontCondenced;
}

.item__title,
.content__title {
  margin: 0;
}

.order {
  &__comment textarea {
    padding-top: 30px;
  }
}

*,
::after,
::before {
  box-sizing: border-box !important;
}

.pagination__item {
  cursor: pointer;
}

.loading-error {
  position: relative;
  @include disabled;
  &::after {
    z-index: 10000;
    position: absolute;
    content: 'Не удалось загрузить товар';
    color: $red;
    text-align: center;
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    max-width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.filter {
  z-index: 10000;
}

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
  width: auto;
}

img {
  width: 100% !important;
}

.content__top {
  display: grid;
  grid-gap: 15px;
}

.footer__data {
  grid-template-columns: auto;
  justify-content: end;
  li {
    text-align: end;
  }
}

.footer__link:focus,
.footer__link:hover {
  border-color: $red;
}

.filter__button-wrapper {
  display: none;
}

@media (max-width: 1240px) {
  .catalog__list {
    grid-template-columns: repeat(2, 270px);
    margin-right: auto;
    margin-left: auto;
  }
}

@media (max-width: 1000px) {
  .catalog__list {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 25px 15px;
  }
}

@media (max-width: 920px) {
  .catalog__pic img {
    height: 200px;
  }

  .subprice__item {
    width: 30px !important;
    height: 30px !important;
    font-size: 10px !important;
  }

  .catalog__volume {
    grid-template-columns: repeat(2, 1fr) !important;
  }

  .catalog__pic {
    width: auto;
    height: auto;
  }
}

@media (max-width: 740px) {
  .content__top {
    display: none;
  }
  // .breadcrumbs {
  // }
  .button--second {
    padding-top: 19px !important;
  }

  .settings {
    border-right: 0px solid $grey;
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

  .filter__button-wrapper {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 50px;
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
      height: 470px;
      .form {
        transform: translateY(0);
      }
      &_overflow {
        overflow: visible;
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

@media (max-width: 380px) {
  .item {
    &__row {
      grid-gap: 20px 10px !important;
    }
    &__price {
      font-size: 20px !important;
    }
    &__subprice {
      font-size: 16px !important;
    }
    &__title {
      line-height: 1.2;
    }
  }

  .tabs__link {
    padding: 10px;
  }

  // .item__row {
  //   grid-template-columns: 1fr !important;
  // }
  .form__counter {
    margin: auto;
    width: 130px;
    input {
      width: 40px;
      height: 40px;
    }
  }

  .container {
    padding-left: 10px;
    padding-right: 10px;
  }

  .catalog__list {
    grid-gap: 20px 10px;
  }
}
</style>
