<template>
  <div class="content__catalog">
    <BaseFilter @submit="getData()" v-model:settings="config"></BaseFilter>
    <section class="catalog">
      <BaseSpinner v-if="store.isLoading"></BaseSpinner>
      <ul class="data-base__list">
        <li v-for="item in items" :key="item.id" class="data-base__item">
          <div class="data-base__product admin-product">
            <h3 class="data-base__name">{{ item.name }}</h3>

            <span class="data-base__created"
              >Создан: {{ editors.editDate(item.created) }}</span
            >
            <span class="data-base__changed"
              >Изменен: {{ editors.editDate(item.changed) }}</span
            >
            <router-link
              class="data-base__change-button"
              :to="{ name: 'changeProduct', params: { id: item.id } }"
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
                  <div class="volume-block__ceil ciel">
                    <input
                      v-if="volume.subprice"
                      ref="priceInput"
                      @keydown="changePrice"
                      type="text"
                      class="ceil__input"
                      v-model="volume.subprice[0].value"
                    />
                    <span v-if="volume.subprice" class="ceil__currency">₽</span>
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
      <PaginationBase
        v-if="pagination.pages > 1"
        class="catalog__pagination"
        v-model:config="config"
        :pagination="pagination"
      />
    </section>
  </div>
</template>
<script setup>
import BaseFilter from '../BaseFilter.vue'
import BaseSpinner from '../small/BaseSpinner.vue'
import { watch, ref } from 'vue'
import useApi from '@/hooks/useApi'
import { store } from '@/store/store'
import useEditors from '@/hooks/useEditors'
import PaginationBase from '../small/PaginationBase.vue'
const editors = useEditors()
const { fetchWithParams } = useApi()
const config = ref({ page: 1, limit: 6 })

const items = ref([])
const pagination = ref({})

const getData = (obj = {}) => {
  console.log(config.value)
  fetchWithParams(
    'get',
    'api/products',
    Object.assign({}, config.value, obj)
  ).then((res) => {
    items.value = res.data.items
    pagination.value = res.data.pagination
  })
}
watch(
  () => config.value.page,
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
.admin-product .data-base__button-del {
  top: -14px;
  right: 0px;
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
    position: relative;
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
  &__ceil,
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

  .ceil {
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
