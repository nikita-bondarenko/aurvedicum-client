<template>
  <p v-if="items.length === 0" class="catalog__error--empty">
    Список товаров пуст
  </p>
  <ul v-else class="catalog__list">
    <li class="catalog__item" v-for="item in items" :key="item.id">
      <router-link to="" @click="go(item.id)" class="catalog__pic">
        <img
          v-show="item.images.length"
          :src="IMAGE_STORE + item.images[0].filename"
          alt="Название товара"
        />
      </router-link>

      <h3 class="catalog__title">
        <router-link to="" @click="go(item.id)">
          {{ item.name }}
        </router-link>
      </h3>
      <div class="catalog__volume">
        <div
          v-show="item.volumes.length"
          v-for="volume in item.volumes"
          :key="volume.id"
          class="volume"
        >
          <p class="catalog__price volume__price volume__item">
            {{ editNumberFormat(volume.price) }}&nbsp;₽
          </p>
          <p v-if="volume.subprice" class="volume__subprice volume__item">
            {{ editNumberFormat(volume.subprice) }}&nbsp;₽
          </p>
          <p class="volume__value volume__item">
            {{ editVolumeFormat(volume.volume) }}
          </p>
        </div>
      </div>

      <ul class="catalog__subprice subprice">
        <li
          v-for="volume in item.volumes"
          :key="volume.id"
          :class="{ 'subprice__empty-item': !volume.subprice }"
        >
          <div v-if="volume.subprice" class="subprice__item">
            {{ Math.round(100 - (volume.price * 100) / volume.subprice) }}%
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script setup>
/* eslint-disable  no-unused-vars */
import { defineProps, watchEffect } from 'vue'
import { IMAGE_STORE } from '@/config'
import useEditors from '@/hooks/useEditors'
import { useRouter, useRoute } from 'vue-router'
const { editNumberFormat, editVolumeFormat } = useEditors()
const props = defineProps(['items'])
const route = useRoute()
const router = useRouter()
const go = (id) => {
  router.push(`/${id}`)
  if (route.name === 'item') location.pathname = `/${id}`
}
</script>
