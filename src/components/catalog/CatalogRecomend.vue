<template>
  <div v-bind="$attrs" class="content__catalog catalog-view">
    <section id="catalog" class="catalog">
      <BaseSpinner v-if="isLoading"></BaseSpinner>
      <CatalogItems v-else :items="localItems"></CatalogItems>
      <PaginationBase
        v-if="localPagination.pages > 1"
        class="catalog__pagination"
        v-model:config="localConfig"
        :pagination="localPagination"
      />
    </section>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { CatalogRecomend } from '@/hooks/useData'
export default defineComponent(CatalogRecomend)
</script>
<style lang="scss">
@import '@/styles/style.scss';
</style>
