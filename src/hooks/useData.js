import useApi from '@/hooks/useApi'
import { ref, computed, watch } from 'vue'
import router from '@/router'
import { IMAGE_STORE } from '@/config'
import BaseFilter from '@/components/BaseFilter.vue'
import CatalogItems from '@/components/catalog/CatalogItems.vue'
import CatalogItemsAdd from '@/components/admin/products/CatalogItemsAdd.vue'
import CatalogItemsView from '@/components/admin/products/CatalogItemsView.vue'
import PaginationBase from '@/components/small/PaginationBase.vue'
import BaseSpinner from '@/components/small/BaseSpinner.vue'
import BaseSearch from '@/components/BaseSearch.vue'
import { useRoute } from 'vue-router'
import { store } from '@/store/store'
const { fetch, getFewProducts } = useApi()
const addContact = () => {
  const data = ref({
    header: '',
    body: [
      {
        name: 'Адрес'
      },
      {
        name: 'Рабочие дни'
      }, {
        name: 'Рабочие часы'
      }, {
        name: 'Обеденный перерыв'
      }],
    phone: ''
  })
  const error = ref({})
  const save = () => {
    error.value = {}

    if (data.value.header) {
      if (data.value.header.length === 0) delete data.value.header
    }
    if (data.value.phone) {
      if (data.value.phone.length === 0) delete data.value.phone
    }
    fetch('post', 'api/contacts', data.value, 'PostLoading')
      .then(() => router.push({ name: 'adminContacts' }))
      .catch((err) => {
        console.log(err)

        error.value = err.response.data
        if (!data.value.header) data.value.header = ''
        if (!data.value.phone) data.value.phone = ''
      })
  }
  return {
    save,
    data,
    error
  }
}
const changeContact = (id) => {
  const data = ref({
  })
  const error = ref({})
  fetch('get', `api/contacts/${id}`).then((res) => {
    data.value = res.data
  })
  const save = () => {
    error.value = {}
    if (data.value.header) {
      if (data.value.header.length === 0) delete data.value.header
    }
    if (data.value.phone) {
      if (data.value.phone.length === 0) delete data.value.phone
    }
    fetch('patch', `api/contacts/${id}`, data.value, 'PostLoading')
      .then(() => router.push({ name: 'adminContacts' }))
      .catch((err) => {
        console.log(err)
        error.value = err.response.data
        if (!data.value.header) data.value.header = ''
        if (!data.value.phone) data.value.phone = ''
      })
  }

  return {
    save,
    data,
    error
  }
}
/* eslint-disable indent */

const blockNameFromUpper = (blockName) => blockName.split('').map((letter, index) => index === 0 ? letter.toUpperCase() : letter).join('')

const addArticle = (blockName) => {
  const data = ref(localStorage.getItem(`${blockName}Data`)
    ? JSON.parse(localStorage.getItem(`${blockName}Data`))
    : {
      body: []
    })
  const error = ref({})
  watch(() => data.value, () => {
    localStorage.setItem(`${blockName}Data`, JSON.stringify(data.value))
  }, { deep: true })
  const save = () => {
    error.value = {}

    fetch('post', `api/${blockName}s`, data.value, 'SaveLoading')
      .then(() => {
        localStorage.removeItem(`${blockName}Data`)
        router.push({ name: `admin${blockNameFromUpper(blockName)}s` })
      })
      .catch((err) => {
        error.value = err.response.data
      })
  }
  return {
    save,
    data,
    error
  }
}

const changeArticle = (blockName, id) => {
  const data = ref({
    body: []
  })
  const error = ref({})
  fetch('get', `api/${blockName}s/${id}`).then(res => {
    data.value = res.data
  })
  const save = () => {
    error.value = {}

    fetch('patch', `api/${blockName}s/${id}`, data.value, 'SaveLoading')
      .then(() => router.push({ name: `admin${blockNameFromUpper(blockName)}s` }))
      .catch((err) => {
        error.value = err.response.data
      })
  }
  return {
    save,
    data,
    error
  }
}

const useForm = (props, { emit }) => {
  const formData = computed({
    get() {
      return props.data
    },
    set(value) {
      emit('update:data', value)
    }
  })
  return {
    formData,
    IMAGE_STORE
  }
}

