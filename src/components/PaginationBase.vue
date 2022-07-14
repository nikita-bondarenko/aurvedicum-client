<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a @click.prevent="$emit('update:config', pagination.page === 1 ? config : Object.assign(config, { page: pagination.page - 1 }))"
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': pagination.page === 1 }" aria-label="Предыдущая страница">
        <svg class="previous-arrow-icon" width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li v-for="page in pagination.pages" :key="page" class="pagination__item">
      <a @click.prevent="
        $emit('update:config', Object.assign(config, { page }))
      " class="pagination__link pagination__link--cursor"
        :class="{ 'pagination__link--current': page === pagination.page }">
        {{ page }}
      </a>
    </li>

    <!-- <li class="pagination__item">
      <a class="pagination__link" href="#"> ... </a>
    </li> -->

    <li class="pagination__item">
      <a @click.prevent="$emit('update:config', pagination.page === pagination.pages ? config : Object.assign(config, { page: pagination.page + 1 }))"
        :class="{
          'pagination__link--disabled': pagination.page === pagination.pages
        }" class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница">
        <svg class="next-arrow-icon" width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
  <div></div>
</template>
<script>
/* eslint-disable */
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['pagination', 'config'],
  emits: ['update:config']
})
</script>
<style lang="scss">
.pagination__link--cursor {
  cursor: pointer;
}
</style>
