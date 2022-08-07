<template>
  <aside class="filter">
    <button
      @click="openFilter"
      ref="openButton"
      type="button"
      class="button button--second filter__button-wrapper"
    >
      {{ isFilter ? 'Скрыть фильтр' : 'Открыть фильтр' }}
    </button>
    <div
      class="filter__wrapper"
      ref="wrapper"
      :class="{ 'filter__wrapper--open': isFilter }"
    >
      <form
        @submit.prevent="$emit('submit')"
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
              v-model:open="isSelectOpen[0]"
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
              v-model:open="isSelectOpen[1]"
            ></BaseSelect>
          </label>
        </fieldset>

        <!-- <button
          :class="{ 'button-error': isPriceError }"
          class="filter__submit button button--primery"
          type="submit"
        >
          {{
            isPriceError
              ? 'Минимальная цена не должна привышать максимальную'
              : 'Применить'
          }}
        </button> -->
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
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watch,
  reactive
} from 'vue'
import useApi from '@/hooks/useApi'
import BaseSelect from '@/components/small/BaseSelect.vue'
import { store } from '@/store/store'

export default defineComponent({
  emits: ['submit', 'update:settings'],
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
    const isSelectOpen = reactive([false, false])
    const openButton = ref(null)
    getData()
    onMounted(() => {
      store.updateProp('catalog', document.getElementById('catalog'))
    })

    watch(
      () => isSelectOpen,
      (value) => {
        if (store.catalog && document.body.clientWidth < 740) {
          if (value.some((boolean) => boolean)) {
            store.catalog.style.zIndex = '-1'
          } else {
            setTimeout(() => (store.catalog.style.zIndex = '0'), 500)
          }
        }
      },
      { deep: true }
    )

    watch(
      () => config.value,
      (value) => {
        isReset.value = Object.entries(value).some(([key, value]) => {
          if (key !== 'limit' && key !== 'page' && !!value) {
            return true
          }
          return false
        })

        isPriceError.value = false

        if (value.minPrice && value.maxPrice) {
          isPriceError.value = value.minPrice > value.maxPrice
        }

        emit('update:settings', value)
      },
      { deep: true, immediate: true }
    )

    // const filter = () => {
    //   if (Object.values(config.value).some((value) => !!value)) {
    //     emit('update:settings', Object.assign({}, props.settings, config.value))
    //   }
    // }

    const reset = () => {
      config.value = {
        limit: props.settings.limit,
        page: props.settings.page
      }
      emit('update:settings', {
        limit: props.settings.limit,
        page: props.settings.page
      })
      emit('submit')
    }

    const wrapper = ref(null)

    const openFilter = () => {
      isFilter.value = !isFilter.value
    }

    watch(
      () => isFilter.value,
      (value) => {
        if (value) {
          openButton.value.disabled = true

          setTimeout(() => {
            wrapper.value.classList.add('filter__wrapper--open_overflow')
            openButton.value.disabled = false
          }, 1000)
          return
        }
        wrapper.value.classList.remove('filter__wrapper--open_overflow')
      }
    )

    onUnmounted(() => {
      if (store.catalog && document.body.clientWidth < 740) {
        store.catalog.style.zIndex = '0'
      }
    })

    return {
      openButton,
      isSelectOpen,
      wrapper,
      openFilter,
      reset,
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
@import '@/styles/filter.scss';
</style>
