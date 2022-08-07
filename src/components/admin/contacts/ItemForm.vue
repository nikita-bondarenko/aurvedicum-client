<template>
  <form
    action=""
    class="data-base__form form contact"
    @submit.prevent="emit('submit')"
  >
    <fieldset class="form__block form__block--admin name">
      <h2 class="data-base__title">Заголовок *</h2>
      <FormInput
        class="name__input"
        v-model.trim="data.header"
        :placeholder-text="'Введите текст'"
        :error-text="error.header"
      ></FormInput>
    </fieldset>
    <fieldset
      class="form__block form__block--admin"
      v-for="(item, index) in data.body"
      :key="index"
    >
      <h2 class="data-base__title">{{ item.name }}</h2>
      <FormInput
        class="name__input"
        v-model.trim="item.value"
        :placeholder-text="'Введите значение'"
      ></FormInput>
    </fieldset>
    <fieldset class="form__block form__block--admin">
      <h2 class="data-base__title">Телефон *</h2>

      <FormInput
        v-model="data.phone"
        :placeholder-text="'Введите телефон'"
        :error-text="error.phone"
      />
    </fieldset>

    <div class="form__button-group">
      <button
        :class="{ 'spinner-button-small': store.isPostLoading }"
        class="button button--primery"
        type="submit"
      >
        {{ btnPrimeText }}
      </button>
    </div>
    <div v-if="store.isPostLoadingFailed" class="form__error-block">
      <h4>Не удалось {{ btnPrimeText }}!</h4>
      <p>Заполните все необходимые поля и попробуйте еще раз.</p>
    </div>
  </form>
</template>
<script setup>
import FormInput from '@/components/form/FormInput.vue'
import { defineProps, defineEmits, computed } from 'vue'
import { store } from '@/store/store'

const props = defineProps(['data', 'error', 'btnPrimeText'])
const emit = defineEmits(['update:data', 'submit'])

const data = computed({
  get() {
    return props.data
  },
  set(value) {
    emit('update:data', value)
  }
})
</script>
