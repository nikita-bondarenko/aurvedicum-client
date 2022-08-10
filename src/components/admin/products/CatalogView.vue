<template>
  <div v-bind="$attrs" class="content__catalog">
    <section id="catalog" class="catalog catalog-add">
      <BaseSpinner v-if="isLoading"></BaseSpinner>
      <CatalogItemsView v-else :items="localItems"></CatalogItemsView>
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
import { CatalogView } from '@/hooks/useData'
export default defineComponent(CatalogView)
</script>
<style lang="scss">
@import '@/styles/style.scss';
</style>
