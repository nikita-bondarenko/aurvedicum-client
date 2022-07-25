<template>
  <form action="" class="data-base__form form" @submit.prevent="create">
    <fieldset class="form__block form__name name">
      <h2 class="data-base__title">Название</h2>
      <FormInput
        class="name__input"
        v-model.trim="formData.name"
        :placeholder-text="'Введите название товара'"
        :error-text="formError.name"
      ></FormInput>
    </fieldset>
    <AdminFormList
      :header="'Объем/вес - цена'"
      :button-text="'объем/вес'"
      v-model:items="formData.volumes"
    >
      <AdminFormListItem
        v-for="item in formData.volumes"
        v-model:items="formData.volumes"
        :item="item"
        :key="item.id"
      >
        <FormInput
          v-model.trim="item.volume"
          :placeholder-text="'Введите объем/вес'"
          :label-text="'Объем/вес *'"
          :error-text="volumeError(item.id)"
        ></FormInput>
        <FormNumberInput
          v-model="item.price"
          :placeholder-text="'Введите цену'"
          :label-text="'Цена *'"
          :error-text="priceError(item.id)"
        ></FormNumberInput>
        <FormNumberInput
          v-model="item.subprice"
          :placeholder-text="'Введите цену'"
          :label-text="'Цена до скидки'"
        ></FormNumberInput>
        <FormNumberInput
          v-model="item.quantity"
          :placeholder-text="'Введите число'"
          :label-text="'Колличество *'"
          :error-text="quantityError(item.id)"
        ></FormNumberInput>
      </AdminFormListItem>
    </AdminFormList>
    <AdminFormList
      :header="'Бренд'"
      :button-text="'бренд'"
      v-model:items="formData.brands"
    >
      <AdminFormListItem
        v-for="item in formData.brands"
        v-model:items="formData.brands"
        :item="item"
        :key="item.id"
      >
        <FormSelectInput
          :error-text="smallBlockError('brands', 'brandId', item.id)"
          :id="item.brandId"
        >
          <AdminSelect
            :items="brands"
            :placeholder="'Выберите бренд'"
            v-model:id="item.brandId"
            v-model:title="item.title"
          ></AdminSelect>
        </FormSelectInput>
      </AdminFormListItem>
    </AdminFormList>
    <AdminFormList
      :header="'Категория'"
      :button-text="'категорию'"
      v-model:items="formData.categories"
    >
      <AdminFormListItem
        v-for="item in formData.categories"
        v-model:items="formData.categories"
        :item="item"
        :key="item.id"
      >
        <FormSelectInput
          :error-text="smallBlockError('categories', 'categoryId', item.id)"
          :id="item.categoryId"
        >
          <AdminSelect
            :items="categories"
            :placeholder="'Выберите категорию'"
            v-model:id="item.categoryId"
            v-model:title="item.title"
          ></AdminSelect>
        </FormSelectInput>
      </AdminFormListItem>
    </AdminFormList>
    <AdminFormList
      :header="'Изображение'"
      :button-text="'изображение'"
      v-model:items="formData.images"
    >
      <ul
        v-if="formData.images.some((image) => image.filename)"
        id="gallery"
        class="form__gallery"
      >
        <li v-for="item in formData.images" :key="item.id">
          <img
            v-if="item.filename"
            :src="IMAGE__STORE + item.filename"
            alt="Изображение товара"
          />
        </li>
      </ul>
      <AdminFormListItem
        v-for="item in formData.images"
        v-model:items="formData.images"
        :item="item"
        :key="item.id"
      >
        <FormFileInput
          v-model:filename="item.filename"
          :error-text="smallBlockError('images', 'filename', item.id)"
        >
        </FormFileInput>
      </AdminFormListItem>
    </AdminFormList>
    <fieldset class="form__block form__description description">
      <h2 class="data-base__title">Информация о товаре</h2>

      <ul class="form__list">
        <li
          v-for="item in formData.descriptions"
          :key="item.id"
          class="form__item"
        >
          <div class="form__item-body">
            <h3 class="description__header">{{ item.header }}</h3>
            <AdminFormList
              :header="''"
              :button-text="'обзац'"
              v-model:items="item.content"
            >
              <AdminFormListItem
                v-for="paragraph in item.content"
                v-model:items="item.content"
                :item="paragraph"
                :key="paragraph.id"
              >
                <FormTextarea
                  :key="paragraph.id"
                  :placeholder-text="'Текст'"
                  v-model.trim="paragraph.paragraph"
                  :error-text="paragraphError(item.id, paragraph.id)"
                ></FormTextarea>
              </AdminFormListItem>
            </AdminFormList>
          </div>
        </li>
      </ul>
    </fieldset>
    <div class="form__button-group">
      <button type="submit" class="button button--primery">
        Создать товар
      </button>
    </div>
  </form>
</template>
<script setup>
/* eslint-disable space-before-function-paren  */
import FormNumberInput from '../form/FormNumberInput.vue'
import FormInput from '../form/FormInput.vue'
import FormTextarea from '../form/FormTextarea.vue'
import AdminFormList from './AdminFormList.vue'
import useApi from '@/hooks/useApi'
import { reactive, ref, watch } from 'vue'
import { IMAGE__STORE } from '@/config'
import AdminFormListItem from './AdminFormListItem.vue'
import AdminSelect from './AdminSelect.vue'
import FormFileInput from '../form/FormFileInput.vue'
import FormSelectInput from '../form/FormSelectInput.vue'
const { getBrands, getCategories, fetch } = useApi()
const getData = async () => {
  const res = await getCategories()
  const res2 = await getBrands()
  categories.value = res.data.items
  brands.value = res2.data.items
}
const formData = reactive({
  volumes: [],
  categories: [],
  brands: [],
  images: [],
  descriptions: [
    {
      header: 'Полезные свойства',
      content: [],
      id: 1
    },
    { header: 'Преминение', content: [], id: 2 },
    { header: 'Противопоказания', content: [], id: 3 },
    { header: 'Состав', content: [], id: 4 }
  ]
})
const formError = ref({})
const categories = ref([])
const brands = ref([])
getData()

