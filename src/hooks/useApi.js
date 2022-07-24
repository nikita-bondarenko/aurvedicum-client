/* eslint-disable space-before-function-paren */

import axios from 'axios'
import { API_URL } from '@/config.js'
import { store } from '@/store/store'
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: '*/*'
}

const jsonHeader = {
  'Content-Type': 'application/json',
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
  const updateBasketData = (data) => {
    if (data.items) {
      store.updateProp('basketItems', data.items)
    }
    if (data.pagination) {
      store.updateProp('basketPagination', data.pagination)
    }

    store.updateProp('basketItemsQuantity', data.itemsQuantity)
    store.updateProp('basketTotalPrice', data.totalPrice)
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
      jsonHeader
    )
    return res
  }

  const addToBasket = async (body) => {
    store.updateProp('basketCounterLoading', true)

    const res = await axios.post(`${API_URL}/api/basket`,
      Object.assign(body, { basketId: userAccessKey }, store.basketPaginationConfig),
      {
        params: {
          userAccessKey
        }
      },
      jsonHeader
    )
    if (res.data) {
      store.updateProp('basketCounterLoading', false)

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
        jsonHeader
      )

      if (res.data) {
        store.updateProp('basketCounterLoading', false)

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
    store.updateProp('basketCounterLoading', true)

    const res = await axios.patch(`${API_URL}/api/basket`,
      Object.assign(body, { basketId: userAccessKey }, store.basketPaginationConfig),
      jsonHeader
    )
    if (res.data) {
      store.updateProp('basketCounterLoading', false)

      updateBasketData(res.data)
    }

    return res
  }

  const deleteBasketItem = async (body) => {
    store.updateProp('basketCounterLoading', true)
    const res = await axios.delete(`${API_URL}/api/basket`,
      { params: Object.assign(body, { basketId: userAccessKey }, store.basketPaginationConfig) }
      ,
      jsonHeader
    )
    if (res.data) {
      updateBasketData(res.data)
      store.updateProp('basketCounterLoading', false)
    }
    return res
  }

  const getDeliveries = async () => {
    const res = await axios.get(`${API_URL}/api/deliveries`,
      jsonHeader
    )

    return res
  }

  const postOrder = async (body) => {
    return axios.post(`${API_URL}/api/order`,
      { ...body, basketId: userAccessKey, basketPrice: store.basketTotalPrice },
      jsonHeader)
  }

  const getOrder = async (id) => {
    return axios.get(`${API_URL}/api/order/${id}`,

      jsonHeader)
  }

  const fetch = async (method, url, body, string = 'Loading') => {
    store.updateProp(`is${string}`, true)
    store.updateProp(`is${string}Failed`, false)
    return axios[method](`${API_URL}/${url}`,
      body,
      jsonHeader)
      .then((res) => res)
      .catch(() => store.updateProp(`is${string}Failed`, true))
      .then(() => store.updateProp(`is${string}`, false))
  }

  const fetchWithParams = async (method, url, params, string = 'Loading') => {
    store.updateProp(`is${string}`, true)
    store.updateProp(`is${string}Failed`, false)

    return axios[method](`${API_URL}/${url}`,
      { params },
      jsonHeader)
      .catch(() => store.updateProp(`is${string}Failed`, true))
      .then((res) => {
        store.updateProp(`is${string}`, false)
        return res
      })
  }

  return {
    fetchWithParams,
    fetch,
    getOrder,
    postOrder,
    getDeliveries,
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