const getPaginatedList = (list, prop) => {
  const total = list.length
  const limit = Number(prop.limit) || 1000
  const pages = Math.ceil(total / limit) || 1
  const page = Number(prop.page) || 1
  const pagination = {
    total,
    limit,
    pages,
    page
  }
  const data = {
    items: list.slice(limit * (page - 1), limit * page),
    pagination
  }

  return data
}

const useCatalogView = (route, limit) => {
  const { getProducts } = useApi()
  const isLoading = ref(true)
  const isLoadingFailed = ref(false)
  const items = ref([])
  const pagination = ref({ pages: 1 })
  const categoryId = route.params.categoryId || ''
  const config = ref({
    categoryId,
    page: 1,
    limit
  })
  const getData = async (obj = {}) => {
    isLoading.value = true
    isLoadingFailed.value = false
    try {
      const res = await getProducts(Object.assign({}, config.value, obj))
      items.value = res.data.items
      pagination.value = res.data.pagination
      if (res.data.items) {
        isLoading.value = false
      }
    } catch {
      isLoadingFailed.value = true
      isLoading.value = false
    }
  }
  getData()
  watch(
    () => config.value,
    () => {
      searchValue.value = config.value.name

      getData()
    },
    { deep: true }
  )

  const searchValue = ref(null)

  watch(
    () => searchValue.value,
    (value) => (config.value.name = value)
  )

  const editedItems = computed(() => {
    if (!store.recomendIds) return items.value
    return items.value.filter((item) => store.recomendIds.every(id => id !== item.id))
  })

  const localConfig = ref({ limit: 1, page: 1 })

  const localPagination = ref({})

  const localItems = ref([])
  const getLocalData = () => {
    const { items, pagination } = getPaginatedList(editedItems.value, localConfig.value)
    const { page, pages } = pagination

    localPagination.value = pagination
    localItems.value = items
    if (page > pages) {
      localConfig.value.page = pages
    }
  }
  watch(() => [editedItems.value, localConfig.value], (value) => {
    getLocalData()
  }, { deep: true, immediate: true })

  return {
    localConfig,
    localPagination,
    localItems,
    categoryId,
    searchValue,
    isLoading,
    isLoadingFailed,
    items,
    editedItems,
    pagination,
    config,
    getData,
    store

  }
}

const CatalogVue =
{
  components: {
    BaseFilter,
    CatalogItems,
    PaginationBase,
    BaseSpinner,
    BaseSearch
  },
  setup() {
    return useCatalogView(useRoute(), 6)
  }
}

const CatalogAdd = {
  components: {
    BaseFilter,
    CatalogItemsAdd,
    PaginationBase,
    BaseSpinner,
    BaseSearch
  },
  setup() {
    return useCatalogView(useRoute())
  }
}

const useRecomendCatalog = () => {
  const editedItems = ref([])
  const isLoading = ref(false)
  watch(() => store.recomendIds, async (value) => {
    const arr = await getFewProducts(value).then(res => res.map(res => res.data))
    editedItems.value = arr
  }, { deep: true, immediate: true })

  const localConfig = ref({ limit: 1, page: 1 })

  const localPagination = ref({})

  const localItems = ref([])
  const getLocalData = () => {
    const { items, pagination } = getPaginatedList(editedItems.value, localConfig.value)
    const { page, pages } = pagination

    localPagination.value = pagination
    localItems.value = items
    if (page > pages) {
      localConfig.value.page = pages
    }
  }
  watch(() => [editedItems.value, localConfig.value], (value) => {
    getLocalData()
  }, { deep: true, immediate: true })

  return {
    localConfig,
    localPagination,
    localItems,

    isLoading,
    editedItems
  }
}

const CatalogView = {
  components: {
    BaseFilter,
    CatalogItemsView,
    PaginationBase,
    BaseSpinner,
    BaseSearch
  },
  setup() {
    return useRecomendCatalog()
  }
}

export { addContact, changeContact, addArticle, useForm, changeArticle, useCatalogView, CatalogView, CatalogVue, CatalogAdd }
