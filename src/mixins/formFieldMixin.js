
/* eslint-disable */
import FormField from '@/components/form/FormField.vue';

export default {
  props: ['placeholderText', 'modelValue', 'labelText', 'errorText'],
  emits: ['update:modelValue'],
  components: { FormField },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
        return value;
      },
    },
  },

};
