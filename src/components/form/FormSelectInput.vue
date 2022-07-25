<template lang="">
  <FormField :label-text="labelText" :error-text="errorValue">
    <!-- eslint-disable-next-line -->
    <slot></slot>
  </FormField>
</template>
<script>
import formFieldMixin from '@/mixins/formFieldMixin'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  mixins: [formFieldMixin],
  props: ['id'],
  setup(props) {
    const errorValue = ref()

    const updateErrorStatus = () => {
      errorValue.value = !props.id ? props.errorText : null
    }

    watch(
      () => props.id,
      () => updateErrorStatus()
    )

    watch(
      () => props.errorText,
      (value) => {
        errorValue.value = value
      }
    )

    return {
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
