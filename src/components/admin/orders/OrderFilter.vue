<template>
  <aside class="filter">
    <button
      @click="openFilter"
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
          <legend class="form__legend">Дата создания</legend>
          <label for="low" class="form__label form__label--date">
            <input
              v-model="config.lowBorder"
              class="form__input filter__date"
              type="date"
              placeholder="Введите число"
            />
            <span class="form__value">От</span>
          </label>
          <label for="high" class="form__label form__label--date">
            <input
              placeholder="Введите число"
              v-model="config.highBorder"
              class="form__input filter__date"
              type="date"
            />
            <span class="form__value">До</span>
          </label>
        </fieldset>

        <fieldset class="form__block">
          <legend class="form__legend">Статус доставки</legend>
          <label class="form__label">
            <BaseSelect
              style="z-index: 10000"
              :items="statuses"
              :placeholder="'Все категории'"
              v-model="config.statusId"
            />
          </label>
        </fieldset>
        <!--
        <button
          :class="{ 'button-error': isDateError }"
          class="filter__submit button button--primery"
          type="submit"
        >
          {{
            isDateError
              ? 'Нижняя граница даты создания не должна привышать верхнюю'
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
/* eslint-disable space-before-function-paren */
/* eslint-disable vue/no-unused-components */
import { defineComponent, ref, watch } from 'vue'
import useApi from '@/hooks/useApi'
import OrderSelect from '@/components/admin/orders/OrderSelect.vue'
import BaseSelect from '@/components/small/BaseSelect.vue'

export default defineComponent({
  emits: ['submit', 'update:settings'],
  props: ['settings'],
  setup(props, { emit }) {
    const searchValue = ref(null)
    const { fetch } = useApi()
    const config = ref({ ...props.settings })
    const isReset = ref(false)
    const isFilter = ref(false)
    const isDateError = ref(false)
    const statuses = ref([])
    fetch('get', 'api/status').then((res) => {
      statuses.value = res.data.items
    })

    watch(
      () => config.value,
      (value) => {
        isReset.value = Object.entries(value).some(([key, value]) => {
          if (key !== 'limit' && key !== 'page' && !!value) {
            return true
          }
          return false
        })
        isDateError.value = false

        if (value.lowBorder && value.highBorder) {
          isDateError.value =
            Date.parse(new Date(value.lowBorder + 'T00:00:00')) >
            Date.parse(new Date(value.highBorder + 'T23:59:59'))
        }

        emit('update:settings', value)
      },
      { deep: true }
    )

    const reset = () => {
      config.value = {
        limit: props.settings.limit,
        page: props.settings.page
      }
    }

    const wrapper = ref(null)

    const openFilter = () => {
      isFilter.value = !isFilter.value
    }

    watch(
      () => isFilter.value,
      (value) => {
        if (value) {
          setTimeout(
            () => wrapper.value.classList.add('filter__wrapper--open_overflow'),
            1000
          )

          return
        }
        wrapper.value.classList.remove('filter__wrapper--open_overflow')
      }
    )

    return {
      statuses,
      wrapper,
      openFilter,
      reset,
      isFilter,
      isDateError,
      isReset,
      config,

      searchValue
    }
  },
  components: { OrderSelect, BaseSelect }
})
</script>

<style lang="scss">
@import '@/styles/filter.scss';
</style>
