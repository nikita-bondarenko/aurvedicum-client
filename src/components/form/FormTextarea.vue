<template>
  <FormField :label-text="labelText" :error-text="errorValue">
    <!-- eslint-disable-next-line -->
    <textarea
      @input="updateErrorStatus"
      class="form__input form__input--area"
      v-model="value"
      :placeholder="placeholderText"
    ></textarea>
  </FormField>
</template>
<script>
import formFieldMixin from '@/mixins/formFieldMixin'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  mixins: [formFieldMixin],
  setup(props) {
    const errorValue = ref()

    const updateErrorStatus = (e) => {
      errorValue.value = !e.target.value.trim() ? props.errorText : null
    }

    watch(
      () => props.errorText,
      (value) => {
        errorValue.value = value
      }
    )
    return {
      updateErrorStatus,
      errorValue
    }
  }
})
</script>
<style lang="scss">
.form__input--area {
  resize: vertical;
  overflow: auto;
  padding: 13px 30px 13px 20px;
}
</style>
