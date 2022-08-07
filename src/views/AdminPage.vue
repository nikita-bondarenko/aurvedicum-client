<template>
  <div class="container content">
    <div v-if="store.isAuth">
      <router-view> </router-view>
    </div>

    <div v-else class="auth">
      <form action="" @submit.prevent="tryLog" class="form auth__form">
        <FormInput
          v-model.trim="formData.login"
          :placeholder-text="'Введите логин'"
          :label-text="'Логин'"
        ></FormInput>
        <AdminFormPassword
          v-model.trim="formData.password"
          :placeholder-text="'Введите пароль'"
          :label-text="'Пароль'"
        ></AdminFormPassword>
        <button
          type="submit"
          class="button button--primery"
          :class="{ 'spinner-button-small': store.isLoading }"
        >
          Войти
        </button>
        <div v-if="store.isLoadingFailed" class="form__error-block auth__error">
          <h4>Ошибка доступа!</h4>
          <p>Неправильно введен логин или пароль</p>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { reactive, watch } from 'vue'
import FormInput from '@/components/form/FormInput.vue'
import AdminFormPassword from '@/components/admin/AdminFormPassword.vue'
import useApi from '@/hooks/useApi'
import { store } from '@/store/store'
import { useRouter } from 'vue-router'
const formData = reactive({})
const { fetch } = useApi()
const tryLog = () => {
  fetch('post', 'api/admin/login', formData).then((res) => {
    store.updateProp('isAuth', true)
    localStorage.setItem('sessionId', res.data.sessionId)
  })
}
const router = useRouter()
const go = () => {
  if (store.isAuth) router.push(store.page)
}
go()
watch(
  () => store.isAuth,
  () => {
    go()
  }
)
</script>
<style lang="scss">
@import '@/styles/style.scss';
@import '@/styles/data.scss';

.data-base__item:not(:last-child) {
  border-bottom: 1px solid $grey;
  padding-bottom: 20px;
}

.form__error-block {
  width: fit-content;
}

.auth {
  margin: 50px auto;
  width: fit-content;

  .button {
    padding: 20px 30px;
  }

  &__error {
    margin-top: 30px;
  }
}

@media (max-width: 465px) {
  .breadcrumbs--admin {
    &__item:not(:last-child) {
      padding-right: 16px;
      &::after {
        font-size: 10px;
        right: 3px;
      }
    }
    &__link {
      font-size: 12px;
    }
  }
}

@import '@/styles/style.scss';

$ml: 20px;

.description__block {
  border-bottom: none !important;
  padding-bottom: 0 !important;
}

.form {
  &__gallery {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    grid-gap: 15px;
    grid-auto-rows: 150px;
    max-width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
    li:last-child {
      margin-bottom: 35px;
    }
  }

  &__danger {
    position: relative;
    &::after {
      pointer-events: none;
      top: -15px;
      right: -15px;
      left: -15px;
      bottom: -15px;
      content: '';
      position: absolute;
      background: transparent;
      transition: background 0.2s ease-in-out;
      opacity: 0.1;
    }
    &--active::after {
      background: $red;
    }
  }

  &__list {
    margin: 0;
  }

  &__block {
    position: relative;
    margin: 0;
    padding-bottom: 30px;
    &--admin {
      border-bottom: 1px solid $grey;
    }
  }

  &__button-group {
    padding: 30px 0;
    button {
      margin-left: $ml;
      // padding-left: 30px;
      // padding-right: 30px;
    }
  }

  &__file-label {
    border: none;
    width: auto;
  }

  &__file-input {
    border: none;
    display: block;
    height: 65px;
    width: 300px;
    position: relative;

    &::after {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      content: 'Выбрать изображение';
      transition: background-color 0.2s ease-in-out;
      @include smallFont;
      color: white;
      text-transform: uppercase;
      padding-top: 3px;
      background: no-repeat left 20px center/30px
        url('@/../public/img/upload.png');
      background-color: $grey;
      padding-left: 35px;
    }

    &:hover:after {
      background-color: $darkGrey;
    }

    &--filled {
      &::after {
        content: 'Поменять изображение';
        background-color: $green !important;
      }
      &:hover:after {
        background-color: darken($green, 20%) !important;
      }
    }

    &--error {
      &::after {
        content: 'Неудалось загрузить';
        background-color: $red !important;
      }
      &:hover:after {
        background-color: darken($red, 20%) !important;
      }
    }
  }

  &__item-body {
    position: relative;
    width: fit-content;
    padding-bottom: 25px;
  }

  &__item:not(:last-child) {
    margin-bottom: 25px;
    border-bottom: 1px solid $grey;
  }
}

.data-base {
}

.description {
  padding: 0;

  &__header {
    margin: 0 0 25px $ml;
  }

  &__content {
    position: relative;
  }

  .form__item-body {
    width: calc(100% - 40px);
  }
}

.name input {
  padding-top: 13px;
}

@media (max-width: 600px) {
  .form {
    &__gallery {
      grid-auto-rows: 100px;
    }
    &__input {
      padding-right: 20px;
    }
    &__item-body {
      width: 100% !important;
    }
    &__label {
      width: calc(100% - 40px);
    }
  }
}

@media (max-width: 420px) {
  .form {
    &__gallery {
      grid-template-columns: 220px;
      grid-auto-rows: auto;
    }
    &__file-input {
      width: 100%;
      &::after {
        font-size: 12px;
        color: white;
        padding-right: 15px;
        background: no-repeat left 15px center/20px
          url('@/../public/img/upload.png') $grey;
        padding-left: 35px;
      }
    }

    &__button-group {
      button {
        width: 100%;
        margin: 0;
      }
    }
  }
}
</style>
