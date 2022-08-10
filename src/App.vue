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
@import '@/../public/css/style.min.css';

@import '@/styles/style.scss';
@mixin back {
  position: fixed;
  content: '';
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

body::before {
  z-index: -2;

  @include back;
  background: no-repeat center / cover url('../public/img/back.jpg');
  transform: rotate(180deg);
}

body::after {
  z-index: -1;
  @include back;
  background: rgba($color: #000000, $alpha: 0.6);
}

.header,
.footer {
  color: $w !important;
}

.content {
  background: $w;
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
  height: 100% !important;
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
  .subprice__item {
    width: 30px !important;
    height: 30px !important;
    font-size: 10px !important;
  }

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

@media (max-width: 740px) {
  .settings {
    border-right: 0px solid $grey;
  }

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

  .filter__button-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    margin-left: 25px;
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

@media (max-width: 380px) {
  .item {
    grid-template-rows:
      330px 490px
      1fr !important;
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

  .tabs__item:not(:last-child) {
    margin: 0;
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
    padding-left: 15px;
    padding-right: 15px;
  }

  .catalog__list {
    grid-gap: 20px 10px;
  }

  .footer__wrapper {
    padding-top: 20px;
  }
}
</style>
