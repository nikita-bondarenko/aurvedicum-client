<template>
  <main class="content container">
    <div class="content__top">
      <ul v-if="isAdmin" class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'adminMenu' }" class="breadcrumbs__link">
            Меню
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'adminOrders' }" class="breadcrumbs__link">
            Заказы
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link
            :to="{ name: 'adminOrderAdd' }"
            class="breadcrumbs__link"
          >
            Оформление заказа
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'adminCatalog' }" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li
          class="breadcrumbs__item"
          v-for="item in product.categories"
          :key="item.id"
        >
          <router-link
            :to="{
              name: 'adminCatalog',
              params: { categoryId: item.categoryId }
            }"
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

      <ul v-if="store.isOrderedBasket" class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'adminMenu' }" class="breadcrumbs__link">
            Меню
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'adminOrders' }" class="breadcrumbs__link">
            Заказы
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="store.page" class="breadcrumbs__link">
            Изменение заказа
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link
            :to="{ name: 'catalog' }"
            @click="store.setCatalogPathName"
            class="breadcrumbs__link"
          >
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
            @click="store.setCatalogPathName"
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

      <ul v-else-if="!isAdmin" class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link
            :to="{ name: 'catalog' }"
            @click="store.setCatalogPathName"
            class="breadcrumbs__link"
          >
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
            @click="store.setCatalogPathName"
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

    <section v-else class="item">
      <div class="item__pics pics">
        <div
          class="pics__wrapper"
          :style="{
            background: `no-repeat center/contain url('${
              IMAGE_STORE + image.filename
            }') transparent`
          }"
        >
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
                :class="{ 'pics__link--current': item.id === image.id }"
              >
                <img
                  alt="Изображение товара"
                  :src="IMAGE_STORE + item.filename"
                />
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
                :class="{ disabled: volume.quantity === 0 }"
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
                  >{{ editNumberFormat(volume.subprice) }}&nbsp;₽
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
              :class="{
                'button-error': quantityError,
                'spinner-small': store.basketCounterLoading,
                'button--added': isAdded
              }"
              type="submit"
            >
              <div class="button__subtext">Товар добавлен</div>
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
// /* eslint-disable */
import { IMAGE_STORE } from '@/config'
import { useRoute } from 'vue-router'
import { store } from '@/store/store'
import { onBeforeUnmount, ref, watch, computed } from 'vue'
import useApi from '@/hooks/useApi'
import useEditors from '@/hooks/useEditors'
import BaseSelect from '@/components/small/BaseSelect.vue'
import BaseCounter from '@/components/small/BaseCounter.vue'
import BaseSpinner from '@/components/small/BaseSpinner.vue'
const isAdmin = computed(() => {
  if (!useRoute().name) return false
  return useRoute().name === 'adminItem'
})
const productId = useRoute().params.id
const { getProductData, addToBasket } = useApi()
const product = ref({})
const descItem = ref('')
const volumeId = ref('')
const volume = ref({})
const isLoading = ref(true)
const isLoadingFailed = ref(false)
const isAdded = ref(false)
const isNoProducts = ref(false)
const quantityError = ref(true)
const quantity = ref(1)
const isOneVolume = ref(false)
const isSubprice = ref(false)
const image = ref({})
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

const intervalId = setInterval(() => {
  getProductData(productId).then((res) => {
    product.value = res
    volume.value = product.value.volumes.find(
      (volume) => volume.id === volumeId.value
    )
  })
}, 200)

onBeforeUnmount(() => clearInterval(intervalId))
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
  addToBasket({
    quantity: quantity.value,
    productId: product.value.id,
    volumeId: volume.value.id,
    isAdd: true
  })
}

watch(
  () => store.basketCounterLoading,
  (value) => {
    if (!value) {
      isAdded.value = true
      setTimeout(() => (isAdded.value = false), 1000)
    }
  }
)
</script>
<style lang="scss">
@import '@/styles/item.scss';
</style>
