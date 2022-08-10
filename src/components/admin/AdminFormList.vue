<template>
  <fieldset
    class="form__block form__block--admin"
    :class="{ description__block: buttonText === 'обзац' }"
  >
    <h2
      v-if="header"
      class="data-base__title"
      :class="{ recomend__name: isSublist }"
    >
      {{ header }}
    </h2>
    <ul class="form__list">
      <slot></slot>
    </ul>
    <button
      v-if="header !== 'Бренд'"
      type="button"
      @click.prevent="addItem"
      class="form__button-add"
    >
      Добавить {{ buttonText }}
    </button>
  </fieldset>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps(['header', 'buttonText', 'items', 'isSublist'])
const emit = defineEmits(['update:items'])
const addItem = () => {
  const items = props.items
  const id =
    props.items.length > 0
      ? props.items.reduce((id, item) => (item.id > id ? item.id : id), 1) + 1
      : 1
  props.buttonText === 'раздел'
    ? items.push({ id, body: [] })
    : items.push({ id })

  emit('update:items', items)
}
if (props.items.length === 0) addItem()
</script>
<style lang="scss">
.description__block {
  padding-bottom: 0;
  border: none;
}
</style>
