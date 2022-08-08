<template>
  <form
    action=""
    class="data-base__form form article"
    @submit.prevent="$emit('submit')"
  >
    <fieldset class="form__block form__block--admin">
      <h2 class="data-base__title">Главный заголовок *</h2>
      <FormInput
        class="article__main-header"
        v-model.trim="formData.header"
        :placeholder-text="'Введите текст'"
        :error-text="error.header"
      ></FormInput>
    </fieldset>
    <AdminFormList
      :header="''"
      :button-text="'раздел'"
      v-model:items="formData.body"
    >
      <AdminFormListItem
        v-for="item in formData.body"
        v-model:items="formData.body"
        :item="item"
        :key="item.id"
      >
        <FormInput
          v-model.trim="item.header"
          :label-text="'Заголовок раздела'"
          :placeholder-text="'Введите текст'"
        ></FormInput>
        <AdminFormList
          class="form__sublist"
          :header="''"
          :button-text="'обзац'"
          v-model:items="item.body"
        >
          <AdminFormListItem
            v-for="paragraph in item.body"
            v-model:items="item.body"
            :item="paragraph"
            :key="paragraph.id"
          >
            <FormTextarea
              :placeholder-text="'Текст'"
              v-model.trim="paragraph.value"
            ></FormTextarea>
          </AdminFormListItem>
        </AdminFormList>
      </AdminFormListItem>
    </AdminFormList>
    <div class="form__button-group">
      <button
        class="button button--primery"
        :class="{ 'spinner-button-small': store.isSaveLoading }"
      >
        {{ btnPrimeText }}
      </button>
    </div>
    <div v-if="store.isSaveLoadingFailed" class="form__error-block">
      <h4>Не удалось {{ btnPrimeText }}!</h4>
      <p>Заполните все необходимые поля и попробуйте еще раз.</p>
    </div>
  </form>
</template>
<script>
import { defineComponent } from 'vue'
import FormInput from '@/components/form/FormInput.vue'
import { useForm } from '@/hooks/useData'
import AdminFormListItem from '@/components/admin/AdminFormListItem.vue'
import AdminFormList from '@/components/admin/AdminFormList.vue'
import FormTextarea from '@/components/form/FormTextarea.vue'
import { store } from '@/store/store'

export default defineComponent({
  emits: ['update:data', 'submit'],
  props: ['error', 'data', 'btnPrimeText'],
  components: {
    FormTextarea,
    FormInput,
    AdminFormListItem,
    AdminFormList
  },
  data() {
    return {
      store
    }
  },
  setup(props, { emit }) {
    return useForm(props, { emit })
  }
})
</script>
<style lang="scss">
@import '@/styles/article.scss';
</style>
