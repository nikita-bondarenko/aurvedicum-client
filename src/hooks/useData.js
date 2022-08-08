import useApi from '@/hooks/useApi'
import { ref, computed, watch } from 'vue'
import router from '@/router'
import { IMAGE_STORE } from '@/config'

const addContact = () => {
  const { fetch } = useApi()

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
  const { fetch } = useApi()
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
  const { fetch } = useApi()
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
  const { fetch } = useApi()
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

const useArticleList = () => {

}

export { addContact, changeContact, addArticle, useForm, useArticleList, changeArticle }
