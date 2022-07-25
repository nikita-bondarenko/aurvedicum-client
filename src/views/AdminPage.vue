<template>
  <div class="container content">
    <div v-if="store.isAuth" class="data-base">
      <nav class="content__top">
        <h1 class="content__title">База данных</h1>

        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link
              class="breadcrumbs__link"
              :to="{ name: 'adminProducts' }"
              >Товары
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'adminOrders' }"
              >Заказы
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link
              class="breadcrumbs__link"
              :to="{ name: 'adminContacts' }"
              >Контакты
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link
              class="breadcrumbs__link"
              :to="{ name: 'adminPolitics' }"
              >Политика конф.
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="content__right">
        <router-link
          v-if="route.name === 'adminProducts'"
          :to="{ name: 'adminAddProduct' }"
          class="data-base__add-button"
          >Добавить товар</router-link
        >
      </div>
      <router-view></router-view>
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
          :class="{ 'spinner-button-small': isLoading }"
        >
          Войти
        </button>
        <div v-if="isLoadingFailed" class="form__error-block auth__error">
          <h4>Ошибка доступа!</h4>
          <p>Неправильно введен логин или пароль</p>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue'
import FormInput from '@/components/form/FormInput.vue'
import AdminFormPassword from '@/components/admin/AdminFormPassword.vue'
import { useRouter, useRoute } from 'vue-router'
import useApi from '@/hooks/useApi'
import { store } from '@/store/store'
const route = useRoute()
const router = useRouter()
const formData = reactive({})
const { fetch } = useApi()
const isLoading = ref(false)
const isLoadingFailed = ref(false)
const tryLog = () => {
  isLoading.value = true
  isLoadingFailed.value = false
  fetch('post', 'admin/login', formData)
    .then((res) => {
      store.updateProp('isAuth', true)
      localStorage.setItem('sessionId', res.data.sessionId)
    })
    .catch(() => (isLoadingFailed.value = true))
    .then(() => (isLoading.value = false))
}
router.push({ name: store.adminPage })

watch(
  () => store.isAuth,
  (value) => {
    if (value === true) {
      router.push({ name: store.adminPage })
    }
  },
  { immediate: true }
)
</script>
<style lang="scss">
@import '@/styles/style.scss';
.data-base__item:not(:last-child) {
  border-bottom: 1px solid $grey;
  padding-bottom: 20px;
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

.content {
  padding-top: 0;
}

.content__top {
  display: flex;
  flex-direction: column;
  margin-right: auto;
  width: fit-content;
}

.router-link-active {
  color: black;
}

@media (max-width: 465px) {
  .breadcrumbs {
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
</style>
