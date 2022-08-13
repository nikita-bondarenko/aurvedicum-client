<template>
  <p v-if="items.length === 0" class="catalog__error--empty">
    Список товаров пуст
  </p>
  <ul v-else class="catalog__list">
    <li
      class="catalog__item catalog-add__item"
      v-for="item in items"
      :key="item.id"
    >
      <button
        type="button"
        @click.prevent="add(item.id)"
        class="catalog-add__button"
      >
        Выбрать
      </button>
      <div class="catalog__pic">
        <img
          v-show="item.images.length"
          :src="'../..' + IMAGE_STORE + item.images[0].filename"
          alt="Название товара"
        />
      </div>
      <h3 class="catalog__title">
        {{ item.name }}
      </h3>
    </li>
  </ul>
</template>
<script setup>
/* eslint-disable  no-unused-vars */
import { defineProps, computed } from 'vue'
import { IMAGE_STORE } from '@/config'
import { store } from '@/store/store'
import useEditors from '@/hooks/useEditors'
const { editNumberFormat, editVolumeFormat } = useEditors()
const props = defineProps(['items'])

const add = (id) => {
  const arr = store.recomendIds
  arr.push(id)
  store.updateProp('recomendIds', arr)
}
</script>
