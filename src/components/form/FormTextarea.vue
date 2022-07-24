<template>
  <FormField :label-text="labelText">
    <!-- eslint-disable-next-line -->
    <textarea
      class="form__input form__input--area"
      v-model="value"
      :placeholder="placeholderText"
    ></textarea>
  </FormField>
</template>
<script>
import formFieldMixin from '@/mixins/formFieldMixin'

export default {
  mixins: [formFieldMixin]
}
</script>
