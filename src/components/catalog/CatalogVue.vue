<template>
  <div v-bind="$attrs" class="content__catalog">
    <section class="settings">
      <BaseSearch v-model="searchValue"></BaseSearch>
      <BaseFilter v-model:settings="config"></BaseFilter>
    </section>
    <section id="catalog" class="catalog">
      <BaseSpinner v-if="isLoading"></BaseSpinner>

      <CatalogItems v-else :items="items"></CatalogItems>
      <PaginationBase
        v-if="pagination.pages > 1"
        class="catalog__pagination"
        v-model:config="config"
        :pagination="pagination"
      />
    </section>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { CatalogVue } from '@/hooks/useData'
export default defineComponent(CatalogVue)
</script>
<style lang="scss">
@import '@/styles/style.scss';
</style>
