<template>
  <p v-if="items.length === 0" catalog__error--empty>Список товаров пуст</p>
  <ul v-else class="catalog__list">
    <li class="catalog__item" v-for="item in items" :key="item.id">
      <router-link
        :to="{ name: isAdmin ? 'adminItem' : 'item', params: { id: item.id } }"
        class="catalog__pic"
        href="#"
      >
        <img
          v-show="item.images.length"
          :src="IMAGE_STORE + item.images[0].filename"
          alt="Название товара"
        />
      </router-link>

      <h3 class="catalog__title">
        <router-link :to="{ name: 'item', params: { id: item.id } }" href="#">
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
import { defineProps } from 'vue'
import { IMAGE_STORE } from '@/config'
import useEditors from '@/hooks/useEditors'
const { editNumberFormat, editVolumeFormat } = useEditors()
const props = defineProps(['items', 'isAdmin'])
</script>
<style lang="scss">
@import '@/styles/style.scss';
.catalog__item {
  position: relative;
}

.catalog__pic {
  width: auto;
  max-width: 270px;
}

.subprice {
  position: absolute;
  top: 0;
  right: 0;
  display: grid;

  grid-gap: 0 10px;

  &__item {
    background: $hover;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 16px;
    font-weight: 600;
    padding-left: 2px;
    padding-top: 2px;
    margin-bottom: 10px;
  }

  &__empty-item {
    margin-bottom: 0;
  }
}

.catalog__volume {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px 15px;
  .volume {
    display: grid;
    grid-template-rows: 12px 14px 12px;
    grid-gap: 3px;
    &__item {
      margin: 0;
      text-align: center;
    }
    &__price {
      grid-row: 2/3;
      line-height: 1;
    }
    &__subprice {
      grid-row: 3/4;
      font-size: 12px;
      color: $hover;
      text-decoration: line-through;
    }
    &__value {
      grid-row: 1/2;
      font-size: 12px;
      color: $light;
    }
  }
}
</style>
