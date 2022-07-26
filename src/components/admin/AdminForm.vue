<template>
  <form action="" class="data-base__form form" @submit.prevent="emit('submit')">
    <fieldset class="form__block form__block--admin name">
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
    <fieldset
      class="form__block form__block--admin form__description description"
    >
      <h2 class="data-base__title">Информация о товаре</h2>

      <ul class="form__list">
        <li
          v-for="item in formData.description"
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
      <button
        :class="{ 'spinner-button-small': store.isSaveLoading }"
        type="submit"
        class="button button--primery"
      >
        {{ text }}
      </button>
    </div>
    <div v-if="store.isSaveLoadingFailed" class="form__error-block">
      <h4>Не удалось {{ text }}!</h4>
      <p>Заполните все необходимые поля и попробуйте еще раз.</p>
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
import { computed, ref, defineProps, defineEmits } from 'vue'
import { store } from '@/store/store'
import { IMAGE__STORE } from '@/config'
import AdminFormListItem from './AdminFormListItem.vue'
import AdminSelect from './AdminSelect.vue'
import FormFileInput from '../form/FormFileInput.vue'
import FormSelectInput from '../form/FormSelectInput.vue'
const props = defineProps(['data', 'text', 'formError'])
const emit = defineEmits(['update:data', 'submit'])
const { getBrands, getCategories } = useApi()
const getData = async () => {
  const res = await getCategories()
  const res2 = await getBrands()
  categories.value = res.data.items
  brands.value = res2.data.items
}
const formData = computed({
  get() {
    return props.data
  },
  set(value) {
    emit('update:data', value)
  }
})

const categories = ref([])
const brands = ref([])
getData()

const findItem = (arr, id) => arr.find((item) => item.id === id)

const volumeError = (id) => {
  if (!props.formError.volumes) return
  const volume = findItem(props.formError.volumes, id)
  return volume ? volume.volume : ''
}
const priceError = (id) => {
  if (!props.formError.volumes) return
  const volume = findItem(props.formError.volumes, id)
  return volume ? volume.price : ''
}

const quantityError = (id) => {
  if (!props.formError.volumes) return
  const volume = findItem(props.formError.volumes, id)
  return volume ? volume.quantity : ''
}

const smallBlockError = (section, property, id) => {
  if (!props.formError[section]) return
  const item = findItem(props.formError[section], id)
  return item ? item[property] : ''
}

const paragraphError = (sectionId, paragraphId) => {
  if (!props.formError.descriptions) return
  const section = findItem(props.formError.descriptions, sectionId)
  if (!section) return ''
  const item = findItem(section.content, paragraphId)
  return item ? item.paragraph : ''
}
</script>
<style lang="scss"></style>
