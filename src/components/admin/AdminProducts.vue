<template>
  <div class="content__catalog">
    <BaseFilter
      v-model:search="searchValue"
      v-model:settings="config"
    ></BaseFilter>
    <section class="catalog">
      <BaseSpinner v-if="store.isLoading"></BaseSpinner>
      <ul class="data-base__list">
        <li
          v-for="item in productsData.items"
          :key="item.id"
          class="data-base__item"
        >
          <div class="data-base__product">
            <h3 class="data-base__name">{{ item.name }}</h3>

            <span class="data-base__created"
              >Создан: {{ editors.editDate(item.created) }}</span
            >
            <span class="data-base__changed"
              >Изменен: {{ editors.editDate(item.changed) }}</span
            >
            <router-link
              class="data-base__change-button"
              :to="{ name: 'adminProducts', params: { id: item.id } }"
              >Изменить</router-link
            >

            <ul class="data-base__volume volume-block">
              <li class="volume-block__item">
                <div class="volume-block__body">
                  <span class="volume-block__header">Объем/вес</span
                  ><span class="volume-block__header">Цена</span
                  ><span class="volume-block__header">До скидки</span
                  ><span class="volume-block__header">Кол-во</span>
                </div>
              </li>

              <li
                v-for="volume in item.volumes"
                :key="volume.id"
                class="volume-block__item"
              >
                <div
                  class="volume-block__body"
                  :class="{
                    'volume-block__body--three-items': !volume.subprice
                  }"
                >
                  <span class="volume-block__volume">{{
                    editors.editVolumeFormat(volume.volume)
                  }}</span>
                  <div class="volume-block__price price">
                    <input
                      ref="priceInput"
                      @keydown="changePrice"
                      type="text"
                      class="price__input"
                      v-model="volume.price"
                    />
                    <span class="price__currency">₽</span>
                  </div>
                  <div class="volume-block__subprice subprice">
                    <input
                      v-if="volume.subprice"
                      ref="priceInput"
                      @keydown="changePrice"
                      type="text"
                      class="subprice__input"
                      v-model="volume.subprice[0].value"
                    />
                    <span v-if="volume.subprice" class="subprice__currency"
                      >₽</span
                    >
                  </div>
                  <div class="volume-block__quantity quantity">
                    <input
                      type="text"
                      class="quantity__input"
                      v-model="volume.quantity"
                    />
                  </div>
                </div>
              </li>
            </ul>
            <button
              class="data-base__button-del button-del"
              type="button"
              aria-label="Удалить товар из корзины"
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
    </section>
  </div>
</template>
<script setup>
import BaseFilter from '../BaseFilter.vue'
import BaseSpinner from '../small/BaseSpinner.vue'
import { computed, watch, ref } from 'vue'
import useApi from '@/hooks/useApi'
import { store } from '@/store/store'
import useEditors from '@/hooks/useEditors'
const editors = useEditors()
const { fetchWithParams } = useApi()
const config = ref({ page: 1, limit: 12 })
const searchValue = computed({
  get() {
    return ''
  },
  set(value) {
    config.value.name = value
  }
})
const productsData = ref([])
const getData = (obj = {}) => {
  fetchWithParams(
    'get',
    'api/products',
    Object.assign({}, config.value, obj)
  ).then((res) => (productsData.value = res.data))
}
watch(
  () => config.value,
  () => getData(),
  { deep: true }
)
getData()
const input = ref(null)
const priceInput = ref(null)
const changePrice = (e) => {
  input.value = priceInput.value[priceInput.value.indexOf(e.target)]
}
</script>
<style lang="scss">
@import '@/styles/style.scss';

.subprice {
  position: relative;
}

.data-base {
  display: grid;

  grid-template-columns: 1fr 1fr;

  .content__right {
    display: flex;
    align-items: center;
    justify-content: end;
  }

  &__add-button {
    @include smallFont;
    @include button;
  }

  .content__catalog {
    grid-column: 1/3;
  }

  &__product {
    display: grid;
    grid-template-columns: 1fr 1fr 30px;
    grid-gap: 5px 20px;
  }
  &__name {
    font-size: 16px;
    margin: 0;
    grid-row: 1/2;
    grid-column: 1/2;
  }

  &__created {
    grid-row: 2/3;
    grid-column: 1/2;
    @include smallFont;
  }

  &__changed {
    grid-row: 3/4;
    grid-column: 1/2;
    @include smallFont;
  }
  &__change-button {
    grid-row: 4/5;
    grid-column: 1/2;
    @include smallFont;
    @include button;
  }
  &__volume {
    grid-row: 1/5;
    grid-column: 2/3;
  }
  &__button-del {
    grid-row: 1/2;
    grid-column: 3/4;
  }

  &__list {
    margin: 0;
    display: grid;
    grid-gap: 30px;
    grid-template-columns: auto;
  }
}

.volume-block {
  * {
    white-space: nowrap;
    vertical-align: middle;
  }
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;

  &__body {
    display: grid;
    font-size: 14px;
    font-weight: normal;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    grid-template-columns: 100px 80px 80px 60px;
  }

  &__header {
    white-space: break-spaces;
    display: flex !important;
    justify-content: center;
    align-items: flex-end;
    text-align: center;
    font-size: 12px;
    color: $darkGrey;
  }

  // &__body--three-items {
  //   grid-template-columns: 70px 60px 1fr;
  //   .volume-block__quantity {
  //     // display: flex;
  //     // align-items: flex-end;
  //     margin-left: auto;
  //   }
  // }
  &__price,
  &__subprice,
  &__quantity {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-gap: 0;
  }

  &__quantity {
    grid-column: 4/5;
  }

  input {
    border: none;
    max-width: 40px;
    outline: none;
    display: inline-block;
    font-size: 14px;
    text-align: right;
  }
  .quantity__input {
    text-align: center;
  }

  .subprice {
    text-decoration: line-through;
  }

  &__volume {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

[class^='volume-block__'] {
  border: 1px solid $grey;
  height: 100%;
  padding: 2px 5px;
}

.volume-block__body,
.volume-block__item {
  padding: 0;
  border: none;
}

@media (max-width: 1000px) {
  .data-base {
    &__product {
      display: grid;
      grid-template-columns: 320px 30px;
      grid-gap: 5px 10px;
      justify-content: center;
    }
    &__volume {
      grid-row: 2/3;
      grid-column: 1/2;
    }
    &__created {
      grid-row: 3/4;
    }
    &__changed {
      grid-row: 4/5;
    }
    &__change-button {
      grid-row: 5/6;
    }
    &__button-del {
      grid-column: 2/3;
      margin-left: auto;
      margin-right: auto;
    }
  }
}

@media (max-width: 420px) {
  .data-base__product {
    grid-template-columns: 194px 30px;
  }

  .data-base__volume {
    grid-column: 1/3;
  }

  .volume-block {
    &__item {
      * {
        font-size: 12px !important;
      }
    }
    &__body {
      grid-template-columns: 65px 60px 60px 42px;
    }
  }
}
</style>
