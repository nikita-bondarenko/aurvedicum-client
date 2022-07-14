import { createStore } from 'vuex'

export default createStore({
  state: {
    basketItems: [],
    basketPagination: {},
    basketPaginationConfig: {
      limit: 10,
      page: 1
    },
    isBasketLoading: false,
    isBasketLoadingFailed: false
  },
  getters: {

  },
  mutations: {
    updateBasketItems(state, items) {
      state.basketItems = items
    },
    updateBasketPagination(state, obj) {
      state.basketPagination = obj
    },
    updateBasketPaginationConfig(state, obj) {
      state.basketPaginationConfig = Object.assign({}, state.basketPaginationConfig, obj)
    },
    updateIsBasketLoading(state, boolean) {
      state.isBasketLoading = boolean
    },
    updateIsBasketLoadingFailed(state, boolean) {
      state.isBasketLoadingFailed = boolean
    }
  },
  actions: {
  },
  modules: {
  }
})
