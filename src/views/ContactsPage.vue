<template>
  <main class="container content">
    <BaseSpinner v-if="store.isLoading"></BaseSpinner>
    <div v-else class="page">
      <ul class="page__body">
        <li
          v-for="section in data.items"
          :key="section.id"
          class="page__section"
        >
          <h1 class="page__section-header">{{ section.header }}</h1>
          <ul class="page__section-body">
            <li
              v-for="item in section.body"
              :key="item.id"
              v-show="item.value"
              class="page__section-item text"
            >
              <h2 class="text__header">{{ item.name }}</h2>
              <p class="text__part">
                {{ item.value }}
              </p>
            </li>
            <li class="page__section-item text">
              <h2 class="text__header">Телефон</h2>
              <p class="text__part">
                {{ section.phone }}
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </main>
</template>
<script>
import { defineComponent } from 'vue'
import { contacts } from '@/hooks/useContent'
export default defineComponent(contacts)
</script>
<style lang="scss">
@import '@/styles/page.scss';
</style>
