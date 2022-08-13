<template>
  <div class="content__top">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link :to="{ name: 'adminMenu' }" class="breadcrumbs__link">
          Меню
        </router-link>
      </li>

      <li class="breadcrumbs__item">
        <span class="breadcrumbs__link" disabled> Новости </span>
      </li>
    </ul>
  </div>

  <section class="catalog content__catalog article">
    <router-link :to="{ name: 'adminAddNew' }" class="data-base__button-add">
      Добавить</router-link
    >
    <BaseSpinner v-if="store.isLoading"></BaseSpinner>

    <ul v-else class="data-base__list">
      <li v-for="item in items" :key="item.id" class="data-base__item">
        <div class="data-base__item-body">
          <img
            class="article__image"
            :src="'..' + IMAGE_STORE + item.filename"
            alt="Иллюстрация статьи"
          />
          <h3 class="data-base__name">{{ item.header }}</h3>
          <span class="data-base__created"
            >Созданно: {{ editors.editDate(item.created) }}</span
          >
          <span class="data-base__changed"
            >Измененно: {{ editors.editDate(item.changed) }}</span
          >

          <router-link
            class="data-base__change-button"
            :to="{ name: 'adminChangeNew', params: { id: item.id } }"
            >Изменить</router-link
          >
          <button
            class="data-base__button-del button-del"
            type="button"
            aria-label="Удалить товар"
            @click.prevent="deleteItem(item.id)"
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
    </ul>
    <span v-if="items.length === 0 && !store.isLoading">Список пуст</span>
    <PaginationBase
      v-if="pagination.pages > 1"
      class="catalog__pagination"
      v-model:config="config"
      :pagination="pagination"
    />
  </section>
</template>
<script>
import PaginationBase from '@/components/small/PaginationBase.vue'
import BaseSpinner from '@/components/small/BaseSpinner.vue'
import { ref, watch, defineComponent } from 'vue'
import useApi from '@/hooks/useApi'
import { store } from '@/store/store'
import { IMAGE_STORE } from '@/config'
import useEditors from '@/hooks/useEditors'

const { fetchWithParams } = useApi()

export default defineComponent({
  components: { BaseSpinner, PaginationBase },
  data() {
    return {
      store,
      IMAGE_STORE
    }
  },
  setup() {
    const editors = useEditors()
    const items = ref([])
    const pagination = ref({})
    const config = ref({
      limit: 6,
      page: 1
    })
    const getData = () =>
      fetchWithParams('get', 'api/news', config.value).then((res) => {
        items.value = res.data.items
        pagination.value = res.data.pagination
      })

    const deleteItem = (id) => {
      fetchWithParams('delete', `api/news/${id}`, {}, '').then(() => getData())
    }

    watch(
      () => config.value,
      () => getData(),
      { deep: true, immediate: true }
    )
    return {
      editors,
      deleteItem,
      config,
      pagination,
      items
    }
  }
})
</script>
<style lang="scss">
@import '@/styles/article.scss';
@import '@/styles/data.scss';
</style>