const create = () => {
  fetch('post', 'api/products', formData, 'CreateLoading').catch((err) => {
    formError.value = err.response.data
    console.log(formError.value)
  })
}

const findItem = (arr, id) => arr.find((item) => item.id === id)

watch(
  () => formError.value,
  (value) => {}
)
const volumeError = (id) => {
  if (!formError.value.volumes) return
  const volume = findItem(formError.value.volumes, id)
  return volume ? volume.volume : ''
}
const priceError = (id) => {
  if (!formError.value.volumes) return
  const volume = findItem(formError.value.volumes, id)
  return volume ? volume.price : ''
}

const quantityError = (id) => {
  if (!formError.value.volumes) return
  const volume = findItem(formError.value.volumes, id)
  return volume ? volume.quantity : ''
}

const smallBlockError = (section, property, id) => {
  if (!formError.value[section]) return
  const item = findItem(formError.value[section], id)
  return item ? item[property] : ''
}

const paragraphError = (sectionId, paragraphId) => {
  if (!formError.value.descriptions) return
  const section = findItem(formError.value.descriptions, sectionId)
  if (!section) return ''
  const item = findItem(section.content, paragraphId)
  return item ? item.paragraph : ''
}
</script>
<style lang="scss">
@import '@/styles/style.scss';

$ml: 20px;

.description__block {
  border-bottom: none !important;
  padding-bottom: 0 !important;
}

.content {
  padding-bottom: 0;
}

.form {
  &__gallery {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    grid-gap: 15px;
    grid-auto-rows: 150px;
    max-width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
    li:last-child {
      margin-bottom: 35px;
    }
  }

  &__danger {
    position: relative;
    &::after {
      pointer-events: none;
      top: -15px;
      right: -15px;
      left: -15px;
      bottom: -15px;
      content: '';
      position: absolute;
      background: transparent;
      transition: background 0.2s ease-in-out;
      opacity: 0.1;
    }
    &--active::after {
      background: $red;
    }
  }

  &__list {
    margin: 0;
  }

  &__block {
    position: relative;
    margin: 0;
    padding-bottom: 30px;
    border-bottom: 1px solid $darkGrey;
  }

  .select {
    height: 65px;
    padding-right: 45px;
    width: fit-content;
  }

  &__button-group {
    padding: 30px 0;
    button {
      margin-left: $ml;
      // padding-left: 30px;
      // padding-right: 30px;
    }
  }

  &__file-label {
    border: none;
    width: auto;
  }

  &__file-input {
    border: none;
    display: block;
    height: 65px;
    width: 300px;
    position: relative;

    &::after {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      content: 'Выбрать изображение';
      transition: background-color 0.2s ease-in-out;
      @include smallFont;
      color: white;
      text-transform: uppercase;
      padding-top: 3px;
      background: no-repeat left 20px center/30px
        url('@/../public/img/upload.png');
      background-color: $grey;
      padding-left: 35px;
    }

    &:hover:after {
      background-color: $darkGrey;
    }

    &--filled {
      &::after {
        content: 'Поменять изображение';
        background-color: $green !important;
      }
      &:hover:after {
        background-color: darken($green, 20%) !important;
      }
    }

    &--error {
      &::after {
        content: 'Неудалось загрузить';
        background-color: $red !important;
      }
      &:hover:after {
        background-color: darken($red, 20%) !important;
      }
    }
  }

  &__item-body {
    position: relative;
    width: fit-content;
    padding-bottom: 25px;
  }

  &__item:not(:last-child) {
    margin-bottom: 25px;
    border-bottom: 1px solid $grey;
  }
}

.data-base {
  &__button-add {
    @include button;
    @include smallFont;
    padding: 0;
    margin-left: $ml;

    background: none;
    border: none;
    cursor: pointer;
    font-weight: 600;
  }

  &__button-del {
    position: absolute;
    top: 1px;
    right: -42px;
  }
  &__title {
    margin-left: $ml;
  }
}

.description {
  padding: 0;

  &__header {
    margin: 0 0 25px $ml;
  }

  &__content {
    position: relative;
  }

  .form__item-body {
    width: calc(100% - 40px);
  }
}

.name input {
  padding-top: 13px;
}

@media (max-width: 600px) {
  .form {
    &__gallery {
      grid-auto-rows: 100px;
    }
    &__input {
      padding-right: 20px;
    }
    &__item-body {
      width: 100% !important;
    }
    &__label {
      width: calc(100% - 40px);
    }
  }
  .data-base__button-del {
    top: 0;
    right: 0;
  }
}

@media (max-width: 420px) {
  .form {
    &__gallery {
      grid-template-columns: 220px;
      grid-auto-rows: auto;
    }
    &__file-input {
      width: 100%;
      &::after {
        font-size: 12px;
        color: white;
        padding-right: 15px;
        background: no-repeat left 15px center/20px
          url('@/../public/img/upload.png') $grey;
        padding-left: 35px;
      }
    }

    &__button-group {
      button {
        width: 100%;
        margin: 0;
      }
    }
  }
}
</style>
