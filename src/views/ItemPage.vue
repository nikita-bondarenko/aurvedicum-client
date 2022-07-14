<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'catalog' }" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li
          class="breadcrumbs__item"
          v-for="item in product.categories"
          :key="item.id"
        >
          <router-link
            :to="{ name: 'catalog', params: { categoryId: item.categoryId } }"
            class="breadcrumbs__link"
            href="#"
          >
            {{ item.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link" disabled> {{ product.name }} </span>
        </li>
      </ul>
    </div>
    <BaseSpinner v-if="isLoading && !isLoadingFailed"></BaseSpinner>
    <div v-else-if="isLoadingFailed" class="failed-loading">
      Не удалось загрузить информацию о товаре, попробуйте перезагрузить
      страницу.
    </div>

    <section v-else class="item product">
      <div class="item__pics pics">
        <div
          class="pics__wrapper"
          :style="{
            background: `no-repeat center/contain url('${image.url}') transparent`
          }"
        >
          <!-- <img :src="image.url" alt="Изображение товара" /> -->
          <!-- :src="IMAGE_STATIC + image.filename"
 -->
          <ul class="pics__list">
            <li
              class="pics__item"
              v-for="item in product.images"
              :key="item.id"
            >
              <a
                href=""
                @click.prevent="image = item"
                class="pics__link"
                :class="{ 'pics__link--current': item === image }"
              >
                <img alt="Изображение товара" :src="item.url" />
                <!-- :src="IMAGE_STATIC + item.filename"
 -->
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="item__info">
        <h2 class="item__title">{{ product.name }}</h2>
        <div class="item__form">
          <form
            class="form"
            action="#"
            method="POST"
            @submit.prevent="addProduct"
          >
            <div
              class="item__quantity"
              :class="{ 'item__quantity--error': isNoProducts }"
            >
              {{ pluralizeProductAmount(volume.quantity) }} в наличии
            </div>
            <div class="item__row item__row--center">
              <BaseCounter
                :class="{ 'disabled': volume.quantity === 0 }"
                v-model:quantity="quantity"
                :volume="volume"
              ></BaseCounter>

              <div class="item__price-block">
                <b
                  class="item__price"
                  :class="{ 'item__price--center': !isSubprice }"
                  >{{ editNumberFormat(volume.price) }}&nbsp;₽
                </b>

                <span v-if="volume.subprice" class="item__subprice"
                  >{{ editNumberFormat(volume.subprice[0].value) }}&nbsp;₽
                </span>
              </div>
            </div>
            <div class="item__row item__brand-volume">
              <div class="item__brand">
                <legend class="form__legend">Бренд</legend>
                <ul class="brand-list">
                  <li
                    class="brand-list__item"
                    v-for="item in product.brands"
                    :key="item.id"
                  >
                    <span class="brand-list__text">
                      {{ item.title }}
                    </span>
                  </li>
                </ul>
              </div>
              <div class="item__volume">
                <legend class="form__legend">Объем/вес</legend>
                <BaseSelect
                  :items="product.volumes"
                  v-model:volume="volume"
                ></BaseSelect>
              </div>
            </div>

            <button
              class="button button--primery"
              :class="{ 'button-error': quantityError }"
              type="submit"
            >
              {{
                quantityError ? 'Недопустимое количество товара' : 'В корзину'
              }}
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li
            class="tabs__item"
            v-for="item in product.description"
            :key="item.id"
          >
            <a
              @click.prevent="changeContent(item.id)"
              class="tabs__link"
              :class="{ 'tabs__link--current': isCurrentContent(item) }"
            >
              {{ item.header }}
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p v-for="item in descItem.content" :key="item.id">
            {{ item.paragraph }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
/* eslint-disable */
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import useApi from '@/hooks/useApi'
import useEditors from '@/hooks/useEditors'
import { IMAGE_STATIC } from '@/config.js'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseCounter from '@/components/BaseCounter.vue'
import BaseSpinner from '@/components/BaseSpinner.vue'

const productId = useRoute().params.id
const { getProductData, addToBasket } = useApi()
const product = ref({})
const descItem = ref('')
const volumeId = ref('')
const volume = ref({})
const isLoading = ref(true)
const isLoadingFailed = ref(false)
const isNoProducts = ref(false)
const quantityError = ref(true)
const quantity = ref(1)
const isOneVolume = ref(false)
const isSubprice = ref(false)
const image = ref('')
const { editNumberFormat, pluralizeProductAmount } = useEditors()

getProductData(productId)
  .then((res) => {
    product.value = res
    if (product.value.volumes[0]) {
      isOneVolume.value = product.value.volumes.length === 1
      volumeId.value = product.value.volumes[0].id
      volume.value = product.value.volumes[0]
    }
    if (product.value.images[0]) {
      image.value = product.value.images[0]
    }
    if (product.value.description.length) {
      descItem.value = product.value.description[0]
    }
  })
  .catch(() => (isLoadingFailed.value = true))
  .then(() => (isLoading.value = false))
setInterval(() => {
  getProductData(productId).then((res) => {
    product.value = res
    volume.value = product.value.volumes.find(
      (volume) => volume.id === volumeId.value
    )
  })
}, 100)
const changeContent = (id) => {
  descItem.value = product.value.description.find((item) => item.id === id)
}

watch(
  () => volume.value,
  (value) => {
    volumeId.value = value.id
    isSubprice.value = !!value.subprice
    isNoProducts.value = value.quantity === 0
    quantityError.value = value.quantity < quantity.value
  },
  { deep: true }
)
let timeId

watch(
  () => quantity.value,
  (value) => {
    quantityError.value = value <= 0
    clearTimeout(timeId)
    if (value <= 0) {
      timeId = setTimeout(() => (quantity.value = 1), 2000)
    }
  },
  { immediate: true }
)
const isCurrentContent = (item) => {
  return item.id === descItem.value.id
}

const addProduct = async () => {
  const res = await addToBasket({
    quantity: quantity.value,
    productId: product.value.id,
    volumeId: volume.value.id
  })
}
</script>
<style lang="scss">
@import '@/styles/style.scss';

@mixin selectBorderColor {
  cursor: pointer;

  background-color: $almostDark;
  border: 1px solid transparent;
  transition-property: border-color, color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;

  &:hover {
    color: $red !important;
    border-color: $red;
  }
}

.item__quantity--error {
  color: $red;
}

.item__content {
  margin: 0 auto;

  p {
    display: block;
    margin-bottom: 10px;
  }
}

.container {
  width: auto;
}
.tabs {
  flex-wrap: wrap;
  justify-content: center;
}

.tabs__link {
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  transition: color 0.2s ease-in-out, font-weight 0.2s ease-in-out;
  &:hover {
    color: $almostDark;
  }
}

.tabs__link:focus::after,
.tabs__link:hover::after,
.tabs__link--current::after {
  bottom: -1px;
  background-color: $red;
}

.item__title {
  font-weight: 600;
}

.tabs__link::after {
  pointer-events: none;
}

.item__volume {
}

.item__brand {
}

.form__block {
  position: relative;
}

.item__price-block {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  .item__price {
    position: absolute;
    display: block;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 50%;
    transition: transform 0.2s ease-in-out;
    &--center {
      transform: translate(-50%, 50%);
    }
  }

  .item__subprice {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    text-decoration: line-through;
    color: $red;
    opacity: 0.8;
    width: auto;
    font-size: 30px;
  }
}

.counter__button {
  border-radius: 50%;
  border: 2px solid $almostDark;
}

.item__row {
  grid-gap: 40px;
  grid-template-columns: 1fr 1fr;

  .form__legend {
    margin-bottom: 20px;
  }
}

.item__brand-volume {
  grid-template-columns: auto 120px;
}

.select-one {
  pointer-events: none;
  border: none;

  .select-arrow {
    display: none;
  }
}

.product .button-primary {
  max-width: 180px;
}

.pics__link--current {
  pointer-events: none;
}

.pics__link {
  display: block;
  height: 100%;
  box-shadow: $almostDark 2px 2px 5px;
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out,
    border 0.2s ease-in-out;

  &:hover {
    box-shadow: $almostDark 4px 4px 10px;
    transform: scale(1.05);
  }
  img {
    height: 100% !important;
  }
}

.item {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 520px auto;
  &__info {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-gap: 30px;
  }

  .form {
    height: 100%;
    display: grid;
    grid-gap: 30px;
    grid-template-rows: 20px 1fr 1fr 70px;
  }

  &__pics {
    height: 100%;
  }
}

.pics__wrapper {
  height: 100%;
  grid-row: 1/2;
  position: relative;
  transition: background 0.2s ease-in-out;
  .pics__list {
    position: absolute;
    bottom: 0;
    left: 20px;
    .pics__link {
      img {
        object-fit: cover;
      }

      height: 100px;

      width: 100px;
      border-radius: 10px;
      border: 1px solid transparent;
      background-color: white;
      overflow: hidden;
    }
  }
}

.brand-list {
  display: grid;
  grid-auto-rows: 15px;
  grid-gap: 5px;
  margin: 0;
  &__item {
    height: 40px;
    display: flex;
    align-items: center;
  }
}

.item__form {
  max-width: 400px;
  margin: 0;
}

.form .button--primery {
  width: 100%;
}

@media (max-width: 800px) {
  .item {
    grid-template-columns: 1fr;
    grid-template-rows: 400px 500px 1fr;
  }

  .item__form {
    margin: 0 auto;
  }

  .item__content {
    width: auto;
  }

  // .tabs {
  //   flex-direction: column;
  // }
}
</style>
