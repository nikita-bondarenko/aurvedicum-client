<style lang="scss">
@import '@/styles/page.scss';
</style>

<script setup>
import { defineProps } from 'vue'
import { IMAGE_STORE } from '@/config'
const props = defineProps(['data'])
</script>
<template>
  <div class="page">
    <img
      v-if="data.filename"
      class="page__image"
      :src="'..' + IMAGE_STORE + props.data.filename"
      alt="Иллюстрация к странице"
    />
    <h1 class="page__header">{{ data.header }}</h1>

    <ul class="page__body">
      <li v-for="section in data.body" :key="section.id" class="page__section">
        <h2 class="page__section-header">{{ section.header }}</h2>
        <ul class="page__section-body">
          <li
            v-for="item in section.body"
            :key="item.id"
            class="page__section-item text"
          >
            <p class="text__part">
              {{ item.value }}
            </p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
