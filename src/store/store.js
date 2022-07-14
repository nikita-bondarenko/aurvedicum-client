import { reactive } from 'vue'

export const store = reactive({
  basketItems: [],
  basketPagination: {},
  basketPaginationConfig: {
    limit: 1,
    page: 1
  },
  isBasketLoading: false,
  isBasketLoadingFailed: false,
  updateProp(prop, value) {
    this[prop] = value
  }

})
