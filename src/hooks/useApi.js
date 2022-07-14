/* eslint-disable space-before-function-paren */

import axios from 'axios'
import { API_URL } from '@/config.js'
// import { useStore } from 'vuex'
import { store } from '@/store/store'
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: '*/*'
}
let userAccessKey = localStorage.getItem('userAccessKey') || null

const setAccessKey = (key) => {
  if (key) {
    userAccessKey = key
    localStorage.setItem('userAccessKey', userAccessKey)
  }
}

export default function () {
  // const store = useStore()
  const updateBasketData = (data) => {
    if (data.items) {
      store.updateProp('basketItems', data.items)
    }
    if (data.pagination) {
      store.updateProp('basketPagination', data.pagination)
    }
  }
  const getProducts = async (body) => {
    const res = await axios.get(`${API_URL}/api/products`, { params: body }, {
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive'
      }
    }
    )

    return res
  }

  const getProduct = async (body) => {
    const res = await axios.get(`${API_URL}/api/products/${body.id}`,
      {
        Accept: '*/*'
      }
    )
    return res
  }

  const postProduct = async (body) => {
    const res = await axios.post(`${API_URL}/api/products`, body, headers)
    return res
  }

  const deleteProduct = async (id) => {
    const res = await axios.delete(`${API_URL}/api/products/${id}`, headers)
    return res
  }

  const patchProduct = async (body) => {
    const res = await axios.patch(
      `${API_URL}/api/products/${body.id}`,
      body,
      headers
    )
    return res
  }

  const getCategories = async () => {
    const res = await axios.get(`${API_URL}/api/categories`, {
      headers
    })
    return res
  }

  const getBrands = async () => {
    const res = await axios.get(`${API_URL}/api/brands`, {
      headers
    })
    return res
  }

  const postImage = async (file) => {
    const res = await axios.post(`${API_URL}/images`,
      file,
      {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data'

      })
    return res
  }

  const deleteImage = async (filename) => {
    const res = await axios.delete(`${API_URL}/images`,
      {
        params: {
          filename
        }
      },
      {
        'Content-Type': 'application/json',
        Accept: '*/*'
      }
    )
    return res
  }

  const addToBasket = async (body) => {
    console.log(body)
    const res = await axios.post(`${API_URL}/api/basket`,
      Object.assign(body, store.paginationConfig),
      {
        params: {
          userAccessKey
        }
      },
      {
        'Content-Type': 'application/json',

        Accept: '*/*'
      }
    )
    if (res.data) {
      setAccessKey(res.data.userAccessKey)
      updateBasketData(res.data)
    }
    return res
  }

  const getBasket = async (paginationConfig) => {
    store.updateProp('isBasketLoading', true)
    store.updateProp('isBasketLoadingFailed', false)
    try {
      const res = await axios.get(`${API_URL}/api/basket`,
        {
          params: {
            ...paginationConfig,
            userAccessKey
          }
        },
        {
          'Content-Type': 'application/json',
          Accept: '*/*'
        }
      )

      if (res.data) {
        store.updateProp('isBasketLoading', false)
        setAccessKey(res.data.userAccessKey)
        updateBasketData(res.data)
      }
      return res
    } catch {
      store.updateProp('isBasketLoading', false)
      store.updateProp('isBasketLoadingFailed', true)
    }
  }

  const getProductData = async (id) => {
    const res = await getProduct({ id })
    if (res.data.name) {
      return res.data
    }
    return undefined
  }

  const updateBasketItemQuantity = async (body) => {
    const res = await axios.patch(`${API_URL}/api/basket`,
      { ...body, basketId: userAccessKey },
      {
        'Content-Type': 'application/json',
        Accept: '*/*'
      }
    )
    return res
  }

  const deleteBasketItem = async (body) => {
    const res = await axios.delete(`${API_URL}/api/basket`,
      { params: { ...body, basketId: userAccessKey } }
      ,
      {
        'Content-Type': 'application/json',
        Accept: '*/*'
      }
    )
    if (res.data) {
      updateBasketData(res.data)
    }
    return res
  }

  return {
    deleteBasketItem,
    updateBasketItemQuantity,
    getProductData,
    getBasket,
    addToBasket,
    getProduct,
    deleteImage,
    postImage,
    patchProduct,
    deleteProduct,
    postProduct,
    getBrands,
    getCategories,
    getProducts
  }
}
