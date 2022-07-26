<template>
  <fieldset
    class="form__block form__block--admin"
    :class="{ description__block: buttonText === 'обзац' }"
  >
    <h2 v-if="header" class="data-base__title">{{ header }}</h2>
    <ul class="form__list">
      <slot></slot>
    </ul>
    <button
      v-if="buttonText !== 'бренд'"
      type="button"
      @click.prevent="addItem"
      class="data-base__button-add"
    >
      Добавить {{ buttonText }}
    </button>
  </fieldset>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps(['header', 'buttonText', 'items'])
const emit = defineEmits(['update:items'])
const addItem = () => {
  const items = props.items
  const id =
    props.items.length > 0
      ? props.items.reduce((id, item) => (item.id > id ? item.id : id), 1) + 1
      : 1
  items.push({ id })
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
