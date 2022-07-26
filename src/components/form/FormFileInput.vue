<template lang="">
  <FormField
    class="form__file-label"
    :label-text="labelText"
    :error-text="errorValue"
  >
    <!-- eslint-disable-next-line -->
    <input
      @input="uploadImage($event)"
      class="form__input form__file-input"
      :class="{ 'form__file-input--filled': isFilled }"
      type="file"
      :placeholder="placeholderText"
    />
  </FormField>
</template>
<script>
import formFieldMixin from '@/mixins/formFieldMixin'
import { defineComponent, ref, watch } from 'vue'
import useApi from '@/hooks/useApi'

export default defineComponent({
  mixins: [formFieldMixin],
  props: ['filename'],
  emits: ['update:filename'],
  setup(props, { emit }) {
    const { postImage } = useApi()
    const errorValue = ref()

    const updateErrorStatus = () => {
      errorValue.value = !props.filename ? props.errorText : null
    }
    const isFilled = ref(false)
    watch(
      () => props.filename,

      (value) => {
        isFilled.value = !!value
      },
      { immediate: true }
    )

    const uploadImage = (e) => {
      e.target.classList.remove('form__file-input--filled')
      e.target.classList.remove('form__file-input--error')
      const formData = new FormData()
      formData.append('image', e.target.files[0])
      postImage(formData)
        .then((res) => {
          emit('update:filename', res.data)
          e.target.classList.add('form__file-input--filled')
        })
        .catch(() => {
          e.target.classList.add('form__file-input--error')
          emit('update:filename', null)
        })
        .then(() => updateErrorStatus())
    }

    watch(
      () => props.errorText,
      (value) => {
        errorValue.value = value
      }
    )

    return {
      uploadImage,
      isFilled,
      errorValue,
      updateErrorStatus
    }
  }
})
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
</style>
