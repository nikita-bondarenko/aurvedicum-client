<template>
  <p v-if="items.length === 0" catalog__error--empty>Список товаров пуст</p>
  <ul v-else class="catalog__list">
    <li
      class="catalog__item catalog-view__item"
      v-for="item in items"
      :key="item.id"
    >
      <button
        type="button"
        @click.prevent="del(item.id)"
        class="catalog-view__button"
      >
        Убрать
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
import { defineProps, computed, watchEffect } from 'vue'
import { IMAGE_STORE } from '@/config'
import { store } from '@/store/store'
import useEditors from '@/hooks/useEditors'
const { editNumberFormat, editVolumeFormat } = useEditors()
const props = defineProps(['items'])
watchEffect(() => console.log(props.items))
const del = (id) => {
  const arr = store.recomendIds.filter((itemId) => id !== itemId)
  store.updateProp('recomendIds', arr)
  console.log(store.recomendIds)
}
</script>
