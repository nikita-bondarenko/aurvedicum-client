<template>
  <aside class="filter">
    <form
      action="#"
      @submit.prevent="$emit('update:search', config.name)"
      class="filter__form form"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Поиск</legend>
        <label for="" class="form__label search">
          <input
            v-model.trim="config.name"
            placeholder="Введите название"
            type="text"
            class="form__input"
          />
          <button type="submit" class="search__button">
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 487.95 487.95"
              style="enable-background: new 0 0 487.95 487.95"
              xml:space="preserve"
            >
              <g>
                <g>
                  <path
                    d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"
                  />
                </g>
              </g>
            </svg>
          </button>
        </label>
        <button
          @click="isFilter = !isFilter"
          type="button"
          class="button button--second filter__button-wrapper"
        >
          {{ isFilter ? 'Скрыть фильтр' : 'Открыть фильтр' }}
        </button>
      </fieldset>
    </form>
    <div class="filter__wrapper" :class="{ 'filter__wrapper--open': isFilter }">
      <form
        @submit.prevent="filter"
        class="filter__form form"
        action="#"
        method="get"
      >
        <fieldset class="form__block">
          <legend class="form__legend">Цена</legend>
          <label class="form__label form__label--price">
            <input
              v-model="config.minPrice"
              class="form__input"
              type="number"
              placeholder="Введите число"
            />
            <span class="form__value">От</span>
          </label>
          <label class="form__label form__label--price">
            <input
              placeholder="Введите число"
              v-model="config.maxPrice"
              class="form__input"
              type="number"
              name="max-price"
            />
            <span class="form__value">До</span>
          </label>
        </fieldset>

        <fieldset class="form__block">
          <legend class="form__legend">Категория</legend>
          <label class="form__label">
            <BaseSelect
              style="z-index: 10000"
              :items="categories"
              :placeholder="'Все категории'"
              v-model="config.categoryId"
            />
          </label>
        </fieldset>

        <fieldset class="form__block">
          <legend class="form__legend">Бренд</legend>
          <label class="form__label">
            <BaseSelect
              :items="brands"
              :placeholder="'Все бренды'"
              v-model="config.brandId"
            ></BaseSelect>
          </label>
        </fieldset>

        <button
          :class="{ 'button-error': isPriceError }"
          class="filter__submit button button--primery"
          type="submit"
        >
          {{
            isPriceError
              ? 'Минимальная цена не должна привышать максимальную'
              : 'Применить'
          }}
        </button>
        <button
          v-if="isReset"
          @click.prevent="reset"
          class="filter__reset button button--second"
          type="button"
        >
          Сбросить
        </button>
      </form>
    </div>
  </aside>
</template>
<script>
/* eslint-disable space-before-function-paren */
import { defineComponent, ref, watch } from 'vue'
import useApi from '@/hooks/useApi'
import BaseSelect from '@/components/BaseSelect.vue'

export default defineComponent({
  emits: ['update:search', 'update:settings'],
  props: ['settings'],
  setup(props, { emit }) {
    const searchValue = ref(null)
    const { getCategories, getBrands } = useApi()
    const categories = ref([])
    const brands = ref([])
    const config = ref({ ...props.settings })
    const isReset = ref(false)
    const isFilter = ref(false)
    const isPriceError = ref(false)
    const getData = async () => {
      const res = await getCategories()
      const res2 = await getBrands()
      categories.value = res.data.items
      brands.value = res2.data.items
    }
    getData()

    watch(
      () => config.value,
      (value) => {
        isReset.value = Object.entries(value).some(([key, value]) => {
          if (key !== 'limit' && key !== 'page' && value.trim().length > 0) {
            return true
          }
          return false
        })

        isPriceError.value = false

        if (value.minPrice && value.maxPrice) {
          isPriceError.value = value.minPrice > value.maxPrice
        }
      },
      { deep: true, immediate: true }
    )

    const filter = () => {
      if (Object.values(config.value).some((value) => !!value)) {
        emit('update:settings', Object.assign({}, props.settings, config.value))
      }
    }
    const reset = () => {
      searchValue.value = ''
      config.value = {}
      emit(
        'update:settings',
        Object.assign({
          limit: props.settings.limit,
          page: props.settings.page
        })
      )
    }

    return {
      reset,
      filter,
      isFilter,
      isPriceError,
      isReset,
      config,
      categories,
      brands,
      searchValue
    }
  },
  components: { BaseSelect }
})
</script>
<style lang="scss">
.button-error {
  pointer-events: none;
  background-color: black;
}

.filter__form:not(:last-child) {
  padding-bottom: 0px;
}
.search {
  margin: 0 !important;
}
</style>
