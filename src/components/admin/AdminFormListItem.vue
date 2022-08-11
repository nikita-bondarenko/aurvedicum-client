<template>
  <li class="form__item">
    <div class="form__item-body form__danger">
      <button
        v-if="items.length > 1 || isRecomend"
        @click.prevent="removeItem"
        @mouseenter="dangerOn"
        @mouseleave="dangerOff"
        class="data-base__button-del button-del"
        type="button"
        aria-label="Удалить елемент"
      >
        <svg width="20" height="20" fill="currentColor">
          <path
            d="M17 1L1 17m16 0L1 1"
            stroke="#9D9D9D"
            stroke-width=".8"
          ></path>
        </svg>
      </button>

      <slot></slot>
    </div>
  </li>
</template>
<script setup>
import useApi from '@/hooks/useApi'
import { defineProps, defineEmits } from 'vue'
const { deleteImage } = useApi()
const props = defineProps(['item', 'items', 'isRecomend'])
const emit = defineEmits(['update:items'])
const removeItem = () => {
  if (props.item.filename) {
    deleteImage(props.item.filename)
  }

  const items = props.items.filter((items) => items.id !== props.item.id)
  emit('update:items', items)
}

const dangerOn = (e) => {
  e.target.parentNode.classList.add('form__danger--active')
}

const dangerOff = (e) => {
  e.target.parentNode.classList.remove('form__danger--active')
}
</script>
