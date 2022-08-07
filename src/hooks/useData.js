import useApi from '@/hooks/useApi'
import { ref } from 'vue'
import router from '@/router'
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

export { addContact, changeContact }