<template>
  <li
    class="data-base__item"
    :class="{
      'spinner-small': store.isItemLoading || isUpdating,
      'loading-error': store.isItemLoadingFailed
    }"
  >
    <div class="data-base__product admin-product">
      <h3 class="data-base__name">{{ item.name }}</h3>

      <span class="data-base__created"
        >Создан: {{ editors.editDate(item.created) }}</span
      >
      <span class="data-base__changed"
        >Изменен: {{ editors.editDate(item.changed) }}</span
      >
      <router-link
        class="data-base__change-button"
        :to="{ name: 'adminChangeProduct', params: { id } }"
        >Изменить</router-link
      >

      <ul class="data-base__volume volume-block">
        <li class="volume-block__item">
          <div class="volume-block__body">
            <span class="volume-block__header">Объем/вес</span
            ><span class="volume-block__header">Цена</span
            ><span class="volume-block__header">До скидки</span
            ><span class="volume-block__header">Кол-во</span>
          </div>
        </li>

        <li
          v-for="volume in item.volumes"
          :key="volume.id"
          class="volume-block__item"
        >
          <div
            class="volume-block__body"
            :class="{
              'volume-block__body--three-items': !volume.subprice
            }"
          >
            <span class="volume-block__volume">{{
              editors.editVolumeFormat(volume.volume)
            }}</span>
            <div class="volume-block__price price">
              <input
                ref="priceInput"
                @input="patch"
                type="text"
                class="price__input"
                v-model.number="volume.price"
              />
              <span class="price__currency">₽</span>
            </div>
            <div class="volume-block__ceil ciel">
              <input
                ref="priceInput"
                @input="patch"
                type="text"
                class="ceil__input"
                v-model.number="volume.subprice"
              />
              <span v-if="volume.subprice" class="ceil__currency">₽</span>
            </div>
            <div class="volume-block__quantity quantity">
              <input
                @input="patch"
                type="text"
                class="quantity__input"
                v-model.number="volume.quantity"
              />
            </div>
          </div>
        </li>
      </ul>
      <button
        class="data-base__button-del button-del"
        type="button"
        aria-label="Удалить товар"
        @click.prevent="deleteItem"
      >
        <svg width="20" height="20" fill="currentColor">
          <path
            d="M17 1L1 17m16 0L1 1"
            stroke="#9D9D9D"
            stroke-width=".8"
          ></path>
        </svg>
      </button>
    </div>
  </li>
</template>
<script setup>
/* eslint-disable */

import {
  defineProps,
  defineEmits,
  ref,
  toRef,
  watch,
  onBeforeUnmount
} from 'vue'
import useEditors from '@/hooks/useEditors'
import useApi from '@/hooks/useApi'
import { store } from '@/store/store'
const { fetch, fetchWithParams } = useApi()

const props = defineProps(['id', 'pagination'])
const emit = defineEmits(['update:items', 'update:pagination'])
const url = `api/products/${props.id}`
const editors = useEditors()
const item = ref({})

const getData = (res) => {
  item.value = res.data
}

const useFetch = async (
  method,
  { func },
  string = 'ItemLoading',
  body = {}
) => {
  fetch(method, url, body, string).then((res) => func(res))
}

useFetch('get', { func: getData })
const intervalId = setInterval(
  () => useFetch('get', { func: getData }, ''),
  1000
)

onBeforeUnmount(() => {
  clearInterval(intervalId)
})

const deleteItem = () => {
  fetchWithParams('delete', url, props.pagination, 'ItemLoading').then(
    (res) => {
      emit('update:pagination', res.data.pagination)
      emit('update:items', res.data.items)
      clearInterval(intervalId)
    }
  )
}

const input = ref(null)
const priceInput = ref(null)
const patch = () => {
  fetch(
    'patch',
    `api/products/${props.id}`,
    { volumes: item.value.volumes },
    `${props.id}Updating`
  )
}
const isUpdating = toRef(store, `is${props.id}Updating`)
</script>
