<template>
  <div v-bind="$attrs" class="content__catalog">
    <section class="settings">
      <BaseSearch v-model="searchValue"></BaseSearch>
      <BaseFilter v-model:settings="config"></BaseFilter>
    </section>
    <section id="catalog" class="catalog catalog-add">
      <BaseSpinner v-if="isLoading"></BaseSpinner>

      <CatalogItemsAdd v-else :items="localItems"></CatalogItemsAdd>
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
import { CatalogAdd } from '@/hooks/useData'
export default defineComponent(CatalogAdd)
</script>
<style lang="scss">
@import '@/styles/style.scss';
</style>
